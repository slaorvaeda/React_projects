import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../compoents/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BookTable from '../compoents/home/BookTable';
import BookCard from '../compoents/home/BookCard';


const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType,setShowType] =useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []); // Add empty dependency array to run useEffect only on component mount

    return (
        <div className='p-4'>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
            <div className="flex justify-center item-center gap-x-4">
                <button className='bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg' onClick={()=>setShowType('table')}>Table</button>
                <button className='bg-sky-300 hover:bg-sky-500 px-4 py-1 rounded-lg'onClick={()=>setShowType('card')}>Card</button>
            </div>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {
                loading ? ( <Spinner />) : showType === 'table' ? (<BookTable books={books} />): (<BookCard books={books} />)
            }
        </div>
    );
};

export default Home;
