import React from 'react';


const Like = ({liked, onMovieLiked}) => {
  let classes = "fa fa-lg fa-heart"
  if (!liked) classes+="-o"
  return (  
    <React.Fragment>
        <i className={classes} aria-hidden="true" style={{cursor: "pointer"}} onClick={onMovieLiked} ></i>
      </React.Fragment>
  );
}
 
export default Like;



 
