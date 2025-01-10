// import { Request, Response } from "express";
// import { UserSchema } from "../models/user";
// import { errorHandler } from "../utils/error";
// import mongoose from "mongoose";

// // get all users
// export const getUsers = async (req: Request, res: Response) => {
//     try {
//         const users = await UserSchema.find();

//         if (!users || !users.length) {
//             errorHandler(404, "No users found");
//         }

//         return res.status(200).json({message: "User list retrieved successfully.", user: users});
//     } catch (error) {
//         errorHandler(500, (error as Error).message);
//     }
// }

// // get user by id
// export const getUserById = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.id;

//         if (!userId || !mongoose.isValidObjectId(userId)) {
//             errorHandler(404, "User not found");
//         }

//         const user = await UserSchema.findById(userId);

//         if (!user) {
//             errorHandler(404, "User not found");
//         }

//         return res.status(200).json({message: "User retrieved successfully.", user});
//     } catch (error) {
//         errorHandler(500, (error as Error).message);
//     }
// }

// // delete user by id
// export const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.id;

//         if (!userId || !mongoose.isValidObjectId(userId)) {
//             errorHandler(404, "User Id is required.");
//         }

//         const user = await UserSchema.findById(userId);

//         if (!user) {
//             errorHandler(404, "User not found");
//         }

//         try {
//             await UserSchema.findByIdAndDelete(userId);
//         } catch {
//             errorHandler(500, "Error deleting user");
//         }

//         return res.status(200).json({message: "User deleted successfully"});
//     }catch (error) {
//         errorHandler(500, (error as Error).message);
//     }
// }
