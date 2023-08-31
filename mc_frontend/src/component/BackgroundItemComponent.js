import { useEffect, useMemo, useState } from "react";

const BackgroundItemComponent = () => {
    const svgs = [<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/></svg> , <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg> ,<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z"/></svg> ]
    // const [ballsInfo,setBallsInfo] = useState([]);
    
    const ballsInfo = useMemo(()=>{
        const ballsCount = Math.floor(Math.random() * 10) + 2;

        const arr = [];

        for(var item = 0 ; item < ballsCount ; item++){

            const top = Math.floor(Math.random() * 65) + 25;
            const left = Math.floor(Math.random() * 80) + 10;
            const size = Math.floor(Math.random() * 75) + 25;
            const bg = Math.floor(Math.random() * 2) === 1 ? "#f9e086": "#fbba43";
            const ani = "moveball-" + ((Math.floor(Math.random() * 3) % 3));
            const delay = Math.floor(Math.random() * 10);

            const obj = {
                top: top + "%",
                left: left + "%",
                width: size + "px",
                height: size + "px",
                fill:bg,
                backgroundColor: "transparent",
                animation: ani + " infinite alternate 5s " + delay + "s ease-in-out"
            };

            arr.push(obj);
        }

        return arr;

    },[])

    return ( <div className="bg-Cntr">
        {ballsInfo.length !== 0 && ballsInfo.map((item,index)=>{ const randsvg = Math.floor(Math.random() * svgs.length); return <div className="bg-item bg-balls center" style={item} key={"bg-"+index}>{svgs[randsvg]}</div> })}
    </div> );
}
 
export default BackgroundItemComponent;