const fetch = require('node-fetch');

const capitalise = str => (str.charAt(0).toUpperCase() + str.slice(1));

const flattenObj = (obj, prefix = '', res = {}) => (
  Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (val instanceof Array) {
      res[k] = val.join(',');
    } else if(typeof val === 'object'){ 
      flattenObj(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res));

const capitalisePropNames = async (obj) => {
  const result = {};
  for (let [key, val] of Object.entries(obj)) {
    if(key === 't') {
      result[key] = val;
    } else if (key === 'lat-lon') {
      const response = await fetch(`https://api.mapcode.com/mapcode/codes/${val.join(',')}`);
      const mapCodes = await response.json();
      result['Lat-lon'] =  mapCodes.international.mapcode;
    } else {
      result[capitalise(key)] = val;
    }
  };
  
  return result;
};

module.exports = {
  capitalisePropNames,
  flattenObj
};
