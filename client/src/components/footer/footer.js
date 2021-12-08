import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTelegram, FaInstagram } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdCall } from "react-icons/io";

import "./footer.css";

const Footer = () => {
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
            Anest farmaseftical <span>kompaniyasi</span>
          </h3>
        </div>
        <div className="footer__bottom">
          <ul className="footer__list">
            <Link to="/">
              <li className="footer__link">Bosh sahifa</li>
            </Link>
            <Link to="/statistic">
              <li className="footer__link">Statistika</li>
            </Link>
            <Link to="/about">
              <li className="footer__link">Biz haqimizda</li>
            </Link>
            <Link to="/news">
              <li className="footer__link">Yangiliklar</li>
            </Link>
            <Link to="/products">
              <li className="footer__link">Mahsulotlar</li>
            </Link>
            <Link to="/contact">
              <li className="footer__link">Kontakt</li>
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
