import React, { useContext } from 'react'
import '../../styles/admin.css'



export default function AdminData({ email, book }) {

    console.log(email, book);


    return (
        <div className="each">
            <h4 className='email' ><span>Email: </span> {email}</h4>
            <div className="form">
                <h5><span>Title: </span> {book.title}</h5>
                <h6><span>Author: </span> {book.author}</h6>
            </div>
        </div>
    )
}
