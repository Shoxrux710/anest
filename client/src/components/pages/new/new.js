import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux'

import './new.css';

const New = () => {

  const [newOne, setNewOne] = useState({})
  const [newTwo, setNewTwo] = useState([])
  const [newThree, setNewThree] = useState([])
  const [skip, setSkip] = useState(3)
  const {lang} = useSelector(state => state.userToken)

  const anestOne = () => {
    axios.get('/api/news/limit')
      .then(response => {
        setNewOne(response.data.newsOne)
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
        setNewThree(response.data.newsThree)
      })
  }

  useEffect(() => {
    anestOne()
    anestTwo()
    anestThree(skip)
  }, [skip])

  const title = newOne[0] ? newOne[0].title[lang] : ''
  const description = newOne[0] ? newOne[0].description[lang] : ''
  const imagesNews = newOne[0] ? newOne[0].imageNews.fileUrl : ''
  const idOne = newOne[0] ? newOne[0]._id : ''

  console.log(newOne);


  return (
    <div className="new">
      <div className="container new__wrapper">
        <h2 className="title">Yangiliklar</h2>
        <div className="new__info">
          <div className="new__info-left">
            <div
              className="new__item"
              style={{ backgroundImage: `url('${imagesNews}')` }}
            >
              <ul className="new__item-list">
                <h4>{title}</h4>
                <Link to={`/newinfo/${idOne}`}><li>
                  {description}
                </li></Link>
              </ul>
            </div>
          </div>
          <div className="new__info-right">
            {
              newTwo.map(items => {
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
                  <div className="new__info-item" key={items._id}>
                    <img src={`/news/${items.imageNews.fileName}`} alt="noname"></img>
                    <div className="new__item-text">
                      <h4>{items.title[lang]}</h4>
                      <Link to={`/newinfo/${idOne}`}><li>
                        {descriptionContinue}{continueText}
                      </li></Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="new__cotalog">
          {
            newThree.map(items => {
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
                <div
                  className="new__catalog-item"
                  style={{ backgroundImage: `url('${items.imageNews.fileUrl}')` }}
                >
                  <ul className="new__catalog-list">
                    <h4>{items.title[lang]}</h4>
                    <Link to={`/newinfo/${items._id}`}><li>
                      {descriptionContinue}{continueText}
                    </li></Link>
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default New;