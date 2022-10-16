// Todo DS

// const todo = {
//     id: "",
//     title: "",
//     isCompleted: "false",
// }; 

//Utility function
const pageReload = ()=>{
    window.location.reload();
}

const addBtn = document.querySelector(".add-btn")
const editBtn = document.querySelector(".edit-btn")

// Get todo DB from local storage
const todoDBName = "db101";
const todoDBInstance = JSON.parse(localStorage.getItem(todoDBName)) || []; 

// create todo function
const addTodo = ()=>{
    const todoInput = document.getElementById("todo-input")
    const title =todoInput.value;
    const newTodo = {
        id: todoDBInstance.length + 1,
        title: title,
        isCompleted: false,
    };

    const updatedTodoDB = [...todoDBInstance, newTodo];
    localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));
    pageReload();
};

//Render

const renderTodoItems = ()=>{
    const todoListContainer = document.querySelector("#todo-list-container")
    const todoListItems = todoDBInstance.map(({id, isCompleted, title})=>{
        return `
                <li class= ${isCompleted && "checked"}>
                ${title}
                    <span class="complete-status-icon" onClick="toggleComplete(${id})" >✔</span>
                    <span class="edit-icon" onClick="editMode(${id})" >✍</span>
                    <span class="close" onClick="deleteTodo(${id})" >🗑</span>
                </li>
        `;
    }).join("");

    todoListContainer.innerHTML = todoListItems;
};

const editMode = (id)=>{
    const todo =todoDBInstance.find((todo)=> todo.id === id);
    document.getElementById("todo-input").value = todo.title;
    addBtn.style.display = "none";
    editBtn.style.display = "block";
    editBtn.setAttribute("id", id);
};

function updateTodoTitle(){
    const {id} = this;
    // const editTitle = parseInt(id);
    const todoToUpdate =todoDBInstance.find((todo)=> todo.id === parseInt(id));
    todoToUpdate.title = document.getElementById("todo-input").value;

    const updatedTodoDB = todoDBInstance.map((todo) => 
        todo.id === id ? todoToUpdate : todo
    );
    localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));
    pageReload();
};

//Delete Function
function deleteTodo(todoId){
    const updatedTodoDB = todoDBInstance.filter(({id}) => id !== todoId)
    localStorage.setItem(todoDBName, JSON.stringify(updatedTodoDB));
    pageReload();
}








//Event Listener
addBtn.addEventListener("click", addTodo); 
editBtn.addEventListener("click", updateTodoTitle); 

//Run on page load
renderTodoItems();