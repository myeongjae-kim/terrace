type Keys = string | number;
type JsonObject = {[key in Keys]: any};

export const doesObjectHasNoUndefinedProperties = <T extends JsonObject>(o: T): boolean => {
  const properties = Object.getOwnPropertyNames(o);
  return properties.filter(p => typeof o[p] === "undefined").length === 0;
};

export const doesObjectHasNoUndefinedPropertiesExcept = <T extends JsonObject>(o: T, ...nonNullProperties: string[]): boolean => {
  const objectForTest = deletePropertiesFromObject(o, ...nonNullProperties);
  return doesObjectHasNoUndefinedProperties(objectForTest);
};

export const doesObjectHasAllUndefinedProperties = <T extends JsonObject>(o: T): boolean => {
  const properties = Object.getOwnPropertyNames(o);
  return properties.filter(p => typeof o[p] !== "undefined").length === 0;
};

export const doesObjectHasAllUndefinedPropertiesExcept = <T extends JsonObject>(o: T, ...nonNullProperties: string[]): boolean => {
  const objectForTest = deletePropertiesFromObject(o, ...nonNullProperties);

  nonNullProperties.forEach(p => delete objectForTest[p]);
  return doesObjectHasAllUndefinedProperties(objectForTest);
};

const deletePropertiesFromObject = <T extends JsonObject>(o: T, ...properties: string[]) => {
  const dummyObject = {
    ...o
  };

  properties.forEach(p => delete dummyObject[p]);

  return dummyObject;
};