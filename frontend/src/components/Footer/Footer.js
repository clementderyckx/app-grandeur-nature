// Images
import './Footer.css';
import logoSocodip from "../../imgs/logo-socodip2021.svg";
import logoGrandeurNature from "../../imgs/logo-grandeur-nature.svg";

function Footer (){

    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src={logoGrandeurNature} alt="Logo grandeur nature" className='footer-logo-image' id="footer-grandeur-nature-logo"/>
            </div>
            <div className="footer-logo">
                <img src={logoSocodip} alt="Logo SOCODIP" className='footer-logo-image' id="footer-socodip-logo"/>
            </div>
        </footer>
    )
}

export default Footer;