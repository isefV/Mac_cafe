import { useEffect, useMemo, useState } from "react";



import { detectSectionMenuHandler } from "../Tools/Functions";

import NavbarComponent from "../component/NavbarComponent";
import MenuComponent from "../component/MenuComponent";
import FooterComponent from "../component/FooterComponent";
import TabNavigationComponent from "../component/TabNavigationComponent";
import BackgroundItemComponent from "../component/BackgroundItemComponent";
import LandingComponent from "../component/LandingComponent";


const MenuPage = (props) => {

    const [activeTab,setActiveTab] = useState(null);
    const [activeMenu,setActiveMenu] = useState({});
    
    const badgesControl = useMemo(()=>{
        return Object.keys(props.selectedItem).length > 0
    },[props.selectedItem]);


    useEffect(()=>{ 
        if(activeTab!==null)  
            setActiveMenu(detectSectionMenuHandler(props.menu,activeTab));
        else
            setActiveMenu(props.menu);
     },[activeTab,props.menu])

    return (
    <div className="container-Page scrollbar">
        <NavbarComponent badges={badgesControl} admin={props.admin}/>

        <div className="content-Cntr unStyle fa">
            <LandingComponent />
            <TabNavigationComponent section={props.section} activeTab={ activeTab } setActiveTab={setActiveTab}/>
            <MenuComponent countHandler={props.countHandler} menu={activeMenu} selectedItem={props.selectedItem}/>
        </div>

        <BackgroundItemComponent />

        <FooterComponent />
  </div> );
}
 
export default MenuPage;