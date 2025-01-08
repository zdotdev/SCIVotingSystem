import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateAcessToken = async ({ id }: { id: string }) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '20h' });
}

const generateRefreshToken = async ({ id }: { id: string }, { email }: { email: string }) => {
    return jwt.sign({ id, email }, process.env.JWT_REFRESH_SECRET as string);
}

export default { generateAcessToken, generateRefreshToken };