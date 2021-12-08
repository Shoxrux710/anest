import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import "./newsById.css";
import {useSelector} from 'react-redux'

const NewsById = (props) => {

  const [newsId, setNewsId] = useState({})
  const [newsRandom, setNewsRandom] = useState([])
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

  const title = newsId.title ? newsId.title[lang] : ''
  const description = newsId.description ? newsId.description[lang] : ''
  const view = newsId.view ? newsId.view : ''
  const imageNews = newsId.imageNews ? newsId.imageNews.fileName : ''
  const date = newsId.date ? newsId.date : ''

  useEffect(() => {
    productRandom()
    productId(props.match.params.id)
  }, [props.match.params.id])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="new-info">
      <div className="container">
        <h3 className="title">Yangiliklar</h3>
        <div className="new-info__wrapper">
          <div className="more-new">
            <div className="more-new-img">
              <img src={`/news/${imageNews}`} alt="new"></img>
            </div>
            <div className="more-new__text">
              <h3>{title}</h3>
              <p>
                {description}
              </p>
            </div>
          </div>
          <div className="random-news">
            <div className="random-news-item-wrapper">
              {
                newsRandom.map(items => {
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
                    <div className="random-news-item" key={items._id}>
                      <div clasname="random-item-wrapper">
                      <img src={`/news/${items.imageNews.fileName}`} alt="new"></img>

                      <div className="random-item-text">
                        <Link to={`/newinfo/${items._id}`}>
                          <p>
                            {descriptionContinue}{continueText}
                          </p>
                        </Link>
                      </div>
                      </div>
                    </div>
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
