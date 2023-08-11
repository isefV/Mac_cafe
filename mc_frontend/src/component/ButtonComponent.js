const ButtonComponent = (props) => {

    return ( <div role="button" id={props.id} className={"btn center"+ (props.disable ? " btn-disable":props.cls)} onClick={props.disable ? ()=>{}:props.click} >
        {props.value}
    </div> );
}
 
export default ButtonComponent;