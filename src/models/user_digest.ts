import client from "../database";
import bcrypt from "bcrypt";
import { connect } from "http2";

export type User = {
   id?: number
   username: string;
   first_name: string; 
   last_name: string;
   password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export class UserLog {
   async get(): Promise<User[]> {
      try {
         //@ts-ignore
         const conn = await client.connect();
         const sql = "SELECT * FROM users_digest";
         const result = await conn.query(sql)
         conn.release()
         console.log(result)
         return result.rows
         
      } catch (error) {
         throw new Error(`Can't find User ${error}`);
      }
   }

// async index(): Promise<User[]> {
//     try {
//         // @ts-ignore
//         const conn = await client.connect();
//         const sql = "SELECT * FROM users";
//         const res = await conn.query(sql);
//         conn.release();
//         return res.rows;
//     } catch (err) {
//         throw new Error(`could not connect fetch data from the db ${err}`);
//     }
// }

   async create(user: User): Promise<User[]> {
      try {
         //ts-ignore
         const conn = await client.connect();
         const sql =
            "INSERT INTO users_digest (username, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING * ;";
         const hash = bcrypt.hashSync(user.password + pepper, saltRounds);
         const result = await conn.query(sql, [user.username, user.first_name, user.last_name,hash]);
         conn.release();
         console.log(result);
         return result.rows[0];
      } catch (error) {
         throw new Error(`unable to create user(${user.username}): ${error}`);
      }
   }

   async authenticate(
      username: string,
      password: string
   ): Promise<User[] | null> {
      try {
         const conn = await client.connect();
         const sql = "SELECT password FROM users_digest WHERE username = ($1)";
         const result = await conn.query(sql, [username]);

         if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + pepper, user.password)) {
               return user;
            }
         }

         return null;
      } catch (error) {
         throw new Error(`Could not authenticate user`);
      }
   }
}
