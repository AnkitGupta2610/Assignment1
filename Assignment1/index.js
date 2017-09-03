var express = require("express");
var bodyParser = require("body-parser");
var todo_db = require("./seed.js"); // Import the todos data

var app = express();


app.use("/",express.static(__dirname + "/public"));         // Middleware to serve static files
app.use("/",bodyParser.urlencoded({extended: false}));      // Middleware to parse incoming request bodies

// GET Request: API to fetch all the todos from local storage
app.get("/api/todos",function (req,res) {
    res.json(todo_db.todos);
})

// POST Request: API to add the todo in local storage
app.post("/api/todos",function (req,res) {
    var title = req.body.title;
    if(!title || title=="" || title.trim()==""){
        res.status(400).json({err: "Title can't be empty"}); // Bad Request
    }

    else{
        var new_todo_object = {
            title: req.body.title,
            status: todo_db.StatusEnums.ACTIVE
        }

        todo_db.todos[todo_db.next_todo_id++] = new_todo_object;
        res.json(todo_db.todos);
    }
})

// DELETE Request: API to delete a particular todo from local storage
app.delete("/api/todos/:id",function (req,res) {
    var del_id = req.params.id;
    var todo = todo_db.todos[del_id];
    if(!todo){
        res.status(400).json({err: "Todo doesnot exist"});  // Bad Request
    }
    else{
        todo.status = todo_db.StatusEnums.DELETE;
    }
    res.json(todo_db.todos);
})

// PUT Request: API to modify a particular todo in local storage
app.put("/api/todos/:id",function (req,res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];

    if(!todo){
        res.status(400).json({err: "Todo doesnot exist"});  // Bad Request
    }

    else{
        var todo_title = req.body.title;
        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title = todo_title;
        }

        var todo_status = req.body.status;

        if(todo_status && (todo_status == todo_db.StatusEnums.ACTIVE || todo_status == todo_db.StatusEnums.COMPLETE)){
            todo.status = todo_status;
        }

        res.json(todo_db.todos);
    }
})

// GET Request: API to fetch all the active todos from local storage
app.get("/api/todos/active",function (req,res) {
    var active_todos = {};
    for(var i=1; i < todo_db.next_todo_id; i++){
        if(todo_db.todos[i].status === todo_db.StatusEnums.ACTIVE){
            active_todos[i] = todo_db.todos[i];
            active_todos[i].title = todo_db.todos[i].title;
            active_todos[i].status = todo_db.todos[i].status;
        }
    }
    res.json(active_todos);
})

// GET Request: API to fetch all the complete todos from local storage
app.get("/api/todos/complete",function (req,res) {
    var complete_todos = {};
    for(var i=1; i < todo_db.next_todo_id; i++){
        if(todo_db.todos[i].status === todo_db.StatusEnums.COMPLETE){
            complete_todos[i] = todo_db.todos[i];
            complete_todos[i].title = todo_db.todos[i].title;
            complete_todos[i].status = todo_db.todos[i].status;
        }
    }
    res.json(complete_todos);
})

// GET Request: API to fetch all the deleted todos from local storage
app.get("/api/todos/deleted",function (req,res) {
    var deleted_todos = {};
    for(var i=1; i < todo_db.next_todo_id; i++){
        if(todo_db.todos[i].status === todo_db.StatusEnums.DELETE){
            deleted_todos[i] = todo_db.todos[i];
            deleted_todos[i].title = todo_db.todos[i].title;
            deleted_todos[i].status = todo_db.todos[i].status;
        }
    }
    res.json(deleted_todos);
})

// PUT Request: API to mark todo as complete in local storage
app.put("/api/todos/complete/:id",function (req,res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];

    if(!todo){
        res.status(400).json( { err : "Can't modify the status of a todo that doesnot exist"});     // Bad Request
    }

    else{
        todo.status = todo_db.StatusEnums.COMPLETE;
    }

    res.json(todo_db.todos);
})

// PUT Request: API to marl todo as deleted in local storage
app.put("/api/todos/delete/:id",function (req,res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];

    if(!todo){
        res.status(400).json( { err : "Can't modify the status of a todo that doesnot exist"});     // Bad Request
    }

    else{
        todo.status = todo_db.StatusEnums.DELETE;
    }

    res.json(todo_db.todos);
})

// PUT Request: API to mark todo as active in local storage
app.put("/api/todos/active/:id",function (req,res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];
    if(!todo){
        res.status(400).json( { err : "Can't modify the status of a todo that doesnot exist"});     // Bad Request
    }

    else{
        todo.status = todo_db.StatusEnums.ACTIVE;
    }

    res.json(todo_db.todos);
})


app.listen(4000);       // Server listening on port 4000