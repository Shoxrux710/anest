import React, {useState, useEffect} from 'react'
import Drug from './Drug'
import axios from 'axios'

const Drugall = () => {

    const [skip, setSkip] = useState(0)
    const [drugs, setDrugs] = useState([])
    const [count, setCount] = useState([])
    const [loading, setLoading] = useState(true)

    const drugsProduct = (skip) => {
        setLoading(true)
        axios.get(`/api/drug/all?skip=${skip}&limit=5`)
              .then(response => {
                setDrugs(response.data.drug)
                setCount(response.data.drugCount)
                setLoading(false)
              })  
    }

    useEffect(() => {
        drugsProduct(skip)
    }, [skip])

    return (
        <div>
            <Drug
            setSkip={setSkip}
            drugs={drugs}
            count={count}
            loading={loading}
            skip={skip}
            drugsProduct={drugsProduct}
            />
        </div>
    )
}

export default Drugall
