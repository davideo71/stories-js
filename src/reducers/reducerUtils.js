const mapObject = (obj, f) => {
  const newObj = Object.assign({}, obj);
  for (const k in newObj) {
    if (newObj.hasOwnProperty(k)) { newObj[k] = f(newObj[k]); }
  }
  return newObj;
};

const updateObject = (obj, ...merge) => {
  return Object.assign({}, obj, ...merge);
};

module.exports = {
  mapObject, updateObject
};
