import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { empty } from "../Tools/Variables";
import { postHandler } from "../Tools/Functions";

import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import LoginComponent from "../component/LoginComponent";
import SignupComponent from "../component/SignupComponent";
import ButtonComponent from "../component/ButtonComponent";

const RegisterPage = (props) => {

    const navigate = useNavigate();

    const [op,setOp] = useState(false);
    const [dataCorrect,setDataCorrect] = useState(false);
    const [data,setData] = useState(null);
    const [user,setUser] = useState(null);
    const [login,setLogin] = useState(false);

    const RegisterHandler = ()=>{
        if(op){
            postHandler(data,"/login",setUser);
            return true;
        }
        postHandler(data,"/signup",setUser);
    }

    const toLogin = (mode)=>{
        // props.userHandler(empty);
        if(user===null || typeof(user)==="undefined")
            return false;
        if(!mode){
            if(typeof(user["_id"])==="undefined")
                return false;
            props.userHandler({
                _id:user["_id"],
                _username:data["_username"],
                _phone:data["_phone"],
                _login:true,
                _status:false,
                _statusCode:null,
                _admin:false
            });
            setLogin(true);
            return true;
        }
       
        if(typeof(user["_id"])==="undefined" || typeof(user["_username"])==="undefined" || typeof(user["_admin"])==="undefined")
            return false;
        props.userHandler({
            _id:user["_id"],
            _username:user["_username"],
            _phone:data["_phone"],
            _login:true,
            _status:false,
            _statusCode:null,
            _admin:!!user["_admin"]
        });
        setLogin(true);
    }

    useEffect(()=>{ 
        toLogin(op); 
    },[user])

    useEffect(()=>{},[dataCorrect])
    
    return ( <div className="container-Page scrollbar">
        <NavbarComponent badges={false}/>

        <div className="content-Cntr">
            <div className="glass rgstr-Cntr">
                <div className="rgstr-btn center">
                    <ButtonComponent value="ثبت نام" cls={!op ? " btn-ok" : ""} click={()=>{setOp(!op)}}/>
                    <ButtonComponent value="ورود" cls={op ? " btn-ok" : ""}  click={()=>{setOp(!op)}}/>
                </div>

                {op && <LoginComponent correctHandler={setDataCorrect} dataHandler={setData}/>}

                {!op && <SignupComponent  correctHandler={setDataCorrect} dataHandler={setData}/>}

                <div className="center">
                    <ButtonComponent value="تایید" cls=" btn-ok-2" disable={!dataCorrect} click={RegisterHandler}/>
                </div>
                
                {user!==null && login && navigate("/profile")}
                {op && user!==null && typeof(user)==="undefined" && <div className="center clr-unsuccesfull">مشخصات اشتباه است.</div>}
                {!op && user!==null && typeof(user)!=="undefined" && typeof(user["_err"])!=="undefined" && user["_err"] && <div className="center clr-unsuccesfull">مشخصات موجود است.</div>}

            </div>
        </div>

        {/* <BackgroundItemComponent /> */}

        <FooterComponent />
</div> );
}
 
export default RegisterPage;