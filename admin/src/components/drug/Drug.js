import React, {useState} from 'react'
import { Container, Table } from 'react-bootstrap';
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import axios from 'axios'

const Drug = (props) => {


    const {token} = useSelector(state => state.userLogin)
    const {drugs, loading, setSkip, count, drugsProduct, skip} = props
    const [current, setCurrent] = useState(1)

    const onChange = page => {
        setCurrent(page);
        setSkip((page - 1) * 5);
    };

    const onDelete = (id) => {
        axios.delete(`/api/drug/delete/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
              .then(response => {
                toast.success(response.data.seccess)
                drugsProduct(skip)
              })
              .catch(err => {
                toast.error(err.response.data.errorMessage)
              })  
    }

    return (
        <div className="new">
            <Container>
            <Link to="/admin/addrug" className="btn btn-success">add Product</Link>
            <Table striped bordered variant="dark" className="table" >
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Nomi</th>
                            <th>Tavsifi</th>
                            <th>delete & update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (
                                <tr>
                                    <td className="loading">Loading...</td>
                                </tr>
                            ) :
                                <>
                                    {drugs.map((item, index) => {
                                                   let description = '';
                                                   let continueText = '';
           
                                                   for (let i = 0; i < item.description.uz.length; i++) {
                                                       if (i < 40) {
                                                           description += item.description.uz[i];
                                                       } else {
                                                           continueText = '...';
                                                           break;
                                                       }
                                                   }
                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.title.uz}</td>
                                                <td>{description}{continueText}</td>
                                                <td className="delete_item">
                                                    <div  className="btn btn-danger"
                                                     onClick={() => onDelete(item._id)}
                                                    >
                                                        delete
                                                    </div>
                                                    <Link to={`/admin/drugupdate/${item._id}`}  className="btn btn-primary">
                                                        update
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                        }
                    </tbody>
                </Table>
                <Pagination 
                current={current} 
                defaultPageSize={5} 
                onChange={onChange} 
                total={count} />
            </Container>
        </div>
    )
}

export default Drug
