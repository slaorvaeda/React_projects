import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackButton from '../compoents/BackButton'
import Spinner from '../compoents/Spinner'


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`,{timeout :5000})
      .then((res) => {
        setLoading(false);
        setAuthor(res.data.data.author);
        setPublishYear(res.data.data.publishYear);
        setTitle(res.data.data.title);
      })
      .catch((error) => {
        setLoading(false);
        alert("Error fetching data! Check your console.");
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
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
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-sky-600 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full'
          />
        </div>

        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full'
          />
        </div>

        <div className="my-4">
          <label htmlFor="publishYear" className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            name="publishYear"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full'
          />
        </div>

        <button
          className="p-2 m-2 bg-sky-400 text-white text-2xl"
          onClick={handleEditBook}
        >
          Edit me
        </button>
      </div>
    </div>
  );
};

export default EditBook;
