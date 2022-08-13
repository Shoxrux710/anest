import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import { toast } from 'react-toastify'


const Register = () => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")



    const Submit = (e) => {
        e.preventDefault()
        const message = {
            name,
            surname,
            login,
            password,
            confirm
        }
        axios.post("/api/user/register", message)
            .then(response => {
                setName("")
                setLogin("")
                setPassword("")
                setConfirm("")
                setSurname("")
                toast.success(response.data.successMessage)
            }).catch(err => {
                toast.error(err.response.data.errorMessage)
            })
    }


    return (
        <div className="login">
            <Container>
                <Row>
                    <Col className="form-auto" lg={5}>
                        <form onSubmit={Submit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    placeholder="Confirm"
                                    className="form-control"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                            </div>
                            <div className="button">
                                <button type="submit" className="btn btn-success">register</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register
