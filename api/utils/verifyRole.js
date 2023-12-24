
import { errorHandler } from './error.js';

export const verifyRole = async (req, res,next) => {
    console.log(req.user.role)
    if(req.user.role !== "admin"){
        return next(errorHandler(401, 'Unauthorized'));
    }
    next();
};
