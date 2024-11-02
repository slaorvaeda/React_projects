import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../compoents/BackButton'
import Spinner from '../compoents/Spinner'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();



  const handleDeleteBook = () => {

    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-8 mx-auto">

        <h3 className='text-2xl'>Are you sure want to delete book?</h3>

        <button
          className="p-2 m-4 bg-red-800 text-white text-2xl rounded-md"
          onClick={handleDeleteBook}
        >
          yes, I Delete it.
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
