import { create } from "domain";
import { Book, BookStore } from "../src/models/book";



const store = new BookStore();

describe("Book Store Model", () => {
   it("should have an index method", () => {
      expect(store.index).toBeDefined();
   });

   // it("index should return a list of details", async () => {
   //    const result = await store.index();
   //    expect(result).toEqual([{ id: 1, title: 'Bridge to Terabithia', author: 'Katherine Paterson', total_pages: 288, type: 'childrens', summary: 'A GOOD BOOK' }]);
   // });
});

describe("Book Store Model", () => {
   it("should have a create method", () => {
      expect(store.create).toBeDefined();
   })
});

describe("Book Store Model", () => {
   it("should have a destroy method", () => {
      expect(store.delete).toBeDefined();
   })
});

describe("Book Store Model", () => {
   it("should have a show method", () => {
      expect(store.show).toBeDefined();
   })
});
