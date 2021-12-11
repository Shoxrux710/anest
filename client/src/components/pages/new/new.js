import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './new.css';

const New = () => {

  const { t } = useTranslation()
  const [newOne, setNewOne] = useState({})
  const [newTwo, setNewTwo] = useState([])
  const [newThree, setNewThree] = useState([])
  const [skip, setSkip] = useState(3)
  const [count, setCount] = useState(0)
  const { lang } = useSelector(state => state.userToken)

  const anestOne = () => {
    axios.get('/api/news/limit')
      .then(response => {
        setNewOne(response.data.newsOne)
        setCount(response.data.newsCount)
      })
  }

  const anestTwo = () => {
    axios.get('/api/news/limit')
      .then(response => {
        setNewTwo(response.data.newsTwo)
      })
  }

  const anestThree = (skip) => {
    axios.get(`/api/news/limit?skip=${skip}&limit=4`)
      .then(response => {
        setNewThree([...newThree, ...response.data.newsThree])
      })
  }

  useEffect(() => {
    anestOne()
    anestTwo()
    anestThree(skip)
  }, [skip])

  const title = newOne[0] ? newOne[0].title[lang] : ''
  const imagesNews = newOne[0] ? newOne[0].imageNews.fileUrl : ''
  const idOne = newOne[0] ? newOne[0]._id : ''
  const description = newOne[0] ? newOne[0].description[lang] : ''

  let descriptionContinue1 = '';
  let continueText1 = '';

  for (let i = 0; i < description.length; i++) {
    
    if (i < 70){
      descriptionContinue1 += description[i]
    }else{
      continueText1 = '...'
      break
    }
    
  }

  const nextOne = () => {
    setSkip(skip + 4)
  }


  const show = (newThree.length === count) ? true : false


  return (
    <div className="new">
      <div className="container new__wrapper">
        <h2 className="title">{t('news.title')}</h2>
        <div className="new__info">
          <div className="new__info-left">
            <Link to={`/newinfo/${idOne}`}>
              <div
                className="new__item"
                style={{ backgroundImage: `url('${imagesNews}')` }}
              >
                <ul className="new__item-list">
                  <h4>{title}</h4>
                  <li>
                    {descriptionContinue1}{continueText1}
                  </li>
                </ul>
              </div>
            </Link>
          </div>
          <div className="new__info-right">
            {
              newTwo.map((items, index) => {
                let descriptionContinue = '';
                let continueText = '';

                for (let i = 0; i < items.description[lang].length; i++) {
                  if (i < 130) {
                    descriptionContinue += items.description[lang][i];
                  } else {
                    continueText = '...';
                    break;
                  }
                }
                return (
                  <Link to={`/newinfo/${idOne}`} key={index}>
                    <div className="new__info-item" key={items._id}>
                      <div className="new-info-item-img">
                        <img src={`/news/${items.imageNews.fileName}`} alt="noname"></img>
                      </div>
                      <div className="new__item-text">
                        <div className="random-item-info newid">
                          <div className="random-item-data">
                            <MdDateRange />
                            <p>{items.date.substring(0, 10)}</p>
                            <BsEyeFill />
                            <p>{items.view}</p>
                          </div>
                          <h4>{items.title[lang]}</h4>
                          <li>
                            {descriptionContinue}{continueText}
                          </li>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className="new__cotalog">
          {
            newThree.map((items, index) => {
              let descriptionContinue = '';
              let continueText = '';

              for (let i = 0; i < items.description[lang].length; i++) {
                if (i < 20) {
                  descriptionContinue += items.description[lang][i];
                } else {
                  continueText = '...';
                  break;
                }
              }
              return (
                <Link to={`/newinfo/${items._id}`} key={index} >
                  <div
                    className="new__catalog-item"
                    style={{ backgroundImage: `url('/news/${items.imageNews.fileName}')` }}
                  >
                    <ul className="new__catalog-list" key={items._id}>
                      <h4>{items.title[lang]}</h4>
                      <li>
                        {items.description[lang]}
                        {descriptionContinue}{continueText}
                      </li>
                    </ul>
                  </div>
                </Link>
              )
            })
          }
        </div>
        <div className={show ? 'news_add active' : 'news_add'}>
          <button
            className="add_news"
            onClick={() => nextOne()}
          >{t('news.add')}</button>
        </div>
      </div>
    </div>
  )
}

export default New;