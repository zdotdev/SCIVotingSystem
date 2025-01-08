import jwt from 'jsonwebtoken';

export const validateToken = async (req: any, res: any, next: any) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decodedToken !== 'string' && 'user' in decodedToken) {
            req.user = { id: decodedToken.user };
        } else {
            return res.status(403).send({ message: "Forbidden" });
        }
        next();
    } catch (err) {
        return res.status(403).send({ message: "Forbidden" });
  }
}