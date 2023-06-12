const HttpError = require('../models/http-error');
const Todo = require('../models/todo')
const { v4: uuidv4 } = require('uuid');

const todos = []

exports.getTodos=async(req, res, next)=>{

    try{
        res.status(200).json(todos)

    }catch(err){
        const error = new HttpError('Something went wrong, could not get todos.', 500);
        return next(error);
    }
}

exports.getTodoById = async(req, res, next)=>{
    const id = req.params.id
    const foundTodo = todos.find((todo) => todo.id === id);
    res.status(200).json({foundTodo})
}


exports.createTodo = async (req, res, next) => {
 
  try {
    const id = uuidv4();
    const newTodo = new Todo(id,req.body.title,req.body.description , false);
    todos.push(newTodo);

    res.status(201).json( newTodo );
  } catch (err) {
    const error = new HttpError('Something went wrong, could not create todo.', 500);
    return next(error);
  }
}

exports.updateTodo=async(req,res,next)=>{
    const id =req.params.id
    try{
        const todoIndex = todos.findIndex((todo) => todo.id === id);
       
        if(todoIndex < 0){
            if (check) {
                return next(new HttpError("todo not found.", 404));
              }
        }

        todos[todoIndex] = new Todo(id,req.body.title,req.body.description,req.body.completed);
       const  result = todos.find(todo =>todo.id === id)
         res.status(200).json(result);

    }catch(err){
         const error = new HttpError('Something went wrong, could not update todo.', 500);
        return next(error);
    }
}

exports.deleteTodo= async(req,res,next) =>{
    console.log('inside')
    const id  = req.params.id
    try{
        const todoIndex = todos.findIndex((todo) => todo.id === id);
        const deletedTodo = todos[todoIndex];
        todos.splice(todoIndex, 1);
        res.status(200).json({message: 'Todo deleted.'});
    }catch(err){
        const error = new HttpError('Something went wrong, could not delete todo.', 500);
        return next(error);
    }
}