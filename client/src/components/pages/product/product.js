import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import { AiFillHeart } from "react-icons/ai";
import {useSelector} from 'react-redux'

import "./product.css";

const Product = (props) => {

  const [productId, setProductId] = useState({})
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const {lang} = useSelector(state => state.userToken)
  const { t } = useTranslation()

  const drugId = (id) => {
    axios.get(`/api/drug/all/${id}`)
      .then(response => {
        setProductId(response.data.oneDrug)
      })
  }

  const used = productId.used ? productId.used[lang] : ''
  const title = productId.title ? productId.title[lang] : ''
  const structure = productId.structure ? productId.structure[lang] : ''
  const description = productId.description ? productId.description[lang] : ''
  const images = productId.imageDrug ? productId.imageDrug.fileName : ''

  useEffect(() => {
    axios.get('/api/drug/random')
      .then(response => {
        setLoading(false)
        setDrugs(response.data.drugs)
      })
    drugId(props.match.params.id)
  }, [props.match.params.id])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  return (
    <div className="product-about">
      <div className="container product">
        <h2 className="title">{t('product.about')}</h2>
        <div className="product__wrapper">
          <div className="product__wrapper-left">
            <img src={`/drug/${images}`} alt="dori"></img>
            <h3>{title}</h3>
          </div>
          <div className="product__wrapper-right">
            <ul className="product__right-list">
              <h4>{t('product.tarkib')}</h4>
              <li>
                {structure}
              </li>
            </ul>
            <ul className="product__right-list">
              <h4>{t('product.tav')}</h4>
              <li>
                {description}
              </li>
            </ul>
            <ul className="product__right-list">
              <h4>{t('product.ish')}</h4>
              <li>
                {used}
              </li>
            </ul>
            <Link className="product__right-link" to="/">
            {t('product.buy')}{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="container products">
        <h3 className="title">{t('navbar.products')}</h3>
        <div className="container products__wrapper">
          {
            loading ? <div className="loading">Loading</div> :
            drugs.map((items) => {

                let descriptionContinue = '';
                let continueText = '';

                for (let i = 0; i < items.description[lang].length; i++) {
                  if (i < 30) {
                    descriptionContinue += items.description[lang][i];
                  } else {
                    continueText = '...';
                    break;
                  }
                }

                return (
                    <Link to={`/product/${items._id}`}>
                  <div className="products__item" key={items._id}>
                    <div className="product-img">
                      <img src={`/drug/${items.imageDrug.fileName}`} alt="dori"></img>
                    </div>
                    <div className="products__item-title">
                      <h4>{items.title[lang]}</h4>
                      <AiFillHeart />
                    </div>
                      <div className="products__item-text">
                        <p>
                          {descriptionContinue}{continueText}
                        </p>
                      </div>
                  </div>
                    </Link>
                )
              })
          }
        </div>
      </div>
    </div>
  );
};

export default Product;
