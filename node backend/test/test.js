const {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
  } = require('../controllers/todo');
  
  describe('Todos controller', () => {
    describe('getTodos', () => {
      it('should return an array of todos', async () => {
        const todos = await getTodos();
        expect(todos).toBeInstanceOf(Array);
      });
    });
  
    describe('getTodoById', () => {
      it('should return a todo with the given id', async () => {
        const id = 'some-id';
        const todo = await getTodoById(id);
        expect(todo.id).toBe(id);
      });
    });
  
    describe('createTodo', () => {
      it('should create a new todo', async () => {
        const title = 'some title';
        const description = 'some description';
        const todo = await createTodo({ title, description });
        expect(todo.title).toBe(title);
        expect(todo.description).toBe(description);
      });
    });
  
    describe('updateTodo', () => {
      it('should update an existing todo', async () => {
        const id = 'some-id';
        const title = 'some title';
        const description = 'some description';
        const completed = true;
        const todo = await updateTodo(id, { title, description, completed });
        expect(todo.title).toBe(title);
        expect(todo.description).toBe(description);
        expect(todo.completed).toBe(completed);
      });
    });
  
    describe('deleteTodo', () => {
      it('should delete an existing todo', async () => {
        const id = 'some-id';
        const deletedTodo = await deleteTodo(id);
        expect(deletedTodo.message).toBe('Todo deleted.');
      });
    });
  });