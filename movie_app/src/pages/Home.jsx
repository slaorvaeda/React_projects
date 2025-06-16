import React, { useEffect, useState } from 'react';
import Slider from '../components/Slider';
import movieImg from '../assets/react.svg'; // fallback image

const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzM2YTUzYzI3MmZmMzZjZWQyYzMyM2JhODk3MTk0NSIsIm5iZiI6MTcyNTQ0NTI3MC44ODgsInN1YiI6IjY2ZDgzNDk2MjNiZDk2NWIwNTFhYjgzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LlAOUozfqQmqJWYc8yB0USEKQ_JTBj9_XVmu74siIEo';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const TV_URL = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(MOVIE_URL, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setMovies(
          data.results.map(item => ({
            id: item.id, // Make sure this line is present
            title: item.title,
            image: item.poster_path ? IMG_BASE + item.poster_path : movieImg,
          }))
        );
      });
    fetch(TV_URL, {
      headers: {
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setTvShows(
          data.results.map(item => ({
            id: item.id, // Make sure this line is present
            title: item.name,
            image: item.poster_path ? IMG_BASE + item.poster_path : movieImg,
          }))
        );
      });
  }, []);

  return (
    <div>
      <Slider title="Movies" items={movies} />
      <Slider title="TV Shows" items={tvShows} />
    </div>
  );
}

export default Home;