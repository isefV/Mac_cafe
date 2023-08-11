

const SidebarComponent = (props) => {
    return (
    <div className="style-1 center sb-Cntr">
        <div className="sb-item center">
            {!!props.top && props.top.map((item)=>{return item})}
        </div>
        <div className="sb-item center">
            {!!props.bottom && props.bottom.map((item)=>{return item})}
        </div>
    </div> );
}
 
export default SidebarComponent;