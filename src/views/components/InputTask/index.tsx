import React, { useState, useCallback } from "react";

import styles from "./index.module.scss";

type InputTaskProps = {
  onAdd: (title: string) => void;
};

export const InputTask: React.FC<InputTaskProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);
  return (
    <div className={styles.inputTask}>
      <input
        type="text"
        className={styles.inputTaskValue}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        placeholder="Type your task here..."
      />
      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.inputTaskButton}
      />
    </div>
  );
};
