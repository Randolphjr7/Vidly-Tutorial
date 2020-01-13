import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;

  return (
    <ul className="list-group">
      {items.map(eachGenre => (
        <li
          onClick={() => onItemSelect(eachGenre)}
          key={eachGenre[valueProperty]}
          className={
            eachGenre === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {eachGenre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
