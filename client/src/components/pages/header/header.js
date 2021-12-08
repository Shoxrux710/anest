import React from "react";
import { MdFamilyRestroom } from 'react-icons/md';
import { BsHouseFill, BsBagPlusFill, BsArrowDown } from 'react-icons/bs';
import { FaFacebook, FaTelegram, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next'
import './header.css';
import { Link } from "react-router-dom";
 
const Header = () => {

    const { t } = useTranslation()

    return(
        <div className="header">
            <div className="header__div"></div>
            <div className="container header__wrapper">
                <div className="header__top">
                <div className="header__top-left">
                    <h1>{t('header.h1')}</h1>
                    <p>{t('header.p')}</p>
                </div>
                <div className="header__top-right">
                    <img src="./img/girl.png" alt="nurse"></img>
                </div>
            </div>
            <div className="header__bottom">
                <div className="header__content">
                    <ul className="header__content-item">
                        <li className="header__content-icon"><MdFamilyRestroom/></li>
                        <li className="header__content-count">500+</li>
                        <li className="header__content-text">{t('header.mijoz')}</li>
                    </ul>
                    <ul className="header__content-item">
                        <li className="header__content-icon"><BsHouseFill/></li>
                        <li className="header__content-count">80+</li>
                        <li className="header__content-text">{t('header.dorixona')}</li>
                    </ul>
                    <ul className="header__content-item">
                        <li className="header__content-icon"><BsBagPlusFill/></li>
                        <li className="header__content-count">24 xil</li>
                        <li className="header__content-text">{t('header.mahsulot')}</li>
                    </ul>
                    <ul className="header__content-item">
                        <li className="header__content-icon"><BsBagPlusFill/></li>
                        <li className="header__content-count">100000+oy</li>
                        <li className="header__content-text">{t('header.mahsulot')}</li>
                    </ul>
                </div>
                <ul className="net">
                    <li className="network"><Link to="/"><FaFacebook/></Link></li>
                    <li className="network"><Link to="/"><FaTelegram/></Link></li>
                    <li className="network"><Link to="/"><FaInstagram/></Link></li>
                    <li className="arrow"><Link to="/"><BsArrowDown/></Link></li>
                </ul>
            </div>
            </div>
            
        </div>
    )
}

export default Header;