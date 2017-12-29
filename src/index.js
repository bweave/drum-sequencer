import Clipboard from "clipboard"
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
    // crash: [],
    // ride: [],
    hiHat: [],
    rackTom: [],
    snare: [],
    floorTom: [],
    kick: [],
  },
  grooves: { saved: [], presets: [] },
}

ReactDOM.render(<App {...initialData} />, document.getElementById('root'));
new Clipboard(".copy-share-link")
