import translateSubdivision from "./translateSubdivision"

describe("Translating from 1/4 notes", () => {
  let currentSubdivision = 4
  let notes

  beforeEach(() => {
    notes = {hiHat: [{timing: "1.1.1"},{timing: "1.2.1"},{timing: "1.3.1"},{timing: "1.4.1"}]}
  })

  it("doesn't change notes when translating from 1/4 notes to others", () => {
    let result = translateSubdivision(currentSubdivision, 8, notes)
    expect(result).toEqual(notes)

    result = translateSubdivision(currentSubdivision, 12, notes)
    expect(result).toEqual(notes)

    result = translateSubdivision(currentSubdivision, 16, notes)
    expect(result).toEqual(notes)

    result = translateSubdivision(currentSubdivision, 24, notes)
    expect(result).toEqual(notes)

    result = translateSubdivision(currentSubdivision, 32, notes)
    expect(result).toEqual(notes)
  })

  it("handles resting on 1 when translating to 1/4 notes", () => {
    currentSubdivision = 8
    notes = {hiHat: [{timing: "1.1.2"}]}
    let expected = {hiHat: []}
    let result = translateSubdivision(currentSubdivision, 4, notes)
    expect(result).toEqual(expected)
  })
})
