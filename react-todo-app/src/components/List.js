import React, { useState } from "react";

const List = React.memo(
  ({ data, provided, snapshot, todoData, setTodoData, handleClick }) => {
    console.log(`List component`);

    const { id, title, completed } = data;

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    function handleCompleteOnChange(id) {
      let newTodoData = todoData.map((data) => {
        data.id === id && (data.completed = !data.completed);
        return data;
      });
      setTodoData(newTodoData);
      // localStorage.setItem("todoData", JSON.stringify(newTodoData));
    }

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((data) => {
        data.id === id && (data.title = editedTitle);
        return data;
      });
      setTodoData(newTodoData);
      setIsEditing(false);
      // localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    if (isEditing) {
      return (
        <div
          className={`bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              value={editedTitle}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
          <div>
            <button className="px-4 py-2" type="submit" onClick={handleSubmit}>
              save
            </button>
            <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
              X
            </button>
          </div>
        </div>
      );
    } else {
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
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div>
            <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
              edit
            </button>
            <button className="px-4 py-2" onClick={() => handleClick(id)}>
              X
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
