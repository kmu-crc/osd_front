function copyObject(obj) {
  console.log("----", obj);
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const copiedObject = obj.constructor();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copiedObject[key] = copyObject(obj[key]);
    }
  }

  return copiedObject;
}

export default copyObject;
