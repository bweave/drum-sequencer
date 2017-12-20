import translateSubdivision from "./translateSubdivision"

describe("Translating from 1/8th note triplets", () => {
  const currentSubdivision = 12
  let notes

  beforeEach(() => {
    notes = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}, {timing: "1.1.3"}]}
  })

  it("to 1/4 notes: drop ticks 2 & 3", () => {
    const expected = {hiHat: [{timing: "1.1.1"}]}
    const result = translateSubdivision(currentSubdivision, 4, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/8th notes: tick 3 to 2", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.2"}]}
    const result = translateSubdivision(currentSubdivision, 8, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/16th notes: nothing", () => {
    const result = translateSubdivision(currentSubdivision, 16, notes)
    expect(result).toEqual(notes)
  })

  it("to 1/16th triplets: tick 2 to 3, & 3 to 5", () => {
    const expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}, {timing: "1.1.5"}]}
    const result = translateSubdivision(currentSubdivision, 24, notes)
    expect(result).toEqual(expected)
  })

  it("to 1/32nd notes: tick 2 to 3, & 3 to 5", () => {
    let expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}, {timing: "1.1.5"}]}
    let result = translateSubdivision(currentSubdivision, 32, notes)
    expect(result).toEqual(expected)

    notes = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.3"}]}
    expected = {hiHat: [{timing: "1.1.1"}, {timing: "1.1.5"}]}
    result = translateSubdivision(currentSubdivision, 32, notes)
    expect(result).toEqual(expected)
  })
})
