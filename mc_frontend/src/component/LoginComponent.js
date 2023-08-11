import { useEffect, useState } from "react";

import {inputHandler} from "../Tools/Functions"

import ButtonComponent from "../component/ButtonComponent";

const LoginComponent = (props) => {
    const [data,setData] = useState({
        _phone:null,
        _password:null,
    });

    const [dataState,setDataState] = useState({
        _phone:false,
        _password:false,
    });

    const dataHandler = (id,val)=>{
        var tmp = {};
        tmp[id] = null;
        const {id:_,...rest_1} = data;

        if(val.trim() !== "")
            tmp[id] = val;

        const obj_1 = Object.assign(rest_1,tmp);
        setData(obj_1)
    }

    const stateHandler = ()=>{
        const state_phone = inputHandler(data["_phone"],"_phone");
        const state_password = inputHandler(data["_password"],"_password");

        setDataState({
            _phone:state_phone,
            _password:state_password,
        })
    }

    useEffect(()=>{
        stateHandler();
    },[data])

    useEffect(()=>{
        var state = true;
        for(const item in dataState){
            if(!dataState[item]){
                state = false;
                break;
            }

        }
        props.correctHandler(state);
        if(state)
            props.dataHandler(data);
        else
            props.dataHandler(null);
    },[dataState])

    return ( 
    <div className="center rgstr-item">
            <input className={data["_phone"]!==null ? (dataState["_phone"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="تلفن" type="text" onChange={(e)=>{dataHandler("_phone",e.target.value)}}/>

        
            <input className={data["_password"]!==null ? (dataState["_password"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="رمز عبور" type="password" onChange={(e)=>{dataHandler("_password",e.target.value)}}/>

        <ButtonComponent value="فراموشی رمز عبور" cls=" btn-text"/>
    </div> );
}
 
export default LoginComponent;