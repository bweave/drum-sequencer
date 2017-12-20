// TODO: when we filter we're enforcing that a tick
// cannot be greater than nextSubdivision
// there's probs a better way to enforce that rule
export default function translateSubdivision(currentSubdivision, nextSubdivision, notes) {
  if (nextSubdivision === 4) return translate(notes, to4)
  if (nextSubdivision === 4) return translate(notes, to4)
  if (currentSubdivision === 4 ||
    (currentSubdivision === 12 && nextSubdivision === 16) ||
    (currentSubdivision === 16 && nextSubdivision === 12)
  ) {
    return notes
  }
  if (currentSubdivision === 8 && (nextSubdivision === 12 || nextSubdivision === 16)) {
    return translate(notes, _8to12or16)
  }
  if (currentSubdivision === 8 && nextSubdivision === 24) return translate(notes, _8to24)
  if (currentSubdivision === 8 && nextSubdivision === 32) return translate(notes, _8to32)
  if (currentSubdivision === 12 && nextSubdivision === 8) return translate(notes, _12to8)
  if (currentSubdivision === 12 && nextSubdivision === 24 ) return translate(notes, _12to24)
  if (currentSubdivision === 12 && nextSubdivision === 32) return translate(notes, _12to32)
  if (currentSubdivision === 16 && nextSubdivision === 8) return translate(notes, _16to8)
  if (currentSubdivision === 16 && nextSubdivision === 24) return translate(notes, _16to24)
  if (currentSubdivision === 16 && nextSubdivision === 32) return translate(notes, _16to32)
  if (currentSubdivision === 24 && nextSubdivision === 8) return translate(notes, _24to8)
  if (currentSubdivision === 24 && nextSubdivision === 12) return translate(notes, _24to12)
  if (currentSubdivision === 24 && nextSubdivision === 16) return translate(notes, _24to16)
  if (currentSubdivision === 24 && nextSubdivision === 32) return translate(notes, _24to32)
  if (currentSubdivision === 32 && nextSubdivision === 8) return translate(notes, _32to8)
  if (currentSubdivision === 32 && nextSubdivision === 12) return translate(notes, _32to12)
  if (currentSubdivision === 32 && nextSubdivision === 16) return translate(notes, _32to16)
  if (currentSubdivision === 32 && nextSubdivision === 24) return translate(notes, _32to24)
}

function translate(notes, cb) {
  for (let instrument in notes) {
    notes[instrument] = dedupeTiming(
      cb(notes[instrument])
    ).sort((a,b) => a.timing > b.timing)
  }
  return notes
}

function dedupeTiming(notes) {
  return notes.filter((note, i, origNotes) => {
    return origNotes.map(note => note.timing).indexOf(note.timing) === i;
  })
}

function to4(notes) {
  return notes.filter(note => (/1$/).test(note.timing))
}

function _8to12or16(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/2$/, "3")
    return note
  })
}

function _12to8(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/3$/, "2")
    return note
  })
}

function _8to24(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/2$/, "4")
    return note
  })
}

function _8to32(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/2$/, "5")
    return note
  })
}

function _12to24(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/3$/, "5").replace(/2$/, "3")
    return note
  })
}

function _12to32(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/3$/, "5").replace(/2$/, "3")
    return note
  })
}

function _16to8(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/3$/, "2")
    return note
  }).filter(note => (/(1|2)$/).test(note.timing))
}

function _16to24(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/4$/, "6").replace(/3$/, "4").replace(/2$/, "3")
    return note
  })
}

function _16to32(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/4$/, "7").replace(/3$/, "5").replace(/2$/, "3")
    return note
  })
}

function _24to8(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/4$/, "2")
    return note
  }).filter(note => (/(1|2)$/).test(note.timing))
}

function _24to12(notes) {
  return notes.filter(note => {
    return (/(1|3|5)$/).test(note.timing)
  }).map(note => {
    note.timing = note.timing.replace(/3$/, "2").replace(/5$/, "3")
    return note
  })
}

function _24to16(notes) {
  return notes.filter(note => !note.timing.endsWith("5")).map(note => {
    note.timing = note.timing.replace(/3$/, "2").replace(/4$/, "3").replace(/6$/, "4")
    return note
  })
}

function _24to32(notes) {
  return notes.map(note => {
    note.timing = note.timing
                      .replace(/6$/, "8")
                      .replace(/5$/, "6")
                      .replace(/4$/, "5")
                      .replace(/3$/, "4")
    return note
  })
}

function _32to8(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/5$/, "2")
    return note
  }).filter(note => (/(1|2)$/).test(note.timing))
}

function _32to12(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/4$/, "2").replace(/5$/, "3")
    return note
  }).filter(note => (/(1|2|3)$/).test(note.timing))
}

function _32to16(notes) {
  return notes.map(note => {
    note.timing = note.timing.replace(/3$/, "2").replace(/5$/, "3").replace(/7$/, "4")
    return note
  }).filter(note => (/(1|2|3|4)$/).test(note.timing))
}

function _32to24(notes) {
  return notes.map(note => {
    note.timing = note.timing
                      .replace(/4$/, "3")
                      .replace(/5$/, "4")
                      .replace(/6$/, "5")
                      .replace(/8$/, "6")
    return note
  }).filter(note => (/(1|2|3|4|5|6)$/).test(note.timing))
}
