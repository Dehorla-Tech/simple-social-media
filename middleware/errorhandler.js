import ErrorResponse from "../utils/errorResponse.js";


const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;
    console.log(err);

    if (err.code === 11000) {
        const message = "Duplicate Field Value Enter";
        error = new ErrorResponse(message, 400)
        console.log(error);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
        console.log(error);
    }

    if (err.name === "JsonWebTokenError") {
        const message = "jwt Expired";
        error = new ErrorResponse(message, 400)
        console.log(error);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "server error",
});
};

export default errorHandler;