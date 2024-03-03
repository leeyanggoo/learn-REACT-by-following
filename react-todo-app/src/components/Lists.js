import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
  console.log(`Lists component`);

  const handleEnd = (result) => {
    // console.log(result);
    if (!result.destination) return;

    // 리액트 불변성을 지키기 위해 새로운 데이터 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 지우기
    // 2. return으로 지워진 아이템을 잡기
    // splice는 삭제한 요소를 담은 배열을 반환한다.
    // result.source = 드래그 시작 요소의 index를 포함하는 object={droppableId, index}
    const [reorderItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderItem을 추가
    // result.destination = 드래그가 끝날 때 위치하려고 했던 index를 포함하는 object
    // 즉 끝날 때 위치하려고 한 index에 자른 요소를 넣는 것
    newTodoData.splice(result.destination.index, 0, reorderItem);

    // state 변경
    setTodoData(newTodoData);
    // localStorage.setItem("todoData", JSON.stringify(newTodoData));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      data={data}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handleClick={handleClick}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default Lists;
