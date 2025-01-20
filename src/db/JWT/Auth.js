import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const generateAccessToken = async (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '20h' });
}

export const generateRefreshToken = async (id, email) => {
    return jwt.sign({ id, email }, JWT_SECRET);
}