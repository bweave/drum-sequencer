import translateSubdivision from "./translateSubdivision"

describe("Translating from 1/8th notes", () => {
  const currentSubdivision = 8
  let notes

  beforeEach(() => {
    notes = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}]}
  })

  it("to 1/4 notes: drop tick 2", () => {
    const expected = {hiHat: [{timing: "1.1.1"}]}
    const result = translateSubdivision(currentSubdivision, 4, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th note triplets: tick 2 to 3", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}]}
    const result = translateSubdivision(currentSubdivision, 12, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/16th notes: tick 2 to 3", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}]}
    const result = translateSubdivision(currentSubdivision, 16, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/16th note triplets: tick 2 to 4", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.4"}]}
    const result = translateSubdivision(currentSubdivision, 24, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/32nd notes: tick 2 to 5", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.5"}]}
    const result = translateSubdivision(currentSubdivision, 32, notes)
    expect(result).toEqual(expected)
  })
})
