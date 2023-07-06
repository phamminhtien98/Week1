import React, { useState } from "react";
import style from "./ToDoApp.module.scss";
import TaskList from "../TaskList/TaskList";
import todo from "../@types/TypeUtil";
import InputTodo from "../InputTodo/InputTodo";
const ToDoApp = () => {
  const [todos, setTodos] = useState<todo[]>([
    { id: "1", name: "Todo 1", done: true },
    { id: "2", name: "Todo 2", done: false },
  ]);
  const handleAddTodo = (todo: todo) => {
    const newTodos = [...todos, todo];
    setTodos(newTodos);
  };
  const changeDoneTodo = (todo: todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((item) => item.id === todo.id);
    newTodos[index] = todo;
    setTodos([...newTodos]);
  };
  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos([...newTodos]);
  };

  const updateTodo = (todo: todo) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((item) => item.id === todo.id);
    newTodos[index] = todo;
    setTodos([...newTodos]);
  };
  return (
    <div className={style.todoApp}>
      <div className={style.todoAppBody}>
        <InputTodo handleAddTodo={handleAddTodo} />
        <TaskList
          todos={todos}
          done={false}
          changeDoneTodo={changeDoneTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <TaskList
          todos={todos}
          done={true}
          changeDoneTodo={changeDoneTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
};

export default ToDoApp;
