import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Application } from "express-serve-static-core";
import cors from 'cors'

import book_routes from "./Controller/books";
import user_digest_routes from "./Controller/user_digest";

const app: express.Application = express();

const PORT: Number = 3001;
app.use(express.json())
  
app.use(cors())

app.use(bodyParser.json());

book_routes(app)

user_digest_routes(app)

 

app.listen(PORT, () => {
   console.log(`This is running at this PORT ${PORT}`);
});
