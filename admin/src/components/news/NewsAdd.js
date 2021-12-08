import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const NewsAdd = () => {

    const {token} = useSelector(state => state.userLogin)

    const [titleUz, setTitleUz] = useState("")
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [descriptionUz, setDescriptionUz] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [imageNews, setImageNews] = useState(null)

    const history = useHistory()


    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        axios.post("/api/news/all", formData, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTitleUz("")
                setTitleRu("")
                setTitleEn("")
                setDescriptionUz("")
                setDescriptionRu("")
                setDescriptionEn("")
                setImageNews(null)

                toast.success(response.data.successMessage)
                history.push('/admin/news')
            })
            .catch((err) => {
                toast.error(err.response.data.errorMessage)
            })

    }


    return (
        <div className="news">
            <Container>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <div className="group">
                            <label>Title:Uz</label>
                            <input
                                type="text"
                                name="titleUz"
                                className="form-control"
                                value={titleUz}
                                onChange={(e) => setTitleUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Title:Ru</label>
                            <input
                                type="text"
                                name="titleRu"
                                className="form-control"
                                value={titleRu}
                                onChange={(e) => setTitleRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Title:En</label>
                            <input
                                type="text"
                                name="titleEn"
                                className="form-control"
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="group">
                            <label>Description:Uz</label>
                            <textarea
                                type="text"
                                name="descriptionUz"
                                className="form-control"
                                value={descriptionUz}
                                onChange={(e) => setDescriptionUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Description:Ru</label>
                            <textarea
                                type="text"
                                name="descriptionRu"
                                className="form-control"
                                value={descriptionRu}
                                onChange={(e) => setDescriptionRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Description:En</label>
                            <textarea
                                type="text"
                                name="descriptionEn"
                                className="form-control"
                                value={descriptionEn}
                                onChange={(e) => setDescriptionEn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-file">
                        <input
                            type="file"
                            className="form-control"
                            name="imageNews"
                            files={imageNews}
                            onChange={(e) => setImageNews(e.target.files)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success"
                    >addProduct</button>
                </form>

            </Container>
        </div>
    )
}

export default NewsAdd
