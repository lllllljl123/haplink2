
const { RawSource } = require("webpack-sources");
const babel = require("babel-eslint");

let btoaF =  null
try {
  btoaF = require("btoa");
}catch (err){
  btoaF = btoa
}

function isType(data) {
  return Object.prototype.toString.call(data).split(" ")[1].split("]")[0];
}
async function getAllPath(list,path=[],keywords=[]){
  path = [...path]
  for (let listKey in list) {
    let x = list[listKey]
    if(isType(x)==='Object' && x.type){
      if(x.type==='Literal' && filters(x.raw,keywords)){
        path.push(x)
      }
      if(x.type==='BinaryExpression' && filters(x.left.raw,keywords)){
        path.push(x.left)
      }
      path =await getAllPath(x ?? [],path,keywords)
    }
    if(isType(x)==='Array'){
      for (const z of x) {
        path = await getAllPath(z ?? [],path,keywords)
      }
    }
  }

  return path
}

async function getPath(list,path=[],keywords=[]){
  //递归Object 和Array 把type为Literal 添加到list 里返回这个list
  if(isType(list)==='Array'){
    for (const z of list) {
      path = await getPath(z,path,keywords)
    }
  }
  if(isType(list)==='Object'){
    if(list.type==='Literal' && filters(list?.raw,keywords)){
      path.push(list)
    }
    for (let listKey in list) {
      let x = list[listKey]
      path = await getPath(x,path,keywords)
    }
  }
  return path
}
function filters(str='',list=[]){
  // 从str中查找list中的值
  return list.some(v=>str.includes(v))
}

function getPathB(str){
  return btoaF(str)
}
class JsFuckPlugin {
  constructor(options) {
    console.log('\n++++++++++++++++++++++++++++开始混淆++++++++++++++++++++++++++++')
    this.options = options;
  }
  apply(compiler){
    compiler.hooks.emit.tapAsync('JsFuckPlugin', async (compilation, callback) => {
      for (let assetsKey in compilation.assets) {
        if (/^js\/(?:js-index\.[^/]+\.js|chunk\.chunk-[^/]+\.js)$/.test(assetsKey)) {
          let content = compilation.assets[assetsKey].source();
          if (typeof content !== 'string') {
            let content = compilation.assets[assetsKey].source();
            content = JSON.stringify(content)
          }
          if (filters(content, this.options.keyword)) {
            let codePath = babel.parse(content, {});
            let path = await getPath(codePath, [], this.options.keyword)

            for (let i = 0; i < path.length; i++) {
              let a = getPathB(path[i].value)
              if(a.length<500){
                let str = `[]["filter"]["constructor"]('return atob(\`${a}\`)')()` //jsFuck.JSFuck.encode(path[i].value)
                content = content.replace(path[i].raw, str)
              }
            }
            compilation.assets[assetsKey] = new RawSource(content);
          }
        }
      }
      console.log('\n++++++++++++++++++++++++++++混淆结束++++++++++++++++++++++++++++')
      callback();
    });
  }
}


module.exports = JsFuckPlugin;

