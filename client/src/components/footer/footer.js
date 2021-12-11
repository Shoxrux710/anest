import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";
import { useTranslation } from 'react-i18next'

import "./footer.css";

const Footer = () => {

  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="container-md footer__wrapper">
        <div className="footer__logo">
          <div className="logo">
            <Link to="/">
              <img src="./img/logo.png" alt="logo"></img>
            </Link>
          </div>
          <h3>
            {t('header.h1')}
          </h3>
        </div>
        <div className="footer__bottom">
          <ul className="footer__list">
            <Link to="/">
              <li className="footer__link">{t('navbar.home')}</li>
            </Link>
            <Link to="/about">
              <li className="footer__link">{t('navbar.about')}</li>
            </Link>
            <Link to="/new">
              <li className="footer__link">{t('navbar.news')}</li>
            </Link>
            <Link to="/products">
              <li className="footer__link">{t('navbar.products')}</li>
            </Link>
            <Link to="/contact">
              <li className="footer__link">{t('navbar.contact')}</li>
            </Link>
          </ul>
          <div className="footer__info">
            <ul className="footer__net">
              <li className="footer__net-link">
                <AiOutlineMail />
                <Link to="gmail::Anest_company@mail.ru">
                  Anest_company@mail.ru
                </Link>
              </li>
              <li className="footer__net-link">
                <HiLocationMarker />
                <Link to="/">Yunusobod, Yangi Shahar ko'chasiг. Ташкен</Link>
              </li>
              <li className="footer__net-link">
                <IoMdCall />
                <Link className="num" to="/">+998(93) 480-58-85</Link>
              </li>
            </ul>
            <ul className="footer__net">
              <li className="footer__net-link">
                <FaFacebook />
                <Link to="/">Facebook</Link>
              </li>
              <li className="footer__net-link">
                <FaTelegram />
                <Link to="/">Telegram</Link>
              </li>
              <li className="footer__net-link">
                <FaInstagram />
                <Link to="/">FaInstagram</Link>
              </li>
            </ul>
          </div>
          <ul className="footer-link">
            <li>Mualliflik huquqi © 2021 Anest kompaniyasi</li>
            <li>
              <Link to="/">Website made by Dora IT Group</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
