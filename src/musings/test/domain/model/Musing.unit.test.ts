import { Musing } from "src/musings/domain/model"
import { doesObjectHasAllUndefinedProperties, doesObjectHasNoUndefinedProperties, doesObjectHasNoUndefinedPropertiesExcept } from "src/util/test/";

export const createMusingFixture = (): Musing => {
  const m = Musing.from({
    "quote": "quote",
    "from": "from",
    "language": "EN"
  })

  m.id = "1";
  return m;
}

test('createMusingFixture_ValidInput_ValidOutput', () => {
  const m = createMusingFixture();
  expect(doesObjectHasNoUndefinedProperties(m));
})

describe('Musing', () => {
  it('is created by static factory method.', () => {
    // expect
    const musing = Musing.from({
      "quote": "quote",
      "from": "from",
      "language": "EN"
    });

    // then
    expect(doesObjectHasNoUndefinedPropertiesExcept(musing, "id")).toBeTruthy();
    expect(musing.quote).toEqual("quote");
    expect(musing.from).toEqual("from");
    expect(musing.language).toEqual("EN");
  })

  it('is created by the constructor', () => {
    const musing = new Musing();
    expect(doesObjectHasAllUndefinedProperties(musing)).toBeTruthy();
  })
})