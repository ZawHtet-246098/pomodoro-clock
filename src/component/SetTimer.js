import React from "react";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";

const SetTimer = (props) => {
  const id = props.title.toLowerCase();

  return (
    <div className="timer-container">
      <h2 id={`${id}-label`}>{props.title} Length</h2>
      <div className="flex actions-wrapper">
        <button id={`${id}-decrement`} onClick={props.handleDecrease}>
          <TiArrowDownThick />
        </button>

        <span id={`${id}-length`}>{props.count}</span>

        <button id={`${id}-increment`} onClick={props.handleIncrease}>
          <TiArrowUpThick />
        </button>
      </div>
    </div>
  );
};

// const SetTimer = (props) => {
//   return (
//     <div className="timer-container">
//       <h2 id={`${props.title.toLowerCase()}-label`}>{props.title} Length</h2>
//       <div className="flex actions-wrapper">
//         <button
//           id={`${props.title.toLowerCase()}-increment`}
//           onClick={props.handleIncrease}
//         >
//           <TiArrowUpThick />
//         </button>
//         <span id={`${props.title.toLowerCase()}-length`}>{props.count}</span>
//         <button
//           id={`${props.title.toLowerCase()}-decrement`}
//           onClick={props.handleDecrease}
//         >
//           <TiArrowDownThick />
//         </button>
//       </div>
//     </div>
//   );
// };

export default SetTimer;
