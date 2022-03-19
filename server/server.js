import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import todos from "./todos.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const id = nanoid(6);

  const newTodo = {
    id,
    title,
  };

  todos.push(newTodo);

  res.json({ message: "success" });
});

app.get("/todos", async (req, res) => {
  res.json(todos);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
});

app.listen(5000);
