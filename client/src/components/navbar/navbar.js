import React, { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from "react-router-dom";
import i18next from 'i18next';
import styled from "styled-components";
import {useDispatch} from 'react-redux'
import {userLang} from '../../redux/action/Action'
import "./navbar.css";

const styledGr = styled.div`
  stroke: #000;
`;

const Navbar = ({ white, blue }) => {

  const dispatch = useDispatch()

  const [langShow, setLangShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  
  const changeLan = (lang) => {
    i18next.changeLanguage(lang);
    dispatch(userLang(lang));
  }
  
  const myStyle1 = {
    border: "1px solid #000",
  };
  const myStyle2 = {
    background: "#000",
  };

  // const iconStyle = {
  //   stroke: white ? "#fff" : "#000",
  // };

  const change = location.pathname !== "/" ? myStyle1 : null;
  const change2 = location.pathname !== "/" ? myStyle2 : null;

  const changedC =
    location.pathname !== "/" ? "lang-icon-bg" : "lang-icon-bg changed-color";

  const langShowStyle = langShow
    ? "lang__list lang__list-active"
    : "lang__list";

  const langsShowStyle = langShow
    ? "lang__wrapper lang__wrapper-active"
    : "lang__wrapper";

  const menuShowStyle = menuShow ? "icon nav-icon-4 open" : "icon nav-icon-4 ";

  const listShowStyle = menuShow
    ? "nav__list-wrapper nav__list-wrapper-active"
    : "nav__list-wrapper ";

  return (
    <div className="nav">
      <div className="container nav__wrapper">
        <div className="logo">
          <Link to="/">
            <img src="./img/logo.png" alt="logo"></img>
          </Link>
        </div>
        <div className={listShowStyle}>
          <ul className="nav__list">
            <Link onClick={() => setMenuShow(!menuShow)} to="/">
              <li className="nav__link">{t('navbar.home')}</li>
            </Link>
            <Link onClick={() => setMenuShow(!menuShow)} to="/about">
              <li className="nav__link">{t('navbar.about')}</li>
            </Link>
            <Link onClick={() => setMenuShow(!menuShow)} to="/new">
              <li className="nav__link">{t('navbar.news')}</li>
            </Link>
            <Link onClick={() => setMenuShow(!menuShow)} to="/allProducts">
              <li className="nav__link">{t('navbar.products')}</li>
            </Link>
            <Link onClick={() => setMenuShow(!menuShow)} to="/contact">
              <li className="nav__link">{t('navbar.contact')}</li>
            </Link>
          </ul>
        </div>
        <div className="lang" >
          <ul onClick={() => setLangShow(!langShow)} className={langsShowStyle} style={change}>
            <div className={changedC}></div>
            <ul className={langShowStyle}>
              <li onClick={() => changeLan('uz')}>
                <span
                style={{color: 'black'}}
                >uz</span>
              </li>
              <li onClick={() => changeLan('en')}>
              <span
              style={{color: 'black'}}
              >en</span>
              </li>
              <li onClick={() => changeLan('ru')}>
              <span
              style={{color: 'black'}}
              >ru</span>
              </li>
            </ul>
          </ul>
          <div className={menuShowStyle} onClick={() => setMenuShow(!menuShow)}>
            <span style={change2}></span>
            <span style={change2}></span>
            <span style={change2}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
