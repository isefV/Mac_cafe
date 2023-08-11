
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { detectSectionMenuHandler , adminControlHandler } from "../Tools/Functions";

import NavbarComponent from "../component/NavbarComponent";
import FooterComponent from "../component/FooterComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import SidebarComponent from "../component/SidebarComponent";
import SelectiveComponent from "../component/SelectiveComponent"
import ButtonComponent from "../component/ButtonComponent";

const AdminPage = (props) => {

    const navigate = useNavigate()

    const emptyMenu = { _title:null , _descriptions:null , _price:null, _discount:null, _count:null, _img:null ,_section:null };
    const emptySection = { _title : null };

    const [mode,setMode] = useState(true);
    const [editMode,setEditMode] = useState(false);
    const [update,setUpdate] = useState(false);

    const [activeSection,setActiveSection] = useState("secPart");
    const [activeMenu,setActiveMenu] = useState("menuPart");

    const [sectionData,setSectionData] = useState(emptySection);
    const [menuData,setMenuData] = useState(emptyMenu);

    const sectionHandler = (value)=>{
        setMode(value==="secPart");
        setActiveSection(value);
        menuHandler("menuPart");
        setMenuData(emptyMenu);
    }

    const menuHandler = (value)=>{
        setActiveMenu(value);
    }

    const editHandler = (value)=>{
        if(activeMenu!=="menuPart")
            setMenuData({ 
                _title: props.menu[activeMenu]["_title"]
                , _descriptions:props.menu[activeMenu]["_descriptions"] 
                , _price:props.menu[activeMenu]["_price"] 
                , _discount:props.menu[activeMenu]["_discount"]
                , _count:props.menu[activeMenu]["_count"]
                , _img:props.menu[activeMenu]["_img"] 
                ,_section:props.menu[activeMenu]["_section"] })
        else
            setMenuData(emptyMenu);
        setEditMode(value);
    }

    const updatePageHandler = ()=>{
        sectionHandler("secPart");
        setSectionData(emptySection);
        setUpdate(!update);
        editHandler(false);
    }

    const updateDataHandler = (id,data,val,set)=>{
        var tmp = {};
        tmp[id] = val;
        const {id:_,...rest} = data;
        const obj = Object.assign(rest,tmp);
        set(obj);
    }

    const detectModeHandler = (btnMode)=>{
        if(activeSection==="secPart")
            return true;
        if(activeMenu === "menuPart" && btnMode === "del")
            return true;
        return false
    }

    const checkDataHandler = (mode)=>{
        var obj = {}
        if(mode){
            Object.keys(sectionData).map((item)=>{
                if(sectionData[item] === null || sectionData[item].trim() === "")
                    obj[item] = null
                else
                    obj[item] = sectionData[item]
                return true;
         })
            if(obj["_title"] !== null)
                return obj;
            return null;
        }

        Object.keys(menuData).map((item)=>{
            if(menuData[item] === null || (typeof(menuData[item])==="string" && menuData[item].trim() === ""))
                obj[item] = null
            else
                obj[item] = menuData[item]

            if(obj[item] !== null && (item === "_price" || item === "_count" || item === "_discount"))
                obj[item] = Number(obj[item]);

            if(item==="_section")
                obj[item] = activeSection;
            return true;
     })
        if(obj["_title"] !== null && obj["_price"] !== null )
            return obj;
        return null;
    }

    const nullHandler = (data)=>{ 
        if(data===null) {
            return "";
        }
        return data;
     }

    const selective = useMemo(()=>{
        const menuObj = activeSection !=="secPart" ?  detectSectionMenuHandler(props.menu,activeSection) : props.menu;

        editHandler(false);

        return [ <SelectiveComponent value={"secPart"} text={"ایجاد بخش"} data={props.section } default={activeSection} change={sectionHandler} key="slc-0"/>
        ,<SelectiveComponent value={"menuPart"} text={"ایجاد منو"} data={menuObj} disable={mode} default={activeMenu} change={menuHandler} key="slc-1"/>]
    },[activeSection,activeMenu,props.menu,props.section])

    const buttons = useMemo(()=>{ 
        var flg_add = !(activeSection === "secPart" || activeMenu ==="menuPart");
        var flg_edit_delete = !(activeSection !== "secPart" );
        
        return [   <ButtonComponent value="اضافه" cls=" btn-submit" disable={flg_add} key="add" id="add" click={
            (e)=>{
                const mod = detectModeHandler(e.target.id);
                const data = checkDataHandler(mod);
                if(data !== null){
                    adminControlHandler("add",{_mode:mod,_data:data});
                    props.update();
                    updatePageHandler();
                }}}/>

            ,<ButtonComponent value={editMode?"ثبت تغییرات":"ویرایش"} cls=" btn-edit"  disable={!flg_add} key="edit" id="edit" click={
                (e)=>{ 
                    if(editMode){
                        const data = checkDataHandler(detectModeHandler(e.target.id));
                        if(data !== null){
                            adminControlHandler("edit",{_id:activeMenu,_data:data});
                            props.update();
                            updatePageHandler();
                        }
                    }
                    else
                        editHandler(true);
                    }}/>

            ,<ButtonComponent value={editMode?"بازگشت":"حذف"} cls=" btn-delete"  disable={flg_edit_delete} key="del" id="del" click={
                (e)=>{
                    if(editMode)
                        editHandler(false);
                    else
                    {
                        const mod = detectModeHandler(e.target.id);
                        adminControlHandler("del",{_id:mod?activeSection:activeMenu,_mode:mod});
                        props.update();
                        updatePageHandler();
                    }
                }}/>]
        },[activeSection,activeMenu,menuData,sectionData,editMode])

    useEffect(()=>{

    },[editMode])

    useEffect(()=>{
        if(!props.login)
            navigate("/register")
    },[props.login])
        
    return ( 
        <div className="container-Page scrollbar">
            <NavbarComponent badges={false} admin={props.admin}/>

            <div className="content-Cntr layout fa">
                <SidebarComponent top={selective} bottom={buttons}/>
                <div className="view glass admin">
                    <div className="admin-section center">
                        <input placeholder={activeSection !=="secPart"? props.section[activeSection]["_title"]:"عنوان بخش"} type="text" disabled={!mode} value={sectionData["_title"]===null?"":sectionData["_title"]} onChange={(e)=>{updateDataHandler("_title",sectionData,e.target.value,setSectionData)}}/>
                    </div>
                    <div className="admin-menu">
                        <div className="center">
                            <input placeholder={activeMenu !== "menuPart" ? menuData["_title"]:"عنوان منو"} type="text" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} value={editMode || activeMenu==="menuPart" ? nullHandler(menuData["_title"]):""} onChange={(e)=>{updateDataHandler("_title",menuData,e.target.value,setMenuData)}}/>

                            <textarea placeholder={activeMenu !== "menuPart" ? menuData["_descriptions"]:"توضیحات"} row="5" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} value={editMode || activeMenu==="menuPart" ? nullHandler(menuData["_descriptions"]):""} onChange={(e)=>{updateDataHandler("_descriptions",menuData,e.target.value,setMenuData)}}/>
                        </div>
                        <div className="center">
                            <input placeholder={activeMenu !== "menuPart" ? menuData["_price"]:"قیمت"} type="number" min="0" max="1000" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} value={editMode || activeMenu==="menuPart" ? nullHandler(menuData["_price"]):""} onChange={(e)=>{updateDataHandler("_price",menuData,e.target.value,setMenuData)}}/>

                            <input placeholder={activeMenu !== "menuPart" ? menuData["_discount"]:"تخفیف"} type="number" min="0" max="100" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} value={editMode || activeMenu==="menuPart" ? nullHandler(menuData["_discount"]):""} onChange={(e)=>{updateDataHandler("_discount",menuData,e.target.value,setMenuData)}}/>

                            <input placeholder={activeMenu !== "menuPart" ? menuData["_count"]:"تعداد"} type="number" min="0" max="1000" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} value={editMode || activeMenu==="menuPart" ? nullHandler(menuData["_count"]):""} onChange={(e)=>{updateDataHandler("_count",menuData,e.target.value,setMenuData)}}/>

                            <input type="file" disabled={(mode || !editMode)&& activeMenu!=="menuPart"} onChange={(e)=>{updateDataHandler("_img",menuData,e.target.value,setMenuData)}}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* <BackgroundItemComponent /> */}

            <FooterComponent />
        </div>
     );
}
 
export default AdminPage;