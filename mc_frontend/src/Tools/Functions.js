import { local } from "./Variables";
import axios from "axios";

export const getHandler = async (addres,sets,state=0)=>{
    try{
        const res = await axios.get(local + addres)

        if(res.data._op === 1)
            state = 1;
        else if(res.data._op === 2)
            state = 2;

        sets(res.data._data);

    }catch(err){
        // console.log(err)
    }
}

export const postHandler = async (data,addres,sets,state=0)=>{
    try{
        const res = await axios.post(local + addres,{_data:data})

        if(res.data._op === 1)
            state = 1;
        else if(res.data._op === 2)
            state = 2;

        if(sets!==null)
            sets(res.data._data);
        // console.log("post",res.data._data)
    }catch(err){
        // console.log(err)
    }
}

export const selectNonZeroHandler = (obj)=>{
    var tmp = {}
    for(const item in obj){
        if(obj[item]!==0)
            tmp[item]=obj[item];
    }
    return tmp;
}

export const correctnessDataHandler = (data,indent = false,id = null)=>{
    if(typeof(data)==="undefined")
        return false;
    if(typeof(data)==="object" && Object.entries(data).length === 0)
        return false;
    if(indent && typeof(data)==="object" && typeof(data[id]) ==="undefined")
        return false;

    return true;
}

export const detectSectionMenuHandler = (menu,sectionId)=>{
    var obj = {};
    for(const item in menu){
        if(menu[item]["_section"]==sectionId)
            obj[item] = menu[item];
    }
    return obj;
}

export const billCalculatorHandler = (menu,selectedItems)=>{
    var discount = 0, price = 0;
    for(const item in menu){
        if(item in selectedItems){
            price += menu[item]["_price"] * selectedItems[item];
            discount += ((menu[item]["_discount"]/100) * menu[item]["_price"]) * selectedItems[item];
        }
    }

    return [ price.toFixed(3) , discount.toFixed(3), (price - discount).toFixed(3) ];
}


export const adminControlHandler = (op,data)=>{

    if(op === "add"){
        if(data["_mode"]){
            postHandler(data["_data"],"/addSection",null);
            return true;
        }
        postHandler(data["_data"],"/addMenu",null);
        return true;
    }

    if(op === "del"){
        if(data["_mode"]){
            postHandler(data["_id"],"/deleteSection",null);
            return true;
        }
        postHandler(data["_id"],"/deleteMenu",null);
        return true;
    }

    postHandler(data,"/editMenu",null);
    return true;
}

export const CounterControlHandler = (selected,menu,id,status)=>{

    var obj = {},data = {};
    Object.keys(selected).map((item)=>{
        obj[item] = {
            _title : menu[item]["_title"],
            _price : menu[item]["_price"],
            _discount : menu[item]["_discount"],
            _count : selected[item]
        }
    })

    const [totalPrice,totalDiscoun,finalAmount] = billCalculatorHandler(menu,selected);

    obj["_details"] = {
        _totalPrice : totalPrice,
        _totalDiscount : totalDiscoun,
        _finalAmount : finalAmount
    }

    data["_data"] = JSON.stringify(obj);
    data["_time"] = new Intl.DateTimeFormat('fa-IR', { hour: "numeric", minute: "numeric"}).format(new Date());
    data["_date"] = new Intl.DateTimeFormat('fa-IR', { year: "numeric", month: "numeric", day: "numeric" }).format(new Date());
    data["_status"] = "انتظار";
    data["_user"] = id;

    postHandler(data,"/submitOrder",status);

    return true;
}


export const inputHandler = (data,part)=>{
    if(data===null || data[0]===null || data[1]===null)
        return ""

    const correct= true
    const wrong = false
    
    
    switch (part) {
        case "_username":
            if(data.split(" ").length > 1)
                return wrong;
            return correct;
        case "_phone":
            const re_phone = /^09([0-9]{9})$/
            if(data.search(re_phone)===-1)
                return wrong
            return correct
        case "_email":
            const re_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(data.search(re_email)===-1)
                return wrong
            return correct
        case "_password":
            const re_password = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]{8,20}$/
            if(data.search(re_password)===-1)
                return wrong
            return correct
        case "_rePassword":
            if(data[0]!==data[1])
                return wrong
            return correct
        default:
            return "";
    }
}