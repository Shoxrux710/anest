import React from "react";
import Aboutus from '../aboutus';
import { useTranslation } from 'react-i18next'
import './about.css';

const About = () => {

    const { t } = useTranslation()

    return(
        <div className="about">
            <Aboutus/>
            <div className="container about__wrapper">
                <div className="about__img-1">
                    <img src="./img/1.png" alt="nurse"></img>
                    <img src="./img/anestk.png" alt="nurse"></img>
                </div>
                <div className="about__img-2">
                    <img src="./img/2.png" alt="nurse"></img>
                </div>
                <div className="about__img-3">
                <img src="./img/3.png" alt="nurse"></img>
                </div>
                <div className="about__info-wrapper">
                    <div className="about__info-text">
                        <h2>{t('about.team')}</h2>
                        <p>{t('about.text')}</p>
                    </div>
                    <img src="./img/big4.png" alt="anest"></img>
                </div>
            </div>
        </div>
    )
}

export default About;