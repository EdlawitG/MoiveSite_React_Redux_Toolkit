import React, { useEffect } from 'react'
import MoiveListing from '../MoiveListing/MovieListing.js'
import { useDispatch } from 'react-redux'
import { fetchAsyncMovies, fetchAsyncShow } from '../../features/Movies/movieSlice.js'
function Home() {
  const dispatch = useDispatch()

  const movieText = "Harry";
  const seriesText ="Friends"
  useEffect(()=>{
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncShow(seriesText))
  },[dispatch])
  return (
    <div>
      <div className="banner-img"></div>
      <MoiveListing/>
    </div>
  )
}

export default Home