import React from "react";

function List({ todoData, setTodoData }) {
  const btnStyle = () => {
    return {
      color: "#fff",
      border: "none",
      padding: "5px 9px",
      borderRadius: "50%",
      cursor: "pointer",
      float: "right",
    };
  };

  function listStyle(completed) {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: completed ? "line-through" : "none",
    };
  }

  function handleCompleteOnChange(id) {
    let newTodoData = todoData.map((data) => {
      data.id === id && (data.completed = !data.completed);
      return data;
    });
    setTodoData(newTodoData);
  }

  function handleClick(id) {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  }

  return (
    <div>
      {todoData.map((data) => (
        <div style={listStyle(data.completed)} key={data.id}>
          <p>
            <input
              type="checkbox"
              defaultChecked={false}
              onChange={() => handleCompleteOnChange(data.id)}
            />
            {data.title}
            <button style={btnStyle()} onClick={() => handleClick(data.id)}>
              X
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default List;
