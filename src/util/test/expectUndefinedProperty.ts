
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