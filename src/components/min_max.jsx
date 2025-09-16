import React, { Fragment } from "react";

function Min_Max(props) {
  return (
    <Fragment>
      <div className="componenteMinMax">
        <div className="componenteMin">
          <p>Min</p>
          {props.min}
          {<span>°</span>}
          -
        </div>
        <div className="componenteMax">
          <p>Max</p> 
          {props.max}
          {<span>°</span>}
        </div>
      </div>
    </Fragment>
  );
}

export default Min_Max;
