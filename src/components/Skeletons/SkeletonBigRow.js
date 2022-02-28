import React from "react";
import Shimmer from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

const SkeletonBigRow = () => {
  return (
    <div className="skeleton-wrapper">
      {/* <SkeletonElement type="title" /> */}
      <div className="skeleton-bigRow">
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
        <SkeletonElement type="bigMovie" />
      </div>
      {/* <Shimmer /> */}
    </div>
  );
};

export default SkeletonBigRow;
