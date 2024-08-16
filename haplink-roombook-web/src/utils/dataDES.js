import CryptoJS from "crypto-js";

export function isType(data){
  return  Object.prototype.toString.call(data).split(' ')[1].split(']')[0]
}
export function isEmpty(value) {
  let str = value;
  if (["Array", "Object"].includes(isType(value))) {
    str = JSON.stringify(value);
  }
  return ["", null, undefined, "null", "undefined", "{}", "[]",' ','-',"''",'""'].includes(str);
}

/**
 *
 * @param data 必填
 * @param params 必填
 * @param timestamp 必填
 * @returns {*}
 * @constructor
 */
export function DataDES(data = {},params = {},timestamp) {

  let obj = {}
  if(!isEmpty(data)){
    let d =typeof data==='object'?data:JSON.parse(data)
    for (let dKey in d) {
      obj[dKey] = d[dKey]
    }
  }

  if(!isEmpty(params)){
    let d =typeof params==='object'?params:JSON.parse(params)
    for (let dKey in d) {
      obj[dKey] = d[dKey]
    }
  }


  obj = Object.keys(obj)
    .sort()
    .reduce((sortedObj, key) => {
      sortedObj[key] = obj[key];
      return sortedObj;
    }, {})

  return CryptoJS.DES.encrypt(JSON.stringify(obj), CryptoJS.enc.Utf8.parse(CryptoJS.MD5(timestamp)), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
}

/**
 * 深度拷贝
 * @param obj
 * @returns {*}
 */
export function deepCopy(obj) {
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if([null,undefined,NaN].includes(obj[key])){ // 如果值为null,undefined,NaN 原封不动   typeof null === 'object'
          result[key] = obj[key];
        }else {
          result[key] = deepCopy(obj[key]);   //递归复制
        }
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
