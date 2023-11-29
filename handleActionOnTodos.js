//takes in an array
export function deleteTodo(todoList, index, replaceItem) {
  todoList.splice(index, 1);

  // todoList.forEach((e, index) => {
  //   if (e.task === todo) {
  //     const removed = todoList.splice(index, 1);
  //     console.log("deleted: ", removed);
  //   }
  // });

  return todoList;
}
export function changeStatus(todo) {
  return { ...todo, complete: !todo.complete };
}

export default changeStatus;
