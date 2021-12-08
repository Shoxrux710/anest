import React, {useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import {userProfile} from './redux/action/userAction'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const Submit = async (e) => {
        e.preventDefault()
        try {
            const user = {
                login,
                password
            }
            const res = await axios.post("/api/user/login", user)
                dispatch(userProfile(res.data))
                toast.success(res.data.msg)
        }catch (err) {
            toast.error(err.response.data.errorMessage)
        }
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="button">
                                <button type="submit" className="btn btn-success">login</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
