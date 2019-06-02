import React from 'react';

import TodoListItem from '../todo-list-Item';
import './todo-list.css';

const TodoList = ({ todos, OnDeleted, onToggleDone, onToggleImportant }) => {

  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps } onDeleted ={() => OnDeleted(id)}
                                      onToggleDone={()=> onToggleDone(id)}
                                      onToggleImportant={()=> onToggleImportant(id)} />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
