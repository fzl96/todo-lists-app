const todoTemplate = document.querySelector(".todo-template");
const todoList = document.querySelector(".todos");
const search = document.querySelector(".search input");
const addForm = document.querySelector(".add");

let todoLists = [];

search.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  todoLists.forEach((todo) => {
    const isVisible = todo.title.toLowerCase().includes(value);
    todo.element.classList.toggle("filtered", !isVisible);
  });
});

const getTodos = async () => {
  const response = await fetch("http://localhost:5000/todos");
  const todos = await response.json();
  todoLists = todos.map((todo) => {
    const list = todoTemplate.content.cloneNode(true).children[0];
    list.setAttribute("id", todo.id);
    const title = list.querySelector(".todo-title");
    title.textContent = todo.title;
    todoList.append(list);
    return { title: todo.title, element: list };
  });
};

addForm.addEventListener("submit", async (e) => {
  const title = addForm.add.value.trim();
  if (!title.length) return;
  const data = { title };
  try {
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error(err.message);
  }
  addForm.reset();
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const todoId = e.target.parentElement.id;
    const response = fetch(`http://localhost:5000/todos/${todoId}`, {
      method: "DELETE",
    });
    e.target.parentElement.remove();
  }
});

getTodos();
