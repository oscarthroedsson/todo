function createTodo(obj) {
  // console.log(obj);
  const liEl = document.createElement("li");
  liEl.setAttribute("item", `${obj.id}`);
  const span = document.createElement("span");
  span.innerHTML = obj.task;

  const checkBtn = document.createElement("button");
  checkBtn.textContent = obj.complete == true ? "Undo" : "Check";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  liEl.appendChild(span);
  liEl.appendChild(checkBtn);
  liEl.appendChild(deleteBtn);

  return liEl;
}

export default createTodo;
