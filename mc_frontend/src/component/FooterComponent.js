const FooterComponent = () => {
    return ( <div className="footer-Cntr">
        <div className="footer-info center">
            <div className="footer-map center">
                <iframe title="googlemap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d256.66054404443116!2d59.47235540999357!3d36.36910404369331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c8d196a036d61%3A0xfeefb4e68bdab0cd!2zTWMgY29mZmVlINmF2qkg2qnYp9mB24w!5e0!3m2!1sen!2sfr!4v1690454929077!5m2!1sen!2sfr" width="400" height="300"></iframe>
            </div>
            <div className="footer-aboutus fa">
                <h2>بیا یک شات بزن جای ما :)</h2>
                <h3>شماره تماس :</h3>
                <p style={{direction: "ltr"}}>+98 9158154300</p>
                <h3>آدرس :</h3>
                <p>مشهد، شهرک غرب، خیابان رحمانیه، بین رحمانیه 26 و 28، مک کافه </p>
            </div>
        </div>
        <div className="footer-dev center">{new Date().getFullYear()} &copy; Developer <a href='https://instagram.com/isef_v?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D'>ISEF-V</a></div>
    </div> );
}
 
export default FooterComponent;