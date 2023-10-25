import express, { Application } from "express"
import cors from "cors"
import mongoose from "mongoose"
import { mainApp } from "./mainApp";

const url: string = "mongodb+srv://josephine:josephine@cluster0.kckuw8r.mongodb.net/db?retryWrites=true&w=majority";
const port: number = 3355;
const app: Application = express()


app.use(cors()),
app.use(express())

mainApp(app)

const server = app.listen(port, () => {
    mongoose.connect(url).then(() => {
        console.log("server is connected")
    })
   
})


process.on("uncaughtException", (error: Error) => {
    console.log("uncaughtException", error)
    process.exit(1)
   
})

process.on("unHandledRejection", (error: Error)=> {
   console.log("unHandledRejection", error)

   server.close(() => {
    process.exit(1)
   })
})