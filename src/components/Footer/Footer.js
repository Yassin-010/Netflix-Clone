import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
            </div>
            <p className="footer__text">Yassin Al Farwan</p>
            <ul className="social-icon">
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://github.com/Yassin-010">
                        <ion-icon name="logo-github"></ion-icon>
                    </a>
                </li>
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.linkedin.com/in/yassin-al-farwan-9010b9266/">
                        <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;