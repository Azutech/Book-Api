import { constants } from "buffer";
import client from "../database";

export type Book = {
   id?: Number;
   title: String;
   author: String;
   total_pages: Number;
   type: String;
   summary: String;
};

export class BookStore {
   async index(): Promise<Book[]> {
      try {
      const conn = await client.connect();
      const sql = "SELECT * FROM book";
      const res= await conn.query(sql);
      console.log("lots of it", res);

      conn.release()
      return res.rows;
      } catch (err) {
         throw new Error (`Could not find the database ${err}`)
      }
   }
   async show(id : number): Promise<Book[]> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM book WHERE id = ($1)";
         const res= await conn.query(sql, [id]);
         console.log("lots of it", res);
         conn.release()
      return res.rows[0];
      } catch (err) {
         throw new Error(`Could not find the book ${id} Error: ${err}`)
      }
   }
   async delete(id : number): Promise<Book[]> {
      try {
         const conn = await client.connect();
         const sql = "SELECT * FROM book WHERE id = ($1)";
         const res= await conn.query(sql, [id]);
         console.log("lots of it", res);
         conn.release()
      return res.rows[0];
      } catch (err) {
         throw new Error(`Could not find the book ${id} Error: ${err}`)
      }
   }

   async create(book: Book) {
      const conn = await client.connect();

      const text =
          "INSERT INTO book(title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *";
      const values: (String | Number)[] = [
         book.title,
         book.author,
         book.total_pages,
         book.type,
         book.summary,
      ];
      const res = await conn.query(text, values);
      console.log("the fast way to get there", res.rows[0]);
      conn.release()
      return res.rows[0];
   }
}
