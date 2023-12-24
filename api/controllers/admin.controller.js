import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const viewUsers = async (req, res, next) => {
 
    try {
      
      const users = await User.find();
    
      if (!users) return next(errorHandler(404, 'User not found!'));
    
      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user._doc;
        return userWithoutPassword;
      });
      
    
      res.status(200).json(usersWithoutPassword);
    } catch (error) {
     
      next(error);
    }
  };

  
