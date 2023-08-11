import { correctnessDataHandler } from "../Tools/Functions";

const SelectiveComponent = (props) => {
    return ( 
        <div className="slct-Cntr">
            <select onChange={(e)=>{props.change(e.target.value)}} disabled={props.disable} value={props.default}>
                <option value={props.value} /*defaultChecked={true}*/>{props.text}</option>

                {!props.list && correctnessDataHandler(props.data) && 
                Object.keys(props.data).map((item)=>{ 
                    return correctnessDataHandler(props.data[item],true,"_title") && <option value={item} key={item}>{props.data[item]["_title"]}</option> 
                    })
                }

                {props.list && correctnessDataHandler(props.data) && 
                props.data.map((item)=>{ 
                    return <option value={item} key={item}>{item}</option> 
                    })
                }
            </select>
        </div>
     );
}
 
export default SelectiveComponent;