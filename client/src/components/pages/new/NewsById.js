import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDateRange } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import axios from 'axios';
import "./newsById.css";
import {useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'

const NewsById = (props) => {

  const { t } = useTranslation()
  const [newsId, setNewsId] = useState({})
  const [newsRandom, setNewsRandom] = useState([])
  const [view, setView] = useState(0)
  const {lang} = useSelector(state => state.userToken)

  const productId = (id) => {
    axios.get(`/api/news/all/${id}`)
      .then(response => {
        setNewsId(response.data.oneNews)
      })
  }

  const productRandom = () => {
    axios.get(`/api/news/random`)
      .then(response => {
        setNewsRandom(response.data.news)
      })
  }

  const viewNews = (id) => {
    axios.put(`/api/news/view/${id}`)
          .then(response => {
            setView(response.data.view)
          })
  }

  const title = newsId.title ? newsId.title[lang] : ''
  const description = newsId.description ? newsId.description[lang] : ''
  const imageNews = newsId.imageNews ? newsId.imageNews.fileName : ''
  const date = newsId.date ? newsId.date : ''

  useEffect(() => {
    productRandom()
    productId(props.match.params.id)
    viewNews(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="new-info">
      <div className="container">
        <h3 className="title">{t('news.title')}</h3>
        <div className="new-info__wrapper">
          <div className="more-new">
            <div className="more-new-img">
              <img src={`/news/${imageNews}`} alt="new"></img>
            </div>
            <div className="more-new__text">
            <div className="random-item-info newid">
                        <h3>{title}<div className="random-item-data">
                          <MdDateRange/>
                          <p>{date.substring(0, 10)}</p>
                          <BsEyeFill/>
                          <p>{view}</p>
                        </div></h3>

                        <p>
                {description}
              </p>
                      </div>
            </div>
          </div>
          <div className="random-news">
            <div className="random-news-item-wrapper">
              {
                newsRandom.map((items, index) => {
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
                        <Link to={`/newinfo/${items._id}`} key={index} >
                    <div className="random-news-item" key={items._id}>
                      <div className="random-item-wrapper">
                        <div className="random-item-wrapper-img">
                      <img src={`/news/${items.imageNews.fileName}`} alt="new"></img>

                        </div>
                      <div className="random-item-info">
                        <div className="random-item-data">
                          <MdDateRange/>
                          <p>{items.date.substring(0, 10)}</p>
                          <BsEyeFill/>
                          <p>{items.view}</p>
                        </div>
                      <div className="random-item-text">
                          <p>
                            {descriptionContinue}{continueText}
                          </p>
                      </div>

                      </div>
                      </div>
                    </div>
                        </Link>
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsById;
