const express=require('express');
 const app=express();
const { Todo }=require('./models');
const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.json());

app.set("view engine","ejs");
app.get("/", async (reqest,response)=>{
    const allTodos = await Todo.getTodo()
    if(reqest.accepts("html")){
        response.render('index',{
            allTodos
        });
    }else{
        response.json({
            allTodos
        })
    }
response.render('index');
});
app.use(express.static(path.join(__dirname,'public')))
app.post("/arun",async (request,response)=>{
    try{
        console.log("creating a todo",request.body)
        const todo = await Todo.addTodo({title:request.body.title,duedate:request.body.duedate,markAsComplete:false});
        return response.json(todo)
     
    }catch (error){
console.log(error);
return response.status(422).json(error)                              
    }   
});

app.put("/arun/:id/markAsCompleted",async (request,response)=>{
    const todo=await Todo.findByPk(request.params.id);
    console.log(request.params.id)
    try{

        const updatetodo = await todo.markAsCompleted();
        return response.json(updatetodo)
     
    }catch (error){ 
console.log(error);
return response.status(422).json(error)
    }   
});
app.get("/arun",async (request,response)=>{
  
    const todo =await Todo.findAll();
    try{
     
        return response.json(todo)
     
    }catch (error){ 
console.log(error);
return response.status(422).json(error)
    }   
});
app.delete("/arun/:id/delete",async (request,response)=>{
    
    
    try{

        const deleted =await Todo.destroy({
            where: {
              id: request.params.id
            },
          
        });
        response.send(deleted ? true : false);
     
    }catch (error){ 
        response.send(false)
return response.status(422).json(error)
    }   
});



module.exports=app;