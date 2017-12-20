import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

const initialData = {
  isPlaying: false,
  bars: 1,
  beatsPerBar: 4,
  beat: 4,  // TODO: redo the value to 1/4 ???
  beats: [2,4,8,16],
  tempo: 96,
  subdivisions: {
    "Quarter Notes": 4,
    "8th Notes": 8,
    "16th Notes": 16,
    "32nd Notes": 32,
    "8th Note Triplets": 12,
    "16th Note Triplets": 24,
  },
  subdivision: 8,
  notes: {
    hiHat: [
      { timing: "1.1.1", vol: 2 },
      { timing: "1.1.2", vol: 2 },
      { timing: "1.2.1", vol: 2 },
      { timing: "1.2.2", vol: 2 },
      { timing: "1.3.1", vol: 2 },
      { timing: "1.3.2", vol: 2 },
      { timing: "1.4.1", vol: 2 },
      { timing: "1.4.2", vol: 2 },
    ],
    rackTom: [],
    snare: [
      { timing: "1.2.1", vol: 2 },
      { timing: "1.4.1", vol: 2 },
    ],
    floorTom: [],
    kick: [
      { timing: "1.1.1", vol: 2 },
      { timing: "1.3.1", vol: 2 },
      { timing: "1.3.2", vol: 2 },
    ],
  },
}

// How to share
// Represent the groove via URL Tab-style: http://example.com/?timeSignature=4/4&tempo=96&subdivision=16&hiHat=|X-x-X-x-X-x-X-x-|&snare=|----X--x-x--X---|&kick=|X-------X-X----x|

ReactDOM.render(<App {...initialData} />, document.getElementById('root'));
