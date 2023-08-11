import { useEffect } from "react";

import { correctnessDataHandler } from "../Tools/Functions";

import ItemCardComponent from "../component/ItemCardComponent";

const MenuComponent = (props) => {

  useEffect(()=>{},[props.selectedItems]);

    return ( 
        <div className="menu-Cntr center">
            {/* <div className="menu-title" id="esp">
              بار گرم
            </div> */}
            <div className="menu-content">
              { correctnessDataHandler(props.menu)
                && 
                Object.keys(props.menu).map((item)=>{ 
                  return correctnessDataHandler(props.menu[item],true,"_title") && <ItemCardComponent itemsId={item} data={props.menu[item]} countHandler={props.countHandler} countValue={correctnessDataHandler(props.selectedItem[item])?props.selectedItem[item]:0} key={item}/> 
                })}
            </div>
        </div>
     );
}
 
export default MenuComponent;