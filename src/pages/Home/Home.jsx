import React from 'react'
import Header from '../../componensts/Header/Header';
import ExploreMenu from '../../componensts/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../componensts/FoodDisplay/FoodDisplay';
import { useState } from 'react';

const Home = () => {
  const [category,setCategory] = useState('All');
  return (
    
    <main className='container'>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default Home;