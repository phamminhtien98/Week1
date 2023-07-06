import style from "./TaskList.module.scss";
import todo from "../@types/TypeUtil";
import { useState } from "react";

interface Iprops {
  todos: todo[];
  done: boolean;
  changeDoneTodo: (todo: todo) => void;
  deleteTodo: (todo: string) => void;
  updateTodo: (todo: todo) => void;
}

const TaskList = ({
  todos,
  done,
  changeDoneTodo,
  deleteTodo,
  updateTodo,
}: Iprops) => {
  const [todoSelect, setTodoSelect] = useState<todo>({
    id: "",
    name: "",
    done: false,
  });
  const handleChangeCheckbox = (item: todo) => {
    changeDoneTodo({
      ...item,
      done: !item.done,
    });
  };

  const onclickDeleteBtn = (id: string) => {
    deleteTodo(id);
  };

  const changeValueUpdateTodo = (newName: string) => {
    const todoUpdate: todo = {
      ...todoSelect,
      name: newName,
    };
    setTodoSelect(todoUpdate);
    console.log(todoUpdate);
  };

  const handleUpdateTodo = () => {
    updateTodo(todoSelect);
    setTodoSelect({ id: "", name: "", done: false });
    console.log("ss");
  };

  return (
    <div className={style.taskList}>
      <h2 className={style.title}>
        {done ? "Đã hoàn thành" : "Chưa hoàn thành"}
      </h2>
      {todos &&
        todos.map((item, index) => {
          return (
            <div key={index}>
              {item.done === done ? (
                todoSelect && todoSelect.id === item.id ? (
                  <div className={style.task}>
                    <div className={style.content}>
                      <input
                        type="text"
                        value={todoSelect.name}
                        onChange={(e) => changeValueUpdateTodo(e.target.value)}
                      />
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        className={`${style.btnAction} ${style.btnSuccess}`}
                        onClick={handleUpdateTodo}
                      >
                        Xác nhận
                      </button>
                      <button
                        className={`${style.btnAction} ${style.btnDanger}`}
                        onClick={(e) => {
                          setTodoSelect({ id: "", name: "", done: false });
                        }}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={style.task}>
                    <div className={style.content}>
                      <input
                        type="checkbox"
                        name={item.id}
                        id={item.id}
                        checked={item.done}
                        onChange={(e) => handleChangeCheckbox(item)}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>
                    <div className={style.btnContainer}>
                      <button
                        className={`${style.btnAction} ${style.btnWarning}`}
                        onClick={() => setTodoSelect(item)}
                      >
                        Sửa
                      </button>
                      <button
                        className={`${style.btnAction} ${style.btnDanger}`}
                        onClick={(e) => {
                          onclickDeleteBtn(item.id);
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
};

export default TaskList;
