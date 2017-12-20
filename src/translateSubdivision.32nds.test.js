import translateSubdivision from "./translateSubdivision"

describe("Translating from 1/32nd notes", () => {
  let currentSubdivision = 32
  let notes

  beforeEach(() => {
    notes = {
      hiHat: [
        {timing: "1.1.1"},
        {timing: "1.1.2"},
        {timing: "1.1.3"},
        {timing: "1.1.4"},
        {timing: "1.1.5"},
        {timing: "1.1.6"},
        {timing: "1.1.7"},
        {timing: "1.1.8"},
      ]
    }
  })

  it("to 1/4 notes: drops ticks 2 - 8", () => {
    const expected = {hiHat: [{timing: "1.1.1"}]}
    const result = translateSubdivision(currentSubdivision, 4, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th notes: tick 5 to 2", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}]}
    const result = translateSubdivision(currentSubdivision, 8, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th note triplets: tick 4 to 2, 5 to 3", () => {
    let expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}, {timing: "1.1.3"}]}
    let result = translateSubdivision(currentSubdivision, 12, notes)
    expect(result).toEqual(expected)

    notes = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.5"}]}
    expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}]}
    result = translateSubdivision(currentSubdivision, 12, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/16th notes: tick 3 to 2, 5 to 3, 7 to 4", () => {
    const expected = {
      hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}, {timing: "1.1.3"}, {timing: "1.1.4"}]
    }
    const result = translateSubdivision(currentSubdivision, 16, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/16th note triplets: tick 4 to 3, 5 to 4, 6 to 5, 8 to 6", () => {
    const expected = {
      hiHat: [
        {timing: "1.1.1"},
        {timing: "1.1.2"},
        {timing: "1.1.3"},
        {timing: "1.1.4"},
        {timing: "1.1.5"},
        {timing: "1.1.6"},
      ]
    }
    const result = translateSubdivision(currentSubdivision, 24, notes)
    expect(result).toEqual(expected)
  })
})
