import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const DrugUpdate = (props) => {


    const {token} = useSelector(state => state.userLogin)
    const [titleUz, setTitleUz] = useState("")
    const [titleRu, setTitleRu] = useState("")
    const [titleEn, setTitleEn] = useState("")
    const [descriptionUz, setDescriptionUz] = useState("")
    const [descriptionRu, setDescriptionRu] = useState("")
    const [descriptionEn, setDescriptionEn] = useState("")
    const [usedUz, setUsedUz] = useState("")
    const [usedRu, setUsedRu] = useState("")
    const [usedEn, setUsedEn] = useState("")
    const [structureUz, setStructureUz] = useState("")
    const [structureRu, setStructureRu] = useState("")
    const [structureEn, setStructureEn] = useState("")
    const [imageDrug, setImageDrug] = useState(null)

    const history = useHistory()

    useEffect(() => {
        axios.get(`/api/drug/all/${props.match.params.id}`)
              .then(response => {
                  const 
                  {title, description, used, structure}
                   = response.data.oneDrug
                  setTitleUz(title.uz)
                  setTitleRu(title.ru)
                  setTitleEn(title.en)
                  setDescriptionUz(description.uz)
                  setDescriptionRu(description.ru)
                  setDescriptionEn(description.en)
                  setUsedUz(used.uz)
                  setUsedRu(used.ru)
                  setUsedEn(used.en)
                  setStructureUz(structure.uz)
                  setStructureRu(structure.ru)
                  setStructureEn(structure.en)
              })  

    }, [props.match.params.id])


    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)

        axios.put(`/api/drug/update/${props.match.params.id}`, formData, {
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
                setUsedUz("")
                setUsedRu("")
                setUsedEn("")
                setStructureUz("")
                setStructureRu("")
                setStructureEn("")
                setImageDrug(null)

                toast.success(response.data.successMessage)
                history.push('/admin/drug')
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
                            <label>Nomi:Uz</label>
                            <input
                                type="text"
                                name="titleUz"
                                className="form-control"
                                value={titleUz}
                                onChange={(e) => setTitleUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Nomi:Ru</label>
                            <input
                                type="text"
                                name="titleRu"
                                className="form-control"
                                value={titleRu}
                                onChange={(e) => setTitleRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Nomi:En</label>
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
                            <label>Mahsulot tarkibi:Uz</label>
                            <textarea
                                type="text"
                                name="structureUz"
                                className="form-control"
                                value={structureUz}
                                onChange={(e) => setStructureUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Mahsulot tarkibi:Ru</label>
                            <textarea
                                type="text"
                                name="structureRu"
                                className="form-control"
                                value={structureRu}
                                onChange={(e) => setStructureRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Mahsulot tarkibi:En</label>
                            <textarea
                                type="text"
                                name="structureEn"
                                className="form-control"
                                value={structureEn}
                                onChange={(e) => setStructureEn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group">
                            <label>Tavsif:Uz</label>
                            <textarea
                                type="text"
                                name="descriptionUz"
                                className="form-control"
                                value={descriptionUz}
                                onChange={(e) => setDescriptionUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Tavsif:Ru</label>
                            <textarea
                                type="text"
                                name="descriptionRu"
                                className="form-control"
                                value={descriptionRu}
                                onChange={(e) => setDescriptionRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Tavsif:En</label>
                            <textarea
                                type="text"
                                name="descriptionEn"
                                className="form-control"
                                value={descriptionEn}
                                onChange={(e) => setDescriptionEn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="group">
                            <label>Ishlatilishi:Uz</label>
                            <textarea
                                type="text"
                                name="usedUz"
                                className="form-control"
                                value={usedUz}
                                onChange={(e) => setUsedUz(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Ishlatilishi:Ru</label>
                            <textarea
                                type="text"
                                name="usedRu"
                                className="form-control"
                                value={usedRu}
                                onChange={(e) => setUsedRu(e.target.value)}
                            />
                        </div>
                        <div className="group">
                            <label>Ishlatilishi:En</label>
                            <textarea
                                type="text"
                                name="usedEn"
                                className="form-control"
                                value={usedEn}
                                onChange={(e) => setUsedEn(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-file">
                    <label>Images</label>
                        <input
                            type="file"
                            className="form-control"
                            name="imageDrug"
                            files={imageDrug}
                            onChange={(e) => setImageDrug(e.target.files)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-success"
                    >update</button>
                </form>
            </Container>
        </div>
    )
}

export default DrugUpdate
