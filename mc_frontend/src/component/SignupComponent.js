import { useEffect, useState } from "react";
import {inputHandler} from "../Tools/Functions"

const SignupComponent = (props) => {
    const [data,setData] = useState({
        _username:null,
        _phone:null,
        _email:null,
        _password:null,
        _rePassword:null,
    });

    const [dataState,setDataState] = useState({
        _username:false,
        _phone:false,
        _email:false,
        _password:false,
        _rePassword:false,
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

        const state_username = inputHandler(data["_username"],"_username");
        const state_phone = inputHandler(data["_phone"],"_phone");
        const state_email = inputHandler(data["_email"],"_email");
        const state_password = inputHandler(data["_password"],"_password");
        const state_repassword = inputHandler([data["_password"],data["_rePassword"]],"_rePassword");

        setDataState({
            _username:state_username,
            _phone:state_phone,
            _email:state_email,
            _password:state_password,
            _rePassword:state_repassword,
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
            <input className={data["_username"]!==null ? (dataState["_username"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="نام کاربری" type="text" onChange={(e)=>{dataHandler("_username",e.target.value)}}/>

            <input className={data["_phone"]!==null ? (dataState["_phone"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="تلفن" type="text" onChange={(e)=>{dataHandler("_phone",e.target.value)}}/>

            <input className={data["_email"]!==null ? (dataState["_email"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="ایمیل" type="email" onChange={(e)=>{dataHandler("_email",e.target.value)}}/>

            <input className={data["_password"]!==null ? (dataState["_password"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="رمز عبور" type="password" onChange={(e)=>{dataHandler("_password",e.target.value)}}/>

            <input className={data["_rePassword"]!==null ? (dataState["_rePassword"]?" brd-succesfull":" brd-unsuccesfull"):""} placeholder="تکرار رمز عبور" type="password" onChange={(e)=>{dataHandler("_rePassword",e.target.value)}}/>
        </div> 
 );
}
 
export default SignupComponent;