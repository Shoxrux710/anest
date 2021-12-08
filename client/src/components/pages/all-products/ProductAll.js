import React, { useState, useEffect } from 'react'
import AllProducts from './allProducts'
import "./allProducts.css";
import axios from 'axios'

const ProductAll = () => {

    const [allFour, setAllFour] = useState([])
    const [skip, setSkip] = useState(0)
    const [count, setCount] = useState(0)

    const allDrugs = (skip) => {
        axios.get(`/api/drug/all?skip=${skip}&limit=4`)
            .then(response => {
                setAllFour([...allFour, ...response.data.drug])
                setCount(response.data.drugCount)
            })
    }

    const nextOne = () => {
        setSkip(skip + 4)
    }

    useEffect(() => {
        allDrugs(skip)
    }, [skip])

    const show = (count === allFour.length) ? true : false


    return (
        <div>
            <AllProducts 
            allFour={allFour}
            nextOne={nextOne}
            show={show}
            count={count}
            />
        </div>
    )
}

export default ProductAll
