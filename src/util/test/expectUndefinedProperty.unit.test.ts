
export const doesObjectHasNoUndefinedProperties = <T extends object>(o: T): boolean => {
  const properties = Object.getOwnPropertyNames(o);
  // @ts-ignore
  return properties.filter(p => typeof o[p] === "undefined").length === 0;
}

export const doesObjectHasNoUndefinedPropertiesExcept = <T extends object>(o: T, ...nonNullProperties: string[]): boolean => {
  const objectForTest = deletePropertiesFromObject(o, ...nonNullProperties);
  return doesObjectHasNoUndefinedProperties(objectForTest);
}

export const doesObjectHasAllUndefinedProperties = <T extends object>(o: T): boolean => {
  const properties = Object.getOwnPropertyNames(o);
  // @ts-ignore
  return properties.filter(p => typeof o[p] !== "undefined").length === 0;
}

export const doesObjectHasAllUndefinedPropertiesExcept = <T extends object>(o: T, ...nonNullProperties: string[]): boolean => {
  const objectForTest = deletePropertiesFromObject(o, ...nonNullProperties);

  // @ts-ignore
  nonNullProperties.forEach(p => delete objectForTest[p])
  return doesObjectHasAllUndefinedProperties(objectForTest);
}

const deletePropertiesFromObject = <T extends object>(o: T, ...properties: string[]) => {
  const dummyObject = {
    ...o
  }

  // @ts-ignore
  properties.forEach(p => delete dummyObject[p]);

  return dummyObject
}

describe('doesObjectHasNoUndefinedProperties', () => {
  it('should return true when an object has no undefined properties. ', () => {
    const obj = {
      temp: "temp"
    }

    expect(doesObjectHasNoUndefinedProperties(obj)).toBeTruthy();
  })

  it('should return false when an object has any undefined properties. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasNoUndefinedProperties(obj)).toBeFalsy();
  })
})

describe('doesObjectHasNoUndefinedPropertiesExcept', () => {
  it('should return true when an object has no undefined properties expect given strings. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasNoUndefinedPropertiesExcept(obj, "temp2")).toBeTruthy();
  })

  it('should return false when an object has undefined properties expect given strings. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasNoUndefinedPropertiesExcept(obj)).toBeFalsy();
  })
})


describe('doesObjectHasAllUndefinedProperties', () => {
  it('should return true when an object has all undefined properties. ', () => {
    const obj = {
      temp: undefined
    }

    expect(doesObjectHasAllUndefinedProperties(obj)).toBeTruthy();
  })

  it('should return false when an object has any defined properties. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasAllUndefinedProperties(obj)).toBeFalsy();
  })
})

describe('doesObjectHasAllUndefinedPropertiesExcept', () => {
  it('should return true when an object has all undefined properties expect given strings. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasAllUndefinedPropertiesExcept(obj, "temp")).toBeTruthy();
  })

  it('should return false when an object has defined properties expect given strings. ', () => {
    const obj = {
      temp: "temp",
      temp2: undefined
    }

    expect(doesObjectHasAllUndefinedPropertiesExcept(obj)).toBeFalsy();
  })
})