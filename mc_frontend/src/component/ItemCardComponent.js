import { useEffect, useState } from "react";


import ButtonComponent from "./ButtonComponent";

const ItemCardComponent = (props) => {

    const [count,setCount] = useState(!!props.countValue ? props.countValue : 0);

    useEffect(()=>{
        props.countHandler(props.itemsId,count);
    },[count])

    useEffect(()=>{},[props.data])

    // useEffect(()=>{
    //     setCount()
    // },[props.countValue])

    return ( 
        <div className="itemCard-Cntr glass">
            <div className="ic center">
                <div className="ic-img">
                    <img src={props.data["_img"] !== null ? props.data["_img"]:"./assets/svg/preview.svg"} alt="preview" />
                </div>
                <div className="ic-info fa">
                    <div className="ic-title">{props.data["_title"]}{props.data["_count"] !== null && props.data["_count"] > 0 &&<span className="ic-count style-1">{props.data["_count"]}</span>}</div>
                    <div>{props.data["_descriptions"]}</div>
                </div>
                {count !== 0 && <div className="ic-buy center">
                    <div className="ic-price fa">{props.data["_price"]} تومان</div>
                    <div className="center ic-btn style-1">
                        <ButtonComponent cls={" btn-ok"}  click={()=>{setCount(count+1)}} value={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>}/>
                        <input className="style-1" value={count} disabled/>
                        <ButtonComponent cls={" btn-ok"}  click={()=>{setCount(count-1)}} value={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>}/>
                    </div>
                </div>}
                {count === 0 && <div className="ic-buy center">
                        <div className="ic-price fa">{props.data["_price"]} تومان</div>
                        <div className="center ic-btn style-1">
                            <ButtonComponent cls={" btn-ok"} click={()=>{setCount(count+1)}} value={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>}/>
                        </div>
                    </div>}

                {props.data["_discount"] !== null && props.data["_discount"] > 0 && <div className="ic-discount style-1 fa">      
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>
                    <div>{props.data["_discount"]}</div>
                </div>}
            </div>
        </div>
     );
}
 
export default ItemCardComponent;