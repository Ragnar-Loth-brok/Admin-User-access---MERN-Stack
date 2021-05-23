import axios from 'axios';
import React, { useContext, useState } from 'react'
import { InfoContext } from '../../context/InfoContext';
import '../../styles/form.css'

export default function PostForm() {

    const { state } = useContext(InfoContext);

    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        if(title.trim().length < 1 || author.trim().length < 1) {
            console.log('Nothing');
            return { error : `Please fill all the fields` }
        }

        const res = await axios.post('https://6d2916f709b6.ngrok.io/form', {
            book: { title, author },
            email: state.email})
        if(res.data && res.data.error) {
            
            console.log(res.data.error);

        } else if (res.data && res.data.success) {
            console.log(res.data.success);
        }

        setTitle('');
        setAuthor('');
    }

    return (
        <div className='userForm'>
            <h1>Add Book</h1>
            <form onSubmit={ handleSubmit }>
                <input type="text" id="title" name="title" 
                    placeholder='Title of the Book'
                    value={title} 
                    onChange={event => setTitle(event.target.value) } 
                />
                <br/>
                <input type="text" id="author" name="author" 
                    placeholder='Author of the Book'
                    value={author} 
                    onChange={event => setAuthor(event.target.value) } 
                />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
