import React from "react";

const List = ({ data, provided, snapshot, todoData, setTodoData }) => {
  console.log(`List component`);
  const { id, title, completed } = data;
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
    <div
      key={id}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`${
        snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"
      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
    >
      <div className="flex items-center">
        <input
          className="mr-1"
          type="checkbox"
          defaultChecked={false}
          onChange={() => handleCompleteOnChange(id)}
        />
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <div>
        <button className="px-4 py-2" onClick={() => handleClick(id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default List;
