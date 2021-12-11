import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import {useSelector} from 'react-redux'

import "./news.css";

const News = () => {

  const { t } = useTranslation()
  const {lang} = useSelector(state => state.userToken)

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/news/all')
      .then(response => {
        setLoading(false)
        setNews(response.data.newsFour)
      }).catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div className="news">
      <div className="news__div">
        <div className="container title__wrapper">
          <h2 className="title">{t('navbar.news')}</h2>
        </div>
        <div className="container news__wrapper">
          {
            loading ? <div className="loading">loading...</div> :
            news.map((items, index) => {
              let descriptionContinue = '';
                let continueText = '';

                for (let i = 0; i < items.description[lang].length; i++) {
                  if (i < 60) {
                    descriptionContinue += items.description[lang][i];
                  } else {
                    continueText = '...';
                    break;
                  }
                }
              return (
                <Link to={`/newinfo/${items._id}`} key={index}>
                <div 
                className="news__item"
                 key={items._id}
                 style={{ backgroundImage: `url('${items.imageNews.fileUrl}')` }}
                 >
                  <div className="news__item-img"                  
                  >
                  </div>
                  <ul className="news__item-list">
                    <h4>{items.title[lang]}</h4>
                      <li>
                      {descriptionContinue}{continueText}
                    </li>
                  </ul>
                </div>
                    </Link>
              )
            })
          }

        </div>
        <Link to="/new" className="news__more">
          {t('product.ko')}
        </Link>
      </div>

    </div>
  );
};

export default News;
