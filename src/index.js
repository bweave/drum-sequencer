import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.animationId = undefined
const initialData = {
  isPlaying: false,
  subdivisions: {
    "Quarter Notes": 4,
    "8th Notes": 8,
    "16th Notes": 16,
    "32nd Notes": 32,
    "8th Note Triplets": 12,
    "16th Note Triplets": 24,
  },
  subdivision: 16,
  tempo: 96,
  notes: {
    hiHat: {
      0: { volume: 2 },
      2: { volume: 1 },
      4: { volume: 2 },
      6: { volume: 1 },
      8: { volume: 2 },
      10: { volume: 1 },
      12: { volume: 2 },
      14: { volume: 1 },
    },
    rackTom: {},
    snare: {
      1: { volume: 1 },
      4: { volume: 2 },
      5: { volume: 1 },
      12: { volume: 2 },
    },
    floorTom: {},
    kick: {
      0: { volume: 2 },
      2: { volume: 2 },
      7: { volume: 1 },
      8: { volume: 2 },
      10: { volume: 2},
      15: { volume: 1 },
    }
  }
}

ReactDOM.render(<App {...initialData} />, document.getElementById('root'));
registerServiceWorker();