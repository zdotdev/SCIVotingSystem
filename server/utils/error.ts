export const errorHandler = (statusCode: any, message: any) => {
    const error = new Error(message);
    error.message = message;

    return {
        statusCode,
        error
    };
}

export const globalErrorHandler = (error: any, req: any, res: any, next: any) => {
    console.error(error);
    res.status(error.statusCode || 500).json({message: "Internal Server Error", error: error.message})
}

