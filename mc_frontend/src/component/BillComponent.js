const BillComponent = (props) => {
    return ( 
        <div className="counter-bill fa">
            <div>
                <div>مجموع</div>
                <div>تخفیف</div>
                <div>مبلغ نهایی</div>
            </div>
            <div>
                <div>{props.totalPrice}</div>
                <div>{props.totalDiscount}</div>
                <div>{props.finalAmount}</div>
            </div>
            <div>
                <div>تومان</div>
                <div>تومان</div>
                <div>تومان</div>
            </div>
        </div>
     );
}
 
export default BillComponent;