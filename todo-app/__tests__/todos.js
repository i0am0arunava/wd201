const request=require("supertest");
const db = require("../models/index")
const app=require("../app")
let server,agent;
describe("todo test suite", () =>{
    beforeAll(async ()=>{
        await db.sequelize.sync({force:true});
        server = app.listen(300,()=>{});
        agent = request.agent(server);
    });
    afterAll(async () =>{
        await db.sequelize.close();
        server.close();
    })
    test("respond with json at /todos", async () =>{
        const response = await agent.post('/arun').send({
            'title':'buy milk',
           'duedate':new Date().toISOString(),
           completed:false
        })
        expect(response.statusCode).toBe(200);
        expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
       const parsedResponse = JSON.parse(response.text);
       expect(parsedResponse.id).toBeDefined();

    });
    test("respond with markascoplete", async () =>{
        const response = await agent.post('/arun').send({
            'title':'buy milk',
           'duedate':new Date().toISOString(),
           "markAsComplete":false
        });
        
     const a = JSON.parse(response.text);
     expect(a.markAsComplete).toBe(false)
     const i=a.id;
     const markascompl=await agent.put(`/arun/${i}/markAsCompleted`).send();
        b=JSON.parse(markascompl.text)
        expect(b.markAsComplete).toBe(true)

    });
    test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
        // FILL IN YOUR CODE HERE
      const response = await agent.post('/arun').send({
            'title':'buy milk',
           'duedate':new Date().toISOString(),
           "markAsComplete":false
        });
        const a = JSON.parse(response.text);
        
        const i=a.id;
        const deleteres=await agent.delete(`/arun/${i}/delete`).send();
        const c=JSON.parse(deleteres.text);
        expect(c).toBe(true);
      });


})