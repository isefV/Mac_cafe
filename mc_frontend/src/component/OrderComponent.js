import { useEffect, useState } from "react";
import { correctnessDataHandler } from "../Tools/Functions";

const OrderComponent = (props) => {

    const [activeItem,setActiveItem] = useState(null);

    const statusClr = (val)=>{
        if(val === "تکمیل")
            return " clr-succesfull";
        else if(val === "لغو مدیر" || val === "لغو کاربر")
            return " clr-unsuccesfull";
        return " clr-important";
    }

    useEffect(()=>{},[props.content])

    return ( 
    <div className="view orders">
        <div className={"orders-titles center" + (props.customer ? " orders-titles-2": "")}>
            <div></div>
            { correctnessDataHandler(props.titles) && props.titles.map((item,index)=>{return <div key={"t-"+index}>{item}</div>})}
        </div>
        <div className="orders-content glass scrollbar">
            {!props.customer && correctnessDataHandler(props.content) && props.content.map((item_1,index_1)=>{
                const orders = JSON.parse(item_1["_orders"]);
                var ordersTitle = "";
                Object.keys(orders).map((item)=>{
                    if(item!=="_details"){
                        ordersTitle += orders[item]["_title"] + "  x"+orders[item]["_count"]+ (orders[item]["_discount"]!==null?" %"+orders[item]["_discount"]:"") + " - "
                    }
                })
                ordersTitle = ordersTitle.slice(0,-2);
                return correctnessDataHandler(item_1) && <div className={"orders-titles order-item"+(activeItem===item_1["_id"]?" order-item-active":"")} onClick={(e)=>{props.click(e);setActiveItem(item_1["_id"])}} key={item_1["_id"]} id={item_1["_id"]}>
                            <div className="clr-important" key={"i-"+index_1+"-x"}>{index_1+1}</div>
                            {/* // Object.keys(item_1).map((item_2,index_2)=>{return <div key={"i-"+index_1+"-"+index_2}>{item_1[item_2]}</div>}) */}
                            <div>{item_1["_time"]}</div>
                            <div>{item_1["_id"]}</div>
                            <div>{item_1["_phone"]}</div>
                            <div className={statusClr(item_1["_status"])}>{item_1["_status"]}</div>
                            <div>{orders["_details"]["_finalAmount"]}</div>
                            <div>{ordersTitle}</div>

                        </div>})}

            {props.customer && correctnessDataHandler(props.content) && props.content.map((item_1,index_1)=>{
                const orders = JSON.parse(item_1["_orders"]);
                var ordersTitle = "";
                Object.keys(orders).map((item)=>{
                    if(item!=="_details"){
                        ordersTitle += orders[item]["_title"] + " x"+orders[item]["_count"]+ (orders[item]["_discount"]!==null?" *"+orders[item]["_discount"]:"") + " - "
                    }
                })
                ordersTitle = ordersTitle.slice(0,-2);
                return correctnessDataHandler(item_1) && <div className={"orders-titles orders-titles-2 order-item"+(activeItem===item_1["_id"]?" order-item-active":"")} onClick={(e)=>{props.click(e);setActiveItem(item_1["_id"])}} key={item_1["_id"]} id={item_1["_id"]}>
                            <div className="clr-important" key={"i-"+index_1+"-x"}>{index_1+1}</div>
                            {/* // Object.keys(item_1).map((item_2,index_2)=>{return <div key={"i-"+index_1+"-"+index_2}>{item_1[item_2]}</div>}) */}
                            <div>{item_1["_time"]}</div>
                            <div>{item_1["_id"]}</div>
                            <div>{orders["_details"]["_totalDiscount"]}</div>
                            <div>{orders["_details"]["_finalAmount"]}</div>
                            <div className={statusClr(item_1["_status"])}>{item_1["_status"]}</div>
                            <div>{ordersTitle}</div>

                        </div>})}
        </div>
    </div>
     );
}
 
export default OrderComponent;