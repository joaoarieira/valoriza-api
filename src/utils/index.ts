export function deleteUndefinedFields<T extends object>(obj: T): T {
  const objClone = JSON.parse(JSON.stringify(obj)) as T;
  Object.keys(objClone).forEach((key) => {
    if (objClone[key] === undefined) {
      delete objClone[key];
    }
  });
  return objClone;
}
