import React from "react";
import { useTranslation } from 'react-i18next'

import "./aboutus.css";

const AboutUs = () => {

  const { t } = useTranslation()

  return (
    <div className="container about-us">
      <h2 className="title">{t('about.about')}</h2>
      <div className="about-us__wrapper">
        <div className="about-us-img"></div>
        <div className="about-us-bottom"></div>
        <div className="about-us__info">
          <h3>{t('about.team')}</h3>
          <p>
          {t('about.text')}
          </p>
        </div>
        <div className="about-us__img">
          <div className="response">
            <img
              className="response-img"
              src="./img/img1.png"
              alt="nurse"
            ></img>
          </div>
          <div className="about-us__img-item">
            <img src="./img/img2.png" alt="nurse"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
