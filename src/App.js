import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import GifsList from './components/GifsList';
import gifService from './api/gifService';

const App = () => {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [searchGifs, setSearchGifs] = useState(localStorage.getItem("searchGifResults") ? JSON.parse(localStorage.getItem("searchGifResults")) : []);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") ? localStorage.getItem("searchTerm") : '',);
  const [noResults, setNoResults] = useState(false);

  //Initialize App by fetching Trending Gifs and dispay them!
  useEffect(() => {
    async function fetchTrendingGifs() {
      try {
        const { data: gifsData } = await gifService.getTrendinGifs();
        setTrendingGifs(gifsData.data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchTrendingGifs();
  }, []);

  //When searchTerm changes, update localStorage
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm)
  }, [searchTerm]);

  //When searchGifs change, update localStorage and check is there are results
  useEffect(() => {
    localStorage.setItem("searchGifResults", JSON.stringify(searchGifs))
    searchGifs.length === 0 && searchTerm ?
      setNoResults(true)
      : setNoResults(false)
  }, [searchGifs]);

  //Start searching Gifs by search Input
  const searchForGifs = (searchInput) => {
    setSearchTerm(searchInput)
    if(!searchInput){
      setSearchGifs([])
    } else {
      fetchGifs(searchInput);
    }
  };

  //Fetch gid from API and update state
  async function fetchGifs(searchTerm) {
    try {
      const { data: gifsData } = await gifService.searchGifs(searchTerm);
      setSearchGifs(gifsData.data)
    } catch (e) {
      console.log(e)
    }
  }

  //Check which array (trending or search results) is displaying and delete gif by ID
  const deleteGif = (gifID) => {
    searchGifs.length > 0 ? 
      setSearchGifs([...searchGifs.slice(0, gifID), ...searchGifs.slice(gifID + 1)]) 
      :
      setTrendingGifs([...trendingGifs.slice(0, gifID), ...trendingGifs.slice(gifID + 1)]) 
  }

  //Initialize Search
  const clearSearch = () => {
    setSearchTerm('')
    setSearchGifs([])
  }

  //Chech if there are searh results. If not, display Trending Gifs.
  const gifsList = searchGifs.length > 0 ? searchGifs : trendingGifs

  return (
    <div className="search">
      <h1>Find your Gif!</h1>
      <SearchForm searchTerm={searchTerm} searchForGifs={searchForGifs} clearSearch={clearSearch} />
      { noResults ?
        <div className="search__no-results">
          <h4>Ooops, no results :( </h4>
          <div className="search__no-results__gif"
            style={{  
              backgroundImage: "url('https://media1.giphy.com/media/fV8iuSEwLQ6005diSh/giphy-preview.gif?cid=a04f008540189dfd4a58986f58fbfb9343e3c5dd7d1159c4&rid=giphy-preview.gif')"
            }}> 
          </div>        
        </div>
        :
        <GifsList deleteGif={deleteGif} gifsList={gifsList} />
      }
    </div>
  );
}

export default App