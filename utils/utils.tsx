function dataToArray(object: Object) {
  if (!object) {
    return [];
  }

  return Object.keys(object).map((key) => object[key]);
}

export { dataToArray };
