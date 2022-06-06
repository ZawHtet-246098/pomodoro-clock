import React from "react";
import SetTimer from "./component/SetTimer";
import "./index.scss";
import { FaPauseCircle } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { BsFillPlayBtnFill } from "react-icons/bs";

const audio = document.getElementById("beep");

class App extends React.Component {
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 25 * 60,
    currentTimer: "Session",
    isPlaying: false,
  };

  constructor(props) {
    super(props);
    this.loop = undefined;
  }

  componentWillUnmount() {
    clearInterval(this.loop);
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;

    if (isPlaying) {
      clearInterval(this.loop);

      this.setState({
        isPlaying: false,
      });
    } else {
      this.setState({
        isPlaying: true,
      });

      this.loop = setInterval(() => {
        const { clockCount, currentTimer, breakCount, sessionCount } =
          this.state;

        if (clockCount === 0) {
          this.setState({
            currentTimer: currentTimer === "Session" ? "Break" : "Session",
            clockCount:
              currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
          });

          audio.play();
        } else {
          this.setState({
            clockCount: clockCount - 1,
          });
        }
      }, 1);
    }
  };

  handleReset = () => {
    this.setState({
      breakCount: 5,
      sessionCount: 25,
      clockCount: 25 * 60,
      currentTimer: "Session",
      isPlaying: false,
    });

    clearInterval(this.loop);

    audio.pause();
    audio.currentTime = 0;
  };

  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  handleLengthChange = (count, timerType) => {
    const { sessionCount, breakCount, isPlaying, currentTimer } = this.state;

    let newCount;

    if (timerType === "session") {
      newCount = sessionCount + count;
    } else {
      newCount = breakCount + count;
    }

    if (newCount > 0 && newCount < 61 && !isPlaying) {
      this.setState({
        [`${timerType}Count`]: newCount,
      });

      if (currentTimer.toLowerCase() === timerType) {
        this.setState({
          clockCount: newCount * 60,
        });
      }
    }
  };

  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;

    if (breakCount > 1) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount - 1,
          clockCount: (breakCount - 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount - 1,
        });
      }
    }
  };

  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentTimer } = this.state;

    if (breakCount < 60) {
      if (!isPlaying && currentTimer === "Break") {
        this.setState({
          breakCount: breakCount + 1,
          clockCount: (breakCount + 1) * 60,
        });
      } else {
        this.setState({
          breakCount: breakCount + 1,
        });
      }
    }
  };

  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;

    if (sessionCount > 1) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount - 1,
          clockCount: (sessionCount - 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount - 1,
        });
      }
    }
  };

  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentTimer } = this.state;

    if (sessionCount < 60) {
      if (!isPlaying && currentTimer === "Session") {
        this.setState({
          sessionCount: sessionCount + 1,
          clockCount: (sessionCount + 1) * 60,
        });
      } else {
        this.setState({
          sessionCount: sessionCount + 1,
        });
      }
    }
  };

  render() {
    const { breakCount, sessionCount, clockCount, currentTimer, isPlaying } =
      this.state;

    const breakProps = {
      title: "Break",
      count: breakCount,
      handleDecrease: () => this.handleLengthChange(-1, "break"),
      handleIncrease: () => this.handleLengthChange(1, "break"),
    };

    const sessionProps = {
      title: "Session",
      count: sessionCount,
      handleDecrease: () => this.handleLengthChange(-1, "session"),
      handleIncrease: () => this.handleLengthChange(1, "session"),
    };

    return (
      <div>
        <div className="flex">
          <SetTimer {...breakProps} />
          <SetTimer {...sessionProps} />
        </div>

        <div className="clock-container">
          <h1 id="timer-label">{currentTimer}</h1>
          <span id="time-left">{this.convertToTime(clockCount)}</span>

          <div className="flex">
            <button id="start_stop" onClick={this.handlePlayPause}>
              {isPlaying ? <FaPauseCircle /> : <BsFillPlayBtnFill />}
            </button>
            <button id="reset" onClick={this.handleReset}>
              <i className="fas fa-sync" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// const audio = document.getElementById("beep");

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.loop = undefined;
//   }

//   state = {
//     breakCount: 5,
//     sessionCount: 25,
//     clockCount: 25 * 60,
//     currentTimer: "Session",
//     isPlaying: false,
//     loop: undefined,
//   };

//   componentWillUnmount() {
//     clearInterval(this.loop);
//   }

//   handlePlayPause = () => {
//     const { isPlaying } = this.state;
//     if (isPlaying) {
//       clearInterval(this.loop);
//       this.setState({
//         isPlaying: false,
//       });
//     } else {
//       this.setState({
//         isPlaying: true,
//       });

//       this.loop = setInterval(() => {
//         const { clockCount, currentTimer, breakCount, sessionCount } =
//           this.state;

//         if (clockCount === 0) {
//           this.setState({
//             currentTimer: currentTimer === "Session" ? "Break" : "Session",
//             clockCount:
//               currentTimer === "Session" ? breakCount * 60 : sessionCount * 60,
//           });
//           audio.play();
//         } else {
//           this.setState({
//             clockCount: clockCount - 1,
//           });
//         }
//       }, 1000);
//     }
//   };

//   handleReset = () => {
//     this.setState({
//       breakCount: 5,
//       sessionCount: 25,
//       clockCount: 25 * 60,
//       currentTimer: "Session",
//       isPlaying: false,
//       loop: undefined,
//     });
//     clearInterval(this.loop);

//     audio.pause();
//     audio.currentTime = 0;
//   };

//   convertToTime = (count) => {
//     const minutes = Math.floor(count / 60);
//     let seconds = count % 60;

//     seconds = seconds < 10 ? "0" + seconds : seconds;
//     return `${minutes} : ${seconds}`;
//   };

//   handleBreakIncrease = () => {
//     const { breakCount } = this.state;
//     if (breakCount < 60) {
//       this.setState({
//         breakCount: breakCount + 1,
//       });
//     }
//   };
//   handleBreakDecrease = () => {
//     const { breakCount } = this.state;
//     if (breakCount > 0) {
//       this.setState({
//         breakCount: breakCount - 1,
//       });
//     }
//   };
//   handleSessionIncrease = () => {
//     const { sessionCount } = this.state;
//     if (sessionCount < 60) {
//       this.setState({
//         sessionCount: sessionCount + 1,
//       });
//     }
//   };
//   handleSessionDecrease = () => {
//     const { sessionCount } = this.state;
//     if (sessionCount > 0) {
//       this.setState({
//         sessionCount: sessionCount - 1,
//       });
//     }
//   };

//   render() {
//     const { breakCount, sessionCount, clockCount, currentTimer, isPlaying } =
//       this.state;

//     const breakProps = {
//       title: "Break Length",
//       count: breakCount,
//       handleIncrease: this.handleBreakIncrease,
//       handleDecrease: this.handleBreakDecrease,
//     };
//     const sessionProps = {
//       title: "Session Length",
//       count: sessionCount,
//       handleIncrease: this.handleSessionIncrease,
//       handleDecrease: this.handleSessionDecrease,
//     };
//     return (
//       <div>
//         <div className="flex">
//           <SetTimer {...breakProps} />
//           <SetTimer {...sessionProps} />
//         </div>

//         <div className="clock-container">
//           <h2 id="timer-label">{currentTimer}</h2>
//           <span id="time-left">{this.convertToTime(clockCount)}</span>

//           <div className="flex">
//             <button id="start_stop" onClick={this.handlePlayPause}>
//               {isPlaying ? <FaPauseCircle /> : <BsFillPlayBtnFill />}
//             </button>

//             <button id="reset" onClick={this.handleReset}>
//               <HiRefresh />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
