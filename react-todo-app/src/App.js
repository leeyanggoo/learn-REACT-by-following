import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

export default function App() {
  console.log(`APP component`);

  const initialTodoData = localStorage.getItem("todoData")
    ? JSON.parse(localStorage.getItem("todoData"))
    : [];

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
    // localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
  }

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
      // localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const handleRemoveClick = () => {
    setTodoData([]);
    // localStorage.setItem("todoData", JSON.stringify([]));
  };

  // useEffect에 의존성배열로 todoData를 할당해서
  // 데이터가 변경될 때마다 로컬스토리지에 저장 !!
  // setTodoData가 호출되는 곳마다 하지 않고 싶어서 해봤다.
  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);

  return (
    <div
      className="flex items-center justify-center w-screen h-screen
      bg-blue-50
    "
    >
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveClick}>Delete All</button>
        </div>

        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />

        <Form value={value} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
