import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getHandler,postHandler} from "../Tools/Functions"

import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import SidebarComponent from "../component/SidebarComponent";
import SelectiveComponent from "../component/SelectiveComponent"
import ButtonComponent from "../component/ButtonComponent";
import OrderComponent from "../component/OrderComponent";

const OrdersPage = (props) => {

    const navigate = useNavigate()

    const [dates,setDates] = useState([]);
    const [content,setContent] = useState([]);
    const [activeDate,setActiveDate] = useState("NoSelected");
    const [activeOrder,setActiveOrder] = useState(null);
    const [state,setState] = useState(false);

    const dateHandler = (val)=>{
        if(val === "NoSelected"){
            setActiveDate(null);
            return false;
        }
        setActiveDate(val);
    }

    const orderHandler = (val)=>{
        setActiveOrder(val);
    }

    const selective = useMemo(()=>{
        return [<SelectiveComponent value={"NoSelected"} data={dates} text={"تاریخ"} change={dateHandler} list={true} key="slc-0"/>]
    },[dates])
        
    const buttons = [   <ButtonComponent value="تحویل" cls=" btn-submit" key="btn-0" click={()=>{postHandler({_id:activeOrder,_data:"تکمیل"},"/statusOrders",null);setState(!state)}}/>
        ,<ButtonComponent value="لغو" cls=" btn-edit" key="btn-1" click={()=>{postHandler({_id:activeOrder,_data:"لغو مدیر"},"/statusOrders",null);setState(!state)}}/>]

    const titles = [ "ساعت" , "کد" , "تلفن"  ,"وضیعت"  , "قیمت"  ,"سفارش" ]
    
    // const content = [ ["10:59","09354708122","انتظار",198,"اسپرسو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - کاپوچینو - لاته"] , ["10:59","09354708122","انتظار",198,"اسپرسو - کاپوچینو - لاته"]]

    useEffect(()=>{
        getHandler("/orders",setDates)
    },[])

    useEffect(()=>{
        if(activeDate!=="NoSelected")
            postHandler({_date:activeDate},"/dateOrder",setContent)
    },[activeDate,state])

    useEffect(()=>{
        if(!props.login)
            navigate("/register")
    },[props.login])

    return (  
        <div className="container-Page scrollbar">
            <NavbarComponent badges={false} admin={props.admin}/>

            <div className="content-Cntr layout fa">
                <SidebarComponent top={selective} bottom={buttons}/>
                <OrderComponent titles={titles} content={content} click={(e)=>{orderHandler(e.target.id)}}/>
            </div>

            <BackgroundItemComponent />

            <FooterComponent />
        </div>
      );
}
 
export default OrdersPage;