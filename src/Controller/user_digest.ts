import express, {Request, Response, NextFunction} from 'express'
import { User, UserLog } from '../models/user_digest'
import jwt from 'jsonwebtoken'

const store = new UserLog()


const index = async (req: Request, res: Response) => {
    try {
        const result = await store.get();
        const response = {
            status: "success",
            statusCode: 200,
            response: result,
        };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

const create = async (req: Request, res: Response) => {
    const user : User = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }
    try { 
        
      

        const newUser = await store.create(user)
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
        res.json(token)

    } catch (error) {
        
        console.log(error)
        res.status(404).json({message : `cannot create user`})
        
        
    }
}

const authenticate = async (req: Request, res: Response) =>{
    // const user: User = {
    //     username: req.body.username,
    //     password: req.body.password
    // }


    try {
        
        const authenticateduser = await store.authenticate(req.body.username, req.body.password)
        const token = jwt.sign({user: authenticateduser}, process.env.TOKEN_SECRET)
        res.json(token)

    } catch (error) {
        res.status(404).json({message: `aunthentication failed`})
        
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split('')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        res.json({error}) 
    }
}



const user_digest_routes = (app: express.Application) => {
    app.get("/user_digest", index);
    // app.get("/stores/:id", show);
    app.post("/user_digest", verifyAuthToken, create);
    app.post("/login_digest", verifyAuthToken, authenticate)
    // app.patch("/stores/:id", update);
    // app.delete("/stores/:id", destroy);
}

export default user_digest_routes