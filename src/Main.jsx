import React, { useEffect , useState } from 'react'
import './App.css'
import Recipie from './Recipie';

const Main = () => {

// const APP_ID = 'b8366f5b';
// const APP_KEY = 'fd74d7108fd653cbac48cc96fb408ba7';
// const exampleReq = 'https://api.edamam.com/api/recipes/v2'
// `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY }`
// https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY }

const [recipes , setRecipies] = useState([]);
const [search , setSearch] = useState('');
const [query, setquery] =useState('chicken')

useEffect(()=>{
getRecipies();

}, [query])

const getRecipies = async ()=>{
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=b8366f5b&app_key=fd74d7108fd653cbac48cc96fb408ba7`)
const data = await response .json();
setRecipies(data.hits)
}


const updateSearch = e=>{
  setSearch(e.target.value)
}

const getsearch = e =>{
  e.preventDefault();
  setquery(search)
  setSearch('')
}

  return (
    <div className='App'>
      <form onSubmit={getsearch} className="search-form">
        <input type="text" className='search-bar' value={(search)} onChange={updateSearch}/>
        <button  className='search-button' type='submit'>Submit</button>

      </form>
<div className="main">
      <div className='recipes'>
      {recipes.map((recipe)=>(
        <Recipie 
        key={recipe.recipe.label}
        title ={recipe.recipe.label} calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      </div>
    </div>
  )
}

export default  Main;