const {expect} = require('chai');

const {describe} = require('mocha')

const assert = require('assert');

const sinon = require('sinon');

const todos = require('../util/data')

const jest = require('jest-mock')

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
  } = require('../controllers/todo');
  
 


  // describe('GET /todos', () => {
  //   it('should return all todos', async () => {
  //     const mockReq = {}
  //     const mockRes = {
  //       status: sinon.stub().returnsThis(),
  //       json: sinon.spy()
  //     }
  //     const mockNext = sinon.spy()
  //     const todos = [
  //             { id: 1, title: 'Todo 1',description:'some description',completed:false },
  //             { id: 2, title: 'Todo 2',description:'some description',completed:false }
  //           ];
  
  //     await getTodos(mockReq, mockRes, mockNext)
  
  //     expect(mockRes.status.calledOnce).to.be.true
  //     expect(mockRes.status.firstCall.args[0]).to.eql(200)
  //     expect(mockRes.json.calledOnce).to.be.true
  //     expect(mockRes.json.firstCall.args[0]).to.eql(todos)
  //     expect(mockNext.notCalled).to.be.true
  //   })
  // })




describe('GET /todos', () => {
  it('should return all todos', async () => {
    const mockReq = {}
    const mockRes = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    }
    const mockNext = sinon.spy()
 
    // Add sample data to the imported `todos` array
   
  
    await getTodos(mockReq, mockRes, mockNext)

    expect(mockRes.status.calledOnce).to.be.true
    expect(mockRes.status.firstCall.args[0]).to.eql(200)
    expect(mockRes.json.calledOnce).to.be.true
    expect(mockRes.json.firstCall.args[0]).to.eql(todos)
    expect(mockNext.notCalled).to.be.true

    // Clean up - remove the sample data from the `todos` array for future tests
    todos.length = 0;
  })
})
  
    describe('createTodo', () => {
      it('should create a todo', () => {
        const req = {
          body: {
            id: '1',
            title: 'Test todo',
            description: 'This is a test todo',
            completed: false
          }
        };
        const res = {
          status: (status) => {
            assert.strictEqual(status, 201);
            return {
              json: (todo) => {
                assert.strictEqual(todo.title, req.body.title);
                assert.strictEqual(todo.description, req.body.description);
                assert.strictEqual(todo.completed, false);
              }
            }
          }
        };
        const next = () => {};
        createTodo(req, res, next);
      });
    });



  describe('updateTodo function', () => {
  const id = '1'; // The ID of an existing todo item
  
  
  it('should update a todo item given a valid ID and valid request body', async () => {
    const req = { params: { id }, body: { title: 'Updated Todo', description: 'Updated description', completed: true } };
    const mockRes = {
      status: code => ({
        statusCode: code,
        json: data => ({ body: data })
      })
    };
    const mockNext = err => { throw err; }; // For this test, we don't expect to be thrown

    await updateTodo(req, mockRes, mockNext);

    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.body).to.deep.equal(req.body);
    expect(todos).to.deep.include(req.body);
  });

});

    
describe('deleteTodo function', () => {
  const id = '1'; // The ID of an existing todo item

  beforeEach(() => {
    // Set up a mock todo list for testing purposes
    global.todos = [
      { id: '1', title: 'Todo 1', description: 'some description', completed: false },
      { id: '2', title: 'Todo 2', description: 'some description', completed: false }
    ];
  });
  
  afterEach(() => {
    // Clean up the mock todo list after each test
    delete global.todos;
  });
  
  it('should delete a todo item given a valid ID', async () => {
    const req = { params: { id } };
    const mockRes = {
      status: code => ({
        statusCode: code,
        json: data => ({ body: data })
      })
    };
    const mockNext = sinon.spy(); // For this test, we don't expect any errors to be thrown
 
    await deleteTodo(req, mockRes, mockNext);

    expect(mockRes.statusCode).to.equal(200);
    expect(mockRes.body.message).to.equal('Todo deleted.');
    expect(global.todos).to.not.include({ id });
  });

});


  
  
 

 