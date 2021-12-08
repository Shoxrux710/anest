import React from 'react'
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const AllProducts = (props) => {

  const { allFour, show, nextOne, count } = props
  const {lang} = useSelector(state => state.userToken)

  return (
    <div className="container products">
      <h3 className="title">Mahsulotlar</h3>
      <div className="container products__wrapper">
        {
          count === 0 ? <div className="loading">loading</div> :
          allFour.map(items => {

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
                  <img src={`/drug/${items.imageDrug.fileName}`} alt=""></img>
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
      <div 
      className={show ? 'news__more active': 'news__more'} >
        <button
        onClick={() => nextOne()}
        >allProducts</button>
      </div>
    </div>
  );
};

export default AllProducts;
