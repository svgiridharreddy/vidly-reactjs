import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({items,textProperty, valueProperty,selectedItem,onItemSelect}) => {
  return(
    <ul className="clickable list-group">
      {items.map(item => <li key={item[valueProperty]} className={item === selectedItem ? "list-group-item active" : "list-group-item"} onClick={()=> onItemSelect(item)}>{item[textProperty]}</li>)}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
}
 
export default ListGroup;