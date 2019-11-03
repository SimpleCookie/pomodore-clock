import React from 'react';
import Clock from './clock';
import "./App.css"

const App: React.FC = () => {
  let audioRef: any

  return (
    <div className="App">
      <Clock audioRef={audioRef} />
      <audio id="beep" ref={ref => audioRef = ref} src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Alarm%20Clock.wav-19830-Free-Loops.com.mp3" />
    </div>
  );
}

export default App;
