import express, { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import {Book, BookStore} from "../models/book"


const cart = new BookStore();

const index = async (req: Request, res: Response ) => {
        const trolly = await cart.index()
        res.status(200).json({
            status:'Success',
                message: "This book has successfully",
                data: trolly
        });
}
const create = async (req: Request, res: Response ) => {
    const booked: Book  = {
            
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages, 
        type: req.body.type,
        summary: req.body.summary
    } 

    // try {
    //     const authorizationHeader = req.headers.authorization?.split('')[1]
    //     console.log(authorizationHeader)
    //     jwt.verify(req.body.token, process.env.TOKEN_SECRET)
    // } catch (error) {
    //   res.status(402)
    //   res.json(`Invalid Token ${error}`) 
    //   return;
    // }

    try {
        
        
            const book = await cart.create(booked)
            res.json(book);
    } catch (error) {
        res.status(404)
        res.json(error)
    }
}

const show = async (req: Request, res: Response ) => {
  
 try {
    const trolly = await cart.show(parseInt(req.params.id))
    res.status(200).json({
        status:'Success',
            message: "This book has successfully",
            data: trolly
    });
 } catch (error) {
     res.status(404)
     res.json({message: 'Book can not be found'})
 }
}

const destroy = async (req: Request, res: Response ) => {
  
 try {
    const trolly = await cart.delete(parseInt(req.params.id))
    res.status(200).json({
        status:'Success',
            message: "This book has deleted",
            data: trolly
    });
 } catch (error) {
     res.status(404)
     res.json({message: 'Book can not be deleted'})
 }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split('')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(401) 
    }
}


const book_routes = (app: express.Application) => {
    app.get('/books', index);
   
    app.post('/books', verifyAuthToken, create);
    app.get('/books/:id', show);
    app.delete('/books/:id', verifyAuthToken,  destroy)
}

export default book_routes


