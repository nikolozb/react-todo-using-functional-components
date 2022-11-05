import React, { useState } from "react";

import ControlAllTodos from "../../components/ControlAllTodos/ControlAllTodos";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";
import UpdateTodoForm from "../UpdateTodoForm/UpdateTodoForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import "./Todo.styles.scss";

const data = [
  { id: 1, title: "task1", isDone: false },
  { id: 2, title: "task2", isDone: false },
  { id: 3, title: "task3", isDone: false },
  { id: 4, title: "task4", isDone: false },
];

const Todo = () => {
  const [todos, setTodos] = useState(data);
  const [currentItem, setCurrentItem] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showError, setShowError] = useState(false);

  const addNewTodo = (inputTitle) => {
    const checked = todos.map(({ title }) => {
      if (title.toLocaleLowerCase() === inputTitle.toLocaleLowerCase().trim()) {
        setShowError(true);
        return true;
      }
      return false;
    });

    if (checked.includes(true)) {
      return;
    } else {
      setTodos((prevState) => {
        return [
          ...prevState,
          {
            id: Math.round(Math.random() * 1000),
            title: inputTitle.trim(),
          },
        ];
      });
      setShowError(false);
    }
  };

  const deleteHandler = (todoId) => {
    setTodos(todos.filter(({ id }) => id !== todoId));
    setShowUpdateForm(false);
  };

  const editHandler = (elid) => {
    setCurrentItem(todos.find(({ id }) => id === elid));
    setShowUpdateForm(true);
  };

  const doneHandler = (todoId, todoItemCompletionState) => {
    const item = todos.find(({ id }) => id === todoId);
    item.isDone = true;
    todoItemCompletionState(true);
  };

  const updateHandler = (updatedTitle) => {
    const checked = todos.map(({ title }) => {
      if (updatedTitle.toLocaleLowerCase() === title.toLocaleLowerCase()) {
        setShowError(true);
        return true;
      }
      return false;
    });

    if (checked.includes(true)) {
      setShowError(true);
      return;
    } else {
      currentItem.title = updatedTitle.trim();
      setShowUpdateForm(false);
      setShowError(false);
    }
  };

  const deleteAllTodosHandler = () => {
    setTodos([]);
  };

  const deleteCompletedTodosHandler = () => {
    setTodos(todos.filter(({ isDone }) => isDone === false));
  };

  const deleteIncompleteTodosHandler = () => {
    setTodos(todos.filter(({ isDone }) => isDone === true));
  };

  return (
    <div className="todo">
      {/* show error */}

      <div className="todo__container">
        {/* form */}
        <TodoForm addNewTodo={addNewTodo} />
        {showError ? <ErrorMessage /> : null}
        {/* controlling all todos */}
        <ControlAllTodos
          deleteAllTodosHandler={deleteAllTodosHandler}
          deleteCompletedTodosHandler={deleteCompletedTodosHandler}
          deleteIncompleteTodosHandler={deleteIncompleteTodosHandler}
        />
      </div>
      {/* update todo */}
      {showUpdateForm ? (
        <UpdateTodoForm
          updateHandler={updateHandler}
          currentItem={currentItem}
        />
      ) : null}

      {/* list */}
      <ul className="todo__list">
        {" "}
        {todos.length > 0 ? (
          todos.map(({ id, title, isDone }) => {
            return (
              <TodoItem
                checked={isDone}
                key={id}
                id={id}
                title={title}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                doneHandler={doneHandler}
                todos={todos}
                setTodos={setTodos}
              />
            );
          })
        ) : (
          <h1 className="todo__empty">No Todos</h1>
        )}
      </ul>
    </div>
  );
};

export default Todo;