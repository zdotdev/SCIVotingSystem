import { Request, Response } from "express";
import { UserSchema } from "../models/user";
import { UserZodSchema } from "../zod/user";
import { generateAcessToken, generateRefreshToken } from "../middlewares/auth";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// Sign up
export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password, image, studentId } = req.body;

        const parserBody = UserZodSchema.safeParse(req.body);

        if(!parserBody.success) {
            return res.status(422).json({message: parserBody.error.issues[0].message});
        }

        const existingUser = await UserSchema.findOne({}).or([{ email }, { studentId }]);
        
        if(existingUser) {
            return res.status(409).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new UserSchema({
            name,
            email,
            password: hashedPassword,
            image,
            studentId
        });

        await newUser.save();

        return res.status(201).json({user: newUser,message: "User Sign up successfully."});

    }catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Sign in
export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const parserBody = UserZodSchema.pick({ email: true, password: true }).safeParse(req.body);

        if(!parserBody.success) {
            return res.status(422).json({message: parserBody.error.issues[0].message});
        }

        const existingUser = await UserSchema.findOne({}).or([{ email }]);

        if(!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password, (existingUser as any).password);

        if(!isPasswordMatch) {
            return res.status(401).json({message: "Invalid password"});
        }

        return res.status(200).json({message: "User sign in successfully.", user: existingUser});

    }catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// Sign out
export const signOut = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Invalid id"});
        }

        return res.status(200).json({message: "User sign out successfully."});

    }catch(error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}
