 
 //write basic express boilerplate code ,
 //with express.json() middleware

 const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
 const  app = express();

 app.use(express.json());
 app.use(cors());

 app.post("/todo" , async(req , res) => {
     const createPayload = req.body;

     /* 
     *Validation: createTodo.safeParse(createPayload) checks if createPayload conforms to the createTodo schema.
     * Error Handling: If the validation fails (!parsedPayload.success), it sends a 400 status code with an error message indicating that the inputs are incorrect.
*/
     const parsedPayload =  createTodo.safeParse(createPayload);
     if(!parsedPayload.success) {
        res.status(411).json({
            msg : "you send the wrong Inputs" ,
        })
        return ;
     }
     //put it in mongodb
     await todo.create({
           title : createPayload.title ,
           description : createPayload.description,
           completed : false 

     })

     res.json({
        msg : "Todo created"
     })
 })

 app.get("/todos" , async(req , res) => {
        const todos = await todo.find({});

        res.json({
            todos
        })

 })

 app.put("/completed", async (req , res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "you send the wrong Inputs" ,
        })
        return ;
    }
    await todo.update({
        _id: req.body.id
    } , {
        completed : true
    })
    res.json({
        msg : "Todo marked as completed"
    })
 })
 
 app.listen(3000);

  

  //ZOD FOR VALIDATION 