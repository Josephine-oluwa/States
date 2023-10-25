import {Application, Request, Response} from "express"
import auth from "./Router/useRouter"

export const mainApp = (app: Application)=> {
    app.use("api", auth)
   app.get("/", (req: Request, res: Response)=> {
    try {
        return res.status(201).json({
            message:"Awesome APi"
        })
    } catch (error) {
        return res.status(404).json({
            message:"Awesome APi"
        })
    }
   })
    }
