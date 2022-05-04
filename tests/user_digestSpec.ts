import { UserLog } from "../src/models/user_digest";



const  store = new UserLog()

describe("UserLog Model", ()=>{
    it("It should have a get method", () =>{
        expect(store.get).toBeDefined()
    })
})
describe("UserLog Model", ()=>{
    it("It should have a create method", () =>{
        expect(store.create).toBeDefined()
    })
})
describe("UserLog Model", ()=>{
    it("It should have a authenticate method", () =>{
        expect(store.authenticate).toBeDefined()
    })
})