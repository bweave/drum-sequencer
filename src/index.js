import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

// window.animationId = undefined
// const initialData = {
//   isPlaying: false,
//   subdivisions: {
//     "Quarter Notes": 4,
//     "8th Notes": 8,
//     "16th Notes": 16,
//     "32nd Notes": 32,
//     "8th Note Triplets": 12,
//     "16th Note Triplets": 24,
//   },
//   subdivision: 16,
//   tempo: 96,
//   notes: {
//     hiHat: {
//       0: { volume: 2 },
//       2: { volume: 1 },
//       4: { volume: 2 },
//       6: { volume: 1 },
//       8: { volume: 2 },
//       10: { volume: 1 },
//       12: { volume: 2 },
//       14: { volume: 1 },
//     },
//     rackTom: {},
//     snare: {
//       1: { volume: 1 },
//       4: { volume: 2 },
//       5: { volume: 1 },
//       12: { volume: 2 },
//     },
//     floorTom: {},
//     kick: {
//       0: { volume: 2 },
//       2: { volume: 2 },
//       7: { volume: 1 },
//       8: { volume: 2 },
//       10: { volume: 2},
//       15: { volume: 1 },
//     }
//   }
// }

const newData = {
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

ReactDOM.render(<App {...newData} />, document.getElementById('root'));
