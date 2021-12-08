import React, {useState} from 'react'
import { Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const News = (props) => {

    const {token} = useSelector(state => state.userLogin)

    const {drug, count, skip, setSkip, loading, drugProduct} = props
    const [current, setCurrent] = useState(1)

    const onChange = page => {
        setCurrent(page);
        setSkip((page - 1) * 5);
    };

    const onDelete = (id) => {
        axios.delete(`/api/news/delete/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
              .then(response => {
                toast.success(response.data.seccess)
                drugProduct(skip)
              })  
              .catch(err => {
                toast.error(err.response.data.errorMessage)
              })
    }

    return (
        <div className="new">
            <Container>
             <Link to="/admin/addnews" className="btn btn-success">add Product</Link>
             <Table striped bordered variant="dark" className="table" >
                    <thead>
                        <tr>
                            <th>N</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Data</th>
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
                                    {drug.map((item, index) => {
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
                                                <td>{item.date.substring(0,10)}</td>
                                                <td className="delete_item">
                                                    <div  className="btn btn-danger"
                                                     onClick={() => onDelete(item._id)}
                                                    >
                                                        delete
                                                    </div>
                                                    <Link to={`/admin/update/${item._id}`}  className="btn btn-primary">
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

export default News
