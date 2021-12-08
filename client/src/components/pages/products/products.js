import React, { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import axios from 'axios'
import "./products.css";
import { useTranslation } from 'react-i18next'

const Products = () => {

  const { t } = useTranslation()
  const [drugs, setDrugs] = useState([])
  const [loading, setLoading] = useState(true)
  const {lang} = useSelector(state => state.userToken)


  useEffect(() => {
    setLoading(true)
    axios.get('/api/drug/all')
      .then(response => {
        setLoading(false)
        setDrugs(response.data.sortDrug)
      }).catch(err => {
        console.log(err);
      })
  }, [])

  console.log(drugs);

  return (
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
      <Link to="/allProducts" className="news__more">
        {t('product.ko')}
      </Link>
    </div>
  );
};

export default Products;
