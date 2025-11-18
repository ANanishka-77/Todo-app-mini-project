var todos = [];
var i = 0;

function init() {
  var PaneDiv = document.createElement("div");
  //var rightPaneDiv = document.createElement("div");

  PaneDiv.setAttribute("id", "PaneDiv");
  var heading = document.createElement("h1");
  heading.innerHTML = "Todo - List";
  heading.setAttribute("id","header")
  PaneDiv.appendChild(heading);

  //rightPaneDiv.setAttribute("id", "rightDiv");

  document.body.appendChild(PaneDiv);


  var inputTodo = document.createElement("input");

  inputTodo.setAttribute("placeholder", "Enter your task here");
  inputTodo.setAttribute("type","text");
  inputTodo.setAttribute("class", "textarea");
  inputTodo.setAttribute("id", "todobox");
  PaneDiv.appendChild(inputTodo);

  storedLocalStorage();

  inputTodo.addEventListener("keydown", addTask);
}


function addTask(event) {
  var keyCode = event.code;
  var todoBox = document.getElementById("todobox");
  var value = todoBox.value;
  if (keyCode === "Enter" && value !== "") {
    event.preventDefault();

    var container = document.createElement("div");
    var taskHeading = document.createElement("h4");
    var checkBox = document.createElement("input");
    var editBtn = document.createElement("button");
    var crossBtn = document.createElement("button");

    checkBox.setAttribute("type", "checkbox");
     checkBox.setAttribute("id","checkBox");
    crossBtn.setAttribute("id", "cross");
    editBtn.setAttribute("id","edit");
    
   

    container.appendChild(taskHeading);
    container.appendChild(checkBox);
    container.appendChild(editBtn);
    container.appendChild(crossBtn);

     editBtn.innerHTML = "✎";
     crossBtn.innerHTML = "❌";

      taskHeading.innerHTML = value;
    let i = localStorage.getItem("i");
    i++;

    crossBtn.addEventListener("click", function (event) {        
      let storedTodos = localStorage.getItem("todos");
      container.remove();
      todos = todos.filter((todo) => todo.id !== i);
      localStorage.setItem("todos", JSON.stringify(todos));
    });
     
    editBtn.addEventListener("click", function(event){
      var todo=localStorage.getItem("todos");
      todo=JSON.parse(todo);
      const index = todo.findIndex(obj => obj.id === i);

         if(todo[index].data != null && todo[index].data != ""){
         todoBox.innerHTML =todo[index].data;
         }
         var updateBtn=document.createElement("button");
         var a=document.getElementById("PaneDiv");
         updateBtn.innerHTML="Update Task";
         updateBtn.id="updateBtn";
         a.appendChild(updateBtn);

         updateBtn.addEventListener("click",function(){
         taskHeading.innerHTML=todoBox.value;
         todo[index].data=todoBox.value;
         localStorage.setItem("todos",JSON.stringify(todo));
          todoBox.value = "";
         updateBtn.remove();
         });

     });

     checkBox.addEventListener("change", function (event) {
       var todo=localStorage.getItem("todos");
      todo=JSON.parse(todo);
      const index = todo.findIndex(obj => obj.id === i);
      todo[index].isChecked = checkBox.checked;
     
      if (todo[index].isChecked === true || todo[index].isChecked === "true")
      {
         taskHeading.style.textDecoration = "line-through"; 
      } else {
        taskHeading.style.textDecoration = "none";
      }
       localStorage.setItem("todos", JSON.stringify(todo));
    });
    

    container.setAttribute("class", "todoContainer");
    
   
    todos.push({ id: i, isChecked: false, data: value });
    // [{isChecked:false,data:Pankaj},{isChecked:false,data:singh}];
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("i", JSON.stringify(i));
    var PaneDiv = document.getElementById("PaneDiv");
    PaneDiv.appendChild(container);

    todoBox.value = "";
  }
}

init();

function storedLocalStorage() {

  let storedTodos = localStorage.getItem("todos");
  if (storedTodos != null) {
    todos = JSON.parse(storedTodos);
  }

  todos.forEach(function (value) {
    // Create elements
    var container = document.createElement("div");
    var taskHeading = document.createElement("h4");
    var checkBox = document.createElement("input");
   var editBtn = document.createElement("button");
    var crossBtn = document.createElement("button");

    // Set attributes
    checkBox.type = "checkbox";
    editBtn.innerHTML = "✎";
    crossBtn.innerHTML = "❌";
    container.className = "todoContainer";
    taskHeading.textContent = value.data;
 
    checkBox.setAttribute("id","checkBox");
    crossBtn.setAttribute("id", "cross");
    editBtn.setAttribute("id","edit");
    

    // Append elements
     container.appendChild(taskHeading);
     container.appendChild(checkBox);
     container.appendChild(editBtn);
     container.appendChild(crossBtn);

     editBtn.addEventListener("click", function(event){
         if(value.data != null && value.data != ""){
         var b= document.getElementById("todobox");
         b.value =value.data;
        
         }
         var updateBtn=document.createElement("button");
         var a=document.getElementById("PaneDiv");
         updateBtn.innerHTML="Update Task";
         updateBtn.id="updateBtn";
         a.appendChild(updateBtn);

         updateBtn.addEventListener("click",function(){
         taskHeading.textContent=b.value
         value.data=b.value;
         localStorage.setItem("todos",JSON.stringify(todos));
         b.value = "";
         updateBtn.remove();
         });

     });

    crossBtn.addEventListener("click", function (event) {
      const idToDelete = value.id;
      container.remove();
      todos = todos.filter((todo) => todo.id !== idToDelete);
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    checkBox.addEventListener("change", function (event) {
      value.isChecked = checkBox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (value.isChecked === true || value.isChecked === "true") {
        taskHeading.style.textDecoration = "line-through";
        checkBox.checked = true;
      } else {
        taskHeading.style.textDecoration = "none";
      }
    });

     const idToFind = value.id;
    let index = todos.findIndex((todo) => todo.id === idToFind);
    if (value.isChecked === true || value.isChecked === "true") {
     taskHeading.style.textDecoration = "line-through";
     checkBox.checked = true;
    } else {
     taskHeading.style.textDecoration = "none";
     }

    // Append to main div
    document.getElementById("PaneDiv").appendChild(container);
  });
}