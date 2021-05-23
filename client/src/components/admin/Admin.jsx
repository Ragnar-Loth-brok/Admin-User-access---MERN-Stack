import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminData from './AdminData'
import '../../styles/admin.css'


export default function Admin() {
    
    const [ data, setData ] = useState();



    useEffect( async () => {
        const res = await axios({
            url: 'https://a1f860e56fc6.ngrok.io/form', 
            method: 'get',
            params: {
                email: 'abc@admin.com'
            }
        })
        if(res.data.length > 0) setData(res.data);
    }, [])

    return (
        <div className='admin'>
            <div className="content">
                <h1>Staff Data</h1>
                <div className='data' >
                    {
                        data ? 
                        data.map(item => ( <AdminData email={item.email} book={item.book} key={item._id} /> ))
                        : <h1 className='empty' >Empty data</h1>
                    }
                </div>                
            </div>
        </div>

        
            
        )
}
