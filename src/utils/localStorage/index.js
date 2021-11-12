import { string } from "postcss-selector-parser";

const localHandle = {};
/**
 * 设置
 * */
localHandle.set = function(key,value=''){
    if(typeof(value) === string){
        localStorage.setItem(key,value);
    }else{
        localStorage.setItem(key,JSON.stringify(value));
    }
};
/**
 * 获取，取出后，用的时候自行按实际解析
 * */
localHandle.get = function(key){
    if(localStorage.getItem(key)){
        return localStorage.getItem(key)
    }
    return '';
};
/**
 * 删除
 * */
localHandle.remove = function(key){
    localStorage.removeItem(key);
};
/**
 * 清除
 * */
localHandle.clear = function(){
    window.localStorage.clear();
};
localHandle.getDictMes = function(key){
    const data = JSON.parse(localStorage.getItem('dict')) ;
    return data && data[key]
};

export default localHandle
