import React from "react";

const ListGroup = ({ listItems, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {listItems.map(item => (
        <li
          style={{ cursor: "pointer" }}
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={item === selectedItem ? "selected-item" : ""}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
