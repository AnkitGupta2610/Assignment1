var StatusEnums = { ACTIVE : "ACTIVE", COMPLETE: "COMPLETE", DELETE: "DELETE"};

var todos = {
    1: { title: "Learn JavaScript", status:StatusEnums.ACTIVE},
    2: { title: "Learn Node", status:StatusEnums.ACTIVE},
    3: { title: "Learn React", status:StatusEnums.ACTIVE}
}

var next_todo_id = 4;


// Exports the data stored in this file
module.exports = {
    StatusEnums: StatusEnums,
    todos: todos,
    next_todo_id: next_todo_id
}