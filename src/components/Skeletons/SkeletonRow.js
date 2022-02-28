import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonRow = () => {
  return (
    <div className="skeleton-wrapper">
      {/* <SkeletonElement type="title" /> */}
      <div className="skeleton-row">
        <SkeletonElement type="movie" movieNumber={1} />
        <SkeletonElement type="movie" movieNumber={2} />
        <SkeletonElement type="movie" movieNumber={3} />
        <SkeletonElement type="movie" movieNumber={4} />
        <SkeletonElement type="movie" movieNumber={5} />
      </div>
      {/* <Shimmer /> */}
    </div>
  );
};

export default SkeletonRow;
