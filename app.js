/* This is a basic todo-App that add todos in a list and moves it to another list when the task is done.
and delete it when you press delete. 
*/

import createTodo from "./createTodo.js"; //function that creates todo
import { deleteTodo, changeStatus } from "./handleActionOnTodos.js"; // file that handles all function that affect the todos status

// Get the base elements
const form = document.querySelector("#form"); //get the form-element
const input = document.querySelector("input"); // get the input-field
const listElement = document.querySelector("#todoList"); // Get the list where the un done todos are
const checkedIDList = document.querySelector("#check-todo"); // get tthe list where the done todos are

const todoList = []; // the aray for all todos so we can handle everything with js.

//Listen on the form for a submit (adding a new todo)
form.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent defualt behavior of the form

  /*
  form.inputEl.value
  form = the form element we got above
  inputEl = the input element we got above
  value = get the value of the input element
  */
  const task = form.inputEl.value; // get the value from the input
  const newTodo = createObj(task); // send the task value and creates a new object
  addnewTodo(newTodo); // add thetodo-obj to our list

  input.value = ""; // empty the input field on submit
});

// creates a new todo obj
function createObj(task) {
  //we create and return the object directly
  return {
    id:
      todoList.length !== 0
        ? todoList.length + 1
        : 1 /* if array length is 0 give index 1, if not 
    take the length + 1 and set as a new ID */,
    task: task /* The todo we took from the input-field in our eventlistener on the form */,
    complete: task.complete
      ? true
      : false /* if task.complete is true, set it to false, and opposit. 
    if it is a new todo obj the conditional will be false. If it is a existing todo obj, this set-up let us
    re-use the function to change the status if needed */,
  };
}

// add new task to the list and call a function to render the array
function addnewTodo(task) {
  todoList.push(task); // array method that add todo obj to the array
  renderList(todoList); // function that renders the array
}

// support function that help us find the right node when something is pressed.
function findNode(itemID) {
  return todoList.find((e) => e.id === Number(itemID)); //returns the node we find (the one that is pressed)
}

// renders both the list, completed and not completed todos.
function renderList(todoList) {
  listElement.innerHTML = ""; // reset ul element that holds not completed todos
  checkedIDList.innerHTML = ""; // reset ul element that holds completed todos

  todoList.forEach((e) => {
    /* render the array of todos object and sort it depending of the value of key: compelte (true or false) */
    if (e.complete === false) {
      listElement.appendChild(createTodo(e)); // appened to not completed todos list
    } else {
      checkedIDList.appendChild(createTodo(e)); // appened to completed todos list
    }
  });
}

// Listen for click event on the list with not completed todos
listElement.addEventListener("click", (e) => {
  e.preventDefault(); // prevent defualt behavior

  /* I use switch and validate depending on the text content in the button. This is not good practice
!if we change the text in the btn this will not work.
I just wanted to use switch for this and i want to have some fun... Try to make it more dynamic if you want to. 
*/

  const btnPressed = e.target.textContent; // get textContent of the button that was pressed
  console.log("btnPressed:", btnPressed);
  const parent = e.target.parentNode; //get parent element of the button that was pressed (li n all children)
  console.log("btnPressed: ", parent);
  const item = parent.getAttribute("item"); //get item value of the item attribute that identify the li-element

  switch (btnPressed) {
    case "Check":
      // changing todos object complete from false to true.
      const node = changeStatus(findNode(item));
      // deleting the array-item that was pressed from the current list
      todoList.splice(item - 1, 1, node);
      // re-render the list so all array-item lands in the right list
      renderList(todoList);
      break;

    case "Delete":
      //delete an array-item if Delete was pressed, threw a function i built.
      const updatedArr = deleteTodo(todoList, item - 1);
      // re-render the new updated list
      renderList(updatedArr);
      break;

    default:
      //   console.log("Nothing was pressed");
      return;
  }
});

// Listen on the list with completed todos
checkedIDList.addEventListener("click", (e) => {
  const btnPressed = e.target.textContent; // which btn is pressed
  const parent = e.target.parentNode;
  const item = parent.getAttribute("item");

  switch (btnPressed) {
    case "Undo":
      // Using the findNode to find item in the array, and the result is sent to changeStatus
      const theTodo = changeStatus(findNode(item));
      // deleting the current todo
      todoList.splice(item - 1, 1, theTodo);
      // re render the list
      renderList(todoList);

      break;
    case "Delete":
      const updatedArr = deleteTodo(todoList, todo);
      renderList(updatedArr);
      break;
    default:
      //   console.log("nothing was pressed");
      return;
  }
});
