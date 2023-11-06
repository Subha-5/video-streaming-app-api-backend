const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(err => next(err))
    }
}

export {asyncHandler};

/*
const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (err) {
            res.status(err.code || 500).json({
                status: false,
                message: err.message
            })
        }
    }
}
*/