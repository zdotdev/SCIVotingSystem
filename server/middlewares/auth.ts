import jwt from 'jsonwebtoken';

export const generateAcessToken = async ({ id }: { id: string }) => {
    return jwt.sign({ id }, 'your_secret_key', { expiresIn: '1h' });
}