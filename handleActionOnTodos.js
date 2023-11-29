//takes in an array
export function deleteTodo(todoList, index, replaceItem) {
  todoList.splice(index, 1);

  return todoList;
}
export function changeStatus(todo) {
  console.log("todo: ", todo);
  return { ...todo, complete: !todo.complete };
}

export default changeStatus;
