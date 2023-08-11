export const dataParserToObj = (data)=>{
    const obj = {}
    for(const item of data){
        let {_id: _, ...copyObj} = item;
        obj[item["_id"]] = copyObj;
    }
    return obj;
}

export const hashPassword = (data,key="mac")=>{

    data = data.toLowerCase()

    var base = "a".charCodeAt(0)
    var range = 26;

    var _key = ""

    for(var x = 0; x<data.length;x++){
        _key += key[x % key.length];
    }

    var _password = "";
    var c;
    for(var x = 0; x<data.length;x++){
        c = (((data[x].charCodeAt(0) - base) + (_key[x].charCodeAt(0) - base)) % range) + base;
        _password += String.fromCharCode(c);
    }

    return _password.toUpperCase();
}

export const checkDataType = (data)=>{
    if(data === null)
        return null;
    if(typeof(data)==="string" )
        return "'"+data+"'";
    return data;
}

export const mac_db = {
    host:"localhost",
    user:"root",
    password:"13Yazdan98#",
    database:"mac_cafe"
}