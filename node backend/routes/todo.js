const express = require('express');

const {check} =require('express-validator');

const router = express.Router();

const  todoController = require('../controllers/todo');

router.get('/getTodos',todoController.getTodos);

router.post('/create',[
    check('title').not().isEmpty(),
    check('description').not().isEmpty().isEmail().withMessage('Please enter a valid email'),
],todoController.createTodo)


router.put('/updateTodo/:id',todoController.updateTodo)

router.delete('/delete/:id',todoController.deleteTodo)

module.exports = router;  