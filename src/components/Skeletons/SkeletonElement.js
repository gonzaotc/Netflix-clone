import React from 'react';
import Shimmer from './Shimmer';
import './Skeletons.scss';

const SkeletonElement = ({ type, movieNumber }) => {
  const classes = `skeleton ${type}`;

  return (
    <div className={classes} style={{ "--i": movieNumber }}>
      {/* <Shimmer movieNumber={ movieNumber}/> */}
    </div>
  );
}

export default SkeletonElement