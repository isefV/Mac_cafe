import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { billCalculatorHandler ,CounterControlHandler } from "../Tools/Functions";

import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import SidebarComponent from "../component/SidebarComponent";
import ButtonComponent from "../component/ButtonComponent";
import BillComponent from "../component/BillComponent";
import MenuComponent from "../component/MenuComponent";

const CounterPage = (props) => {

    const navigate = useNavigate()

    const [statusCode,setStatusCode] = useState(null);

    const confirmOrder = useMemo(()=>{
        if(statusCode!==null){
            props.userHandler("_status",true);
            props.userHandler("_statusCode",statusCode);
            props.selectedhandler();
            return true;
        }
        props.userHandler("_status",false);
        props.userHandler("_statusCode",null);
        return false;
    },[statusCode]);

    const buttons = [<ButtonComponent value="ثبت سفارش" cls=" btn-submit" disable={confirmOrder} key="btn-0" click={()=>{CounterControlHandler(props.selectedItem,props.menu,props.id,setStatusCode)}}/>]

    const bill = useMemo(()=>{
        
        if(Object.keys(props.selectedItem).length > 0)
        {
            const [totalPrice,totalDiscount,finalAmount] = billCalculatorHandler(props.menu,props.selectedItem);
            return <BillComponent key="bill-0" totalPrice={totalPrice} totalDiscount={totalDiscount} finalAmount={finalAmount}/>;
        }
        return <BillComponent key="bill-0" totalPrice="0" totalDiscount="0" finalAmount="0"/>;
    },[props.selectedItem]);  

    const [counterMenu,setCounterMenu] = useState({});

    const counterHandler = ()=>{
        var obj = {}
        for(const item in props.selectedItem){
            obj[item] = props.menu[item];
        }
        setCounterMenu(obj);
    }

  useEffect(()=>{ setStatusCode(props.statusCode) },[])

  useEffect(()=>{ counterHandler(); },[props.selectedItem])

  useEffect(()=>{
    if(!props.login)
        navigate("/register")
},[props.login])

    return ( 
        <div className="container-Page scrollbar">
            <NavbarComponent badges={false} admin={props.admin}/>

            <div className="content-Cntr layout fa">
                <SidebarComponent top={[bill]} bottom={buttons}/>
                {/* <div className="style-1">s</div> */}
                <div className="view scrollbar">
                    {!confirmOrder && <MenuComponent countHandler={props.countHandler} menu={counterMenu} selectedItem={props.selectedItem}/>}
                    {confirmOrder && <div className="center column-base">
                        <h2 className="clr-succesfull">در لیست انتظار</h2>
                        <div> سفارش شما با کد <span className="clr-important">{statusCode}</span>  به زودی آماده می شود.</div>
                    </div>}
                </div>
            </div>

            <BackgroundItemComponent />

            <FooterComponent />
        </div>
     );
}
 
export default CounterPage;