import {Request, Response} from "express"
import bcrypt from "bcrypt"
import userModel from "../model/userModel"
import { streamUpload } from "../utils/Stream"
import jwt from "jsonwebtoken";

export const createUser = async (req: any, res: Response) => {
  try {
    const {email, password, userName, bio} = req.body

      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password, salt)

      const {secure_url, public_id}: any = await streamUpload(req)

      const user = await userModel.create({
        email, 
        password: hashed,
        userName,
        bio,
        avatar: secure_url,
        avatarID: public_id
      })
return res.status(201).json({
  message: "user created",
  data: user
})
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
}

export const SignInUser = async (req: Request, res: Response) => {
  try {
   const {email, password} = req.body;

   const user = await userModel.findOne({email});

   if(user) {
   const pass = await bcrypt.compare(password, user.password)

    if(pass) {
     const token = jwt.sign(
      {
        id: user._id
      },
      "coded"
     )
      return res.status(201).json({
        message: `wel back ${user.userName}`
      })
    } else {
      return res.status(404).json({
        message: "user Error"
       })
    }
   } else {
     return res.status(404).json({
      message: "user Error"
     })
   }
  } catch (error) {
    return res.status(404).json({
      message: "user Error"
     })
  }
}
  


  export const updateUser = async (
    req: Request,
    res: Response
  )=> {
   try {
    const {userID} = req.params;

    const {secure_url, public_id} : any = await streamUpload(req)

    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        avatar: secure_url,
        avatarID: public_id,
      },
      {new: true}
    )
    return res.status(200).json({
      message: "user created",
      data: user,
    });
   } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
   }
  };


 export const getOneUser = async (req: any, res: Response) => {
  try {
    const {userID} = req.params

    const user = await userModel.findById(userID)

    return res.status(200).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
 }