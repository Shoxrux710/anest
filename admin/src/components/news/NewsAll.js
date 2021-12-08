import React, {useState, useEffect} from 'react'
import axios from 'axios'
import News from './News'

const NewsAll = () => {

    const [skip, setSkip] = useState(0)
    const [drug, setDrug] = useState([])
    const [count, setCount] = useState([])
    const [loading, setLoading] = useState(true)

    const drugProduct = (skip) => {
        setLoading(true)
        axios.get(`/api/news/all?skip=${skip}&limit=5`)
        .then(response => {
            setDrug(response.data.news)
            setCount(response.data.newsCount)
            setLoading(false)
        }) 
    }

    useEffect(() => {
        drugProduct(skip)
    }, [skip])

    return (
        <div>
            <News
            skip={skip}
            drug={drug}
            count={count}
            loading={loading}
            setSkip={setSkip}
            drugProduct={drugProduct}
            />
        </div>
    )
}

export default NewsAll
