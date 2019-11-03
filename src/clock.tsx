import React, { useState, useEffect } from 'react';

const intervalTimeInMs = 1000
const initialState = {
  breakLength: 5,
  sessionLength: 25,
  isBreak: false,
  isRunning: false,
}

const Clock = ({audioRef}: any) => {
  const [state, setState] = useState({
    ...initialState,
    time: initialState.sessionLength * 60
  })
  let stopwatch: any

  const incrementSession = () => {
    if (!state.isRunning && state.sessionLength < 60) {
      setState({
        ...state,
        time: (state.sessionLength+1) * 60,
        sessionLength: state.sessionLength+1,
      })
    }
  }
  const decrementSession = () => {
    if (!state.isRunning && state.sessionLength > 1) {
      setState({
        ...state,
        time: (state.sessionLength-1) * 60,
        sessionLength: state.sessionLength-1,
      })
    }
  }
  const incrementBreak = () => {
    if (!state.isRunning && state.breakLength < 60) {
      setState({
        ...state,
        breakLength: state.breakLength+1,
      })
    }
  }
  const decrementBreak = () => {
    if (!state.isRunning && state.breakLength > 1) {
      setState({
        ...state,
        breakLength: state.breakLength-1,
      })
    }
  }

  const toggleRunning = () => {
    if (!stopwatch) {
      startTimer()
      return
    }
    stopTimer()
  }

  useEffect(() => {
    if (state.isRunning) {
      stopwatch = setInterval(() => {
        if (state.time === 0) {
          const isBreak = !state.isBreak
          const newMinutes = isBreak ? state.breakLength : state.sessionLength
          setState({
            ...state,
            isBreak,
            time: newMinutes * 60,
          })
          return () => clearInterval(stopwatch)
        }

        const newTime = state.time - 1
        newTime === 0 && audioRef.play()
        setState({ ...state, time: newTime })
      }, intervalTimeInMs)
    }
    return () => clearInterval(stopwatch)
  }, [state.time, state.isRunning])

  const startTimer = () => {
    setState({ ...state, isRunning: true})
  }

  const stopTimer = () => {
    clearInterval(stopwatch)
    stopwatch = undefined
    setState({ ...state, isRunning: false})
  }

  const reset = () => {
    audioRef.pause()
    audioRef.currentTime = 0
    clearInterval(stopwatch)
    stopwatch = undefined

    setState({
      ...initialState,
      time: initialState.sessionLength * 60
    })
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds/60)
    const seconds = timeInSeconds%60
    return `${minutes > 9 ? minutes : "0"+minutes}:${seconds > 9 ? seconds : "0"+seconds}`
  }

  return (
    <div className="Clock">
      <br />
      <br />
      <br />
      <h3>Session</h3>
      <div id="timer-label">{state.isBreak ? "Break" : "Session"}</div>
      <div id="time-left">{formatTime(state.time)}</div>
      <br />
      <div id="session-label">Session Length</div>
      <div id="session-length">{state.sessionLength}</div>
      <div id="session-increment" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={incrementSession}>session-increment</div>
      <div id="session-decrement" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={decrementSession}>session-decrement</div>
      <br />
      <br />
      <h3>Break</h3>
      <div id="break-label">Break Length</div>
      <div id="break-length">{state.breakLength}</div>
      <div id="break-increment" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={incrementBreak}>break-increment</div>
      <div id="break-decrement" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={decrementBreak}>break-decrement</div>
      <br />
      <br />
      <div id="start_stop" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={toggleRunning}>{state.isRunning ? "Stop" : "Start"}</div>
      <br />
      <div id="reset" style={{ color: "blue", cursor: "pointer", fontWeight: "bold" }} onClick={reset}>reset</div>
      <audio id="beep" ref={ref => audioRef = ref} src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alarm%20Clock.wav-19830-Free-Loops.com.mp3" />
    </div>
  );
}

export default Clock;
