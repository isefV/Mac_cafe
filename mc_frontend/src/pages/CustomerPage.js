import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { empty } from "../Tools/Variables";
import {postHandler} from "../Tools/Functions"

import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import SidebarComponent from "../component/SidebarComponent";
import SelectiveComponent from "../component/SelectiveComponent"
import ButtonComponent from "../component/ButtonComponent"
import OrderComponent from "../component/OrderComponent"
import ProfileComponent from "../component/ProfileComponent"

const CustomerPage = (props) => {

    const navigate = useNavigate()

    const [dates,setDates] = useState([]);
    const [content,setContent] = useState([]);
    const [activeDate,setActiveDate] = useState("NoSelected");
    const [activeOrder,setActiveOrder] = useState(null);
    const [state,setState] = useState(false);

    const dateHandler = (val)=>{
        orderHandler(null)
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
        return [<SelectiveComponent value={"NoSelected"} data={dates} list={true} change={dateHandler} text={"تاریخ"} key="slc-0"/>,
        <ButtonComponent value="لغو" cls=" btn-delete" key="btn-1" disable={activeDate==="NoSelected" || activeOrder===null} click={()=>{
            const val = content.map((item)=>{
                if(item["_id"]===Number(activeOrder))
                    return item["_status"] ;
                })[0]
            if(val === "انتظار"){
                postHandler({_id:activeOrder,_data:"لغو کاربر"},"/statusOrders",null);
                setState(!state)
                props.userPropHandler("_status",false);
                props.userPropHandler("_statusCode",null);
            }
        }}/>
    ]
    },[dates,activeDate,activeOrder])

    const titles = [  "ساعت" , "کد"  , "تخفیف"  , "قیمت" ,"وضیعت"  ,"سفارش" ]
    
    useEffect(()=>{
        postHandler({_id:props.user._id},"/customerDateOrders",setDates)
    },[props.user._id])

    useEffect(()=>{
        if(activeDate !== "NoSelected"){
            postHandler({_id:props.user._id,_date:activeDate},"/customerOrders",setContent)
        }
    },[activeDate])

    useEffect(()=>{},[activeDate,activeOrder])

    useEffect(()=>{
        if(!props.user._login)
            navigate("/register")
    },[props.user._login])


    return ( 
        <div className="container-Page scrollbar">
            <NavbarComponent badges={false} admin={props.user._admin}/>

            <div className="content-Cntr layout fa">
                <SidebarComponent top={[<ProfileComponent username={props.user._username} id={props.user._id} key="profile"/>,
            <ButtonComponent value="خروج" cls=" btn-delete" key="btn-exit" click={()=>{props.userHandler(empty) }}/>
            ]} bottom={selective}/>
                <OrderComponent customer={true} titles={titles} content={content} click={(e)=>{orderHandler(e.target.id)}}/>
            </div>

            {/* <BackgroundItemComponent /> */}

            <FooterComponent />
        </div>
     );
}
 
export default CustomerPage;