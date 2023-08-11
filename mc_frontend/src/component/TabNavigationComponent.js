
// import { HashLink } from 'react-router-hash-link';

import { useEffect } from "react";

import { correctnessDataHandler } from "../Tools/Functions";

import ButtonComponent from "./ButtonComponent";

const TabNavigationComponent = (props) => {

    useEffect(()=>{  },[props.section])
    
    return (
    <div className="tabNav-Cntr center">
        <div className="tabNav center fa scrollbar">
            { correctnessDataHandler(props.section)
            && 
            Object.keys(props.section).map((item)=>{ 
                return correctnessDataHandler(props.section[item],true,"_title") && <div className="tabNav-item" key={item}><ButtonComponent cls={props.activeTab===item ? " btn-ok":""} id={item} value={props.section[item]["_title"]} click={(e)=>{ props.setActiveTab(e.target.id) }} /></div> 
                })}

        </div>
    </div> );
}
 
export default TabNavigationComponent;