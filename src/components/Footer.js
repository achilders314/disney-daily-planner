import React  from 'react';

function Footer(){
    return(
        <footer className="d-flex flex-column mt-2 justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center">
                <a className="mx-2" rel="noopener noreferrer" href="https://www.facebook.com/alisonscustomcode" target="_blank" aria-label="Contact me on Facebook"><i className="fa-brands fa-facebook" alt="Contact me on Facebook"></i></a>
                <a className="mx-2" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&source=mailto&to=alisonchilders314@gmail.com" target="_blank" aria-label="Contact me by Email"><i className="fa-solid fa-envelope" alt="Email me"></i></a>
                <a className="mx-2" rel="noopener noreferrer" href="https://alisonchilders.com" target="_blank" aria-label="Visit my Website"><i className="fa-solid fa-globe"></i></a>
            </div>
            <p className="">{new Date().getFullYear()} by Alison Childers</p>
        </footer>
    )
}

export default Footer;
