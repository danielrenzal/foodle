import useFetchAndLocalStorage from '../custom-hooks/useFetchAndLocalStorage';
import RecipeCardList from './RecipeCardList';
import {useEffect} from 'react';

function Discover({title, toggleCategory}){

    const {data, displayError, isFetching} = useFetchAndLocalStorage('https://api.spoonacular.com/recipes/random?number=50&apiKey=441b9454444143fe846dd59f4a0b3bad', true);

    useEffect(()=>{
        const today = new Date();
        const currentDate = today.getDate().toString();

        const yesterday = localStorage.getItem("date")

        if(yesterday){
            if(yesterday !== currentDate){
                localStorage.removeItem("discover")
                localStorage.setItem("date", currentDate);
            }
        }else{
            localStorage.setItem("date", currentDate);
        }
    },[])

    return(
        <section className="recipes-section">
            <button className="open-category" onClick={()=>toggleCategory()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="44" viewBox="0 0 68 44"><g transform="translate(-381 -200)"><path d="M62,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H62a3,3,0,0,1,3,3A3,3,0,0,1,62,3Z" transform="translate(384 203)" fill="#fff"/><path d="M48,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H48a3,3,0,0,1,3,3A3,3,0,0,1,48,3Z" transform="translate(391 222)" fill="#fff"/><path d="M62,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H62a3,3,0,0,1,3,3A3,3,0,0,1,62,3Z" transform="translate(384 241)" fill="#fff"/></g></svg>
            </button>
            <h1>{title}</h1>
            {/* checks if these values are empty or not */}
            {displayError && <p>{displayError}</p>}
            {isFetching && <p>Loading...</p>}
            {data && <RecipeCardList cards={data.recipes}/>}
        </section>
        
        
    )
}

export default Discover