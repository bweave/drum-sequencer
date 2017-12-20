import translateSubdivision from "./translateSubdivision"

describe("Translating from 1/16th notes", () => {
  const currentSubdivision = 16
  let notes

  beforeEach(() => {
    notes = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}, {timing: "1.1.3"}, {timing: "1.1.4"}]}
  })

  it("to 1/4 notes: drops ticks 2, 3, 4", () => {
    const expected = {hiHat: [{timing: "1.1.1"}]}
    const result = translateSubdivision(currentSubdivision, 4, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th notes: tick 3 to 2", () => {
    let expected = {
      hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}]
    }
    const result = translateSubdivision(currentSubdivision, 8, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th note triplets: nothing", () => {
    const result = translateSubdivision(currentSubdivision, 12, notes)
    expect(result).toEqual(notes)
  })

  it("to 1/16th note triplets: tick 2 to 3, 3 to 4, & 4 to 6", () => {
    const expected = {
      hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}, {timing: "1.1.4"}, {timing: "1.1.6"}]
    }
    const result = translateSubdivision(currentSubdivision, 24, notes)
    expect(result).toEqual(notes)
  })

  it("to 1/32nd notes: tick 2 to 3, 3 to 5, & 4 to 7", () => {
    const expected = {
      hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}, {timing: "1.1.5"}, {timing: "1.1.7"}]
    }
    const result = translateSubdivision(currentSubdivision, 32, notes)
    expect(result).toEqual(notes)
  })
})
