import { Request, Response, NextFunction } from 'express';
export const errorHandler = (statusCode: number, message: string) => {
    const error = new Error(message);
    error.message = message;

    return {
        statusCode,
        error
    };
}

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(error.statusCode || 500).json({message: "Internal Server Error", error: error.message})
}