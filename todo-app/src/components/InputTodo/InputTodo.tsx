import React, { useState } from "react";
import style from "./InputTodo.module.scss";
import todo from "../@types/TypeUtil";

interface Iprops {
  handleAddTodo: (todo: todo) => void;
}

const InputTodo = ({ handleAddTodo }: Iprops) => {
  const [input, setInput] = useState<string>("");
  let delaySubmit: boolean = true;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (delaySubmit) {
      delaySubmit = false;
      const date = new Date();
      const formattedDate =
        date.getFullYear() +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        date.getDate().toString().padStart(2, "0") +
        date.getHours().toString().padStart(2, "0") +
        date.getMinutes().toString().padStart(2, "0") +
        date.getSeconds().toString().padStart(2, "0");
      console.log(formattedDate);
      const todo: todo = {
        name: input,
        id: formattedDate,
        done: false,
      };
      handleAddTodo(todo);
      setTimeout(() => {
        delaySubmit = true;
      }, 1000);
    }
  };

  return (
    <div className={style.inputSearch}>
      <h1 className={style.title}>Danh sách todo</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.formInput}
          title="text"
          placeholder="Todo name"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button
          type="submit"
          className={`${style.btnSubmit} ${style.btnPrimary}`}
        >
          Thêm
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
