import React from "react";

const Form = ({ value, setValue, handleSubmit }) => {
  function handleOnChange(e) {
    setValue(e.target.value);
  }

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <input
        type="text"
        name="value"
        style={{ flex: "10", padding: "5px" }}
        placeholder="해야 할 일을 입력하세요."
        value={value}
        onChange={(e) => handleOnChange(e)}
      />
      <input
        type="submit"
        value={"입력"}
        className="btn"
        style={{ flex: "1" }}
      />
    </form>
  );
};

export default Form;
