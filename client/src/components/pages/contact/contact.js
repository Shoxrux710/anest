import React, { useState, useEffect } from "react";
import { MdLocationOn } from 'react-icons/md';
import { MdCall } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import './contact.css';

const Contact = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [description, setDescription] = useState('')
    const { t } = useTranslation()

    const telegramBot = (e) => {
        e.preventDefault()

        const user = {
            name,
            phone,
            description
        }
        axios.post('/api/news/telegram', user)
              .then(response => {
                setName("")
                setPhone("")
                setDescription("")
                toast.success(response.data.successMessage)
              }).catch((err) => {
                toast.error(err.response.data.errorMessage)
            })  
    }

    return(
        <div className="container contact">
            <h2 className="title">Kontact</h2>
            <div className="contact__wrapper">
                <div className="contact__map">
                    <div className="contact__map-info">
                        <h3>{t('navbar.contact')}</h3>
                        <ul className="contact__info-wrapper">
                            <li className="contact__info-item">
                                <div>
                                    <MdLocationOn/>
                                    <h4>{t('contact.address')}</h4>
                                </div>
                                <p>Yunusobod, Yangi Shahar ko'chasi г. Ташкен</p>
                            </li>
                            <li className="contact__info-item">
                                <div>
                                    <HiOutlineMail/>
                                    <h4>E-mail</h4>
                                </div>
                                <p>Anest_company@mail.ru</p>
                            </li>
                            <li className="contact__info-item">
                                <div>
                                    <MdCall/>
                                    <h4>Call-center</h4>
                                </div>
                                <p>+998(71) 200-08-05</p>
                                <p>+998(71) 200-08-05</p>
                            </li>
                        </ul>
                    </div>
                    <div className="contact__map-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11977.487371238694!2d69.2943227!3d41.3660053!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7a39c718173c6e6e!2sDORA%20LINE%20-%20Pharmaceutical%20Company!5e0!3m2!1sru!2s!4v1634235146588!5m2!1sru!2s"></iframe>
                        </div>
                </div>
                <form 
                onSubmit={telegramBot}
                className="contact__form">
                    <div className="contact__form-top">
                        <input 
                        className="form__input" 
                        type="text" placeholder="Ism, Familiya"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <input 
                        className="form__input" 
                        type="num" placeholder="Telefon raqam"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="contact__form-bottom">
                        <textarea 
                        className="form__textarea" 
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="contact__form-link">{t('contact.send')}</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;