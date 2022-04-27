import useFetchAndLocalStorage from '../custom-hooks/useFetchAndLocalStorage';
import RecipeCardList from './RecipeCardList';

function Browse({title, url, toggleCategory}){

    const {data, displayError, isFetching} = useFetchAndLocalStorage(url, false);

    let dataResult;
    if (data !== null){
        if(data.hasOwnProperty('results')){
            if (data.results.length !== 0){
                dataResult = <RecipeCardList cards={data.results}/>
            }else{
                dataResult = <p>Oops... The recipe you're looking for isn't available.</p>
            }
        }else{
            dataResult = null
        }
        
    }else{
        dataResult = null
    }

    return(
        <section className="recipes-section">
            <button className="open-category" onClick={()=>toggleCategory()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="68" height="44" viewBox="0 0 68 44"><g transform="translate(-381 -200)"><path d="M62,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H62a3,3,0,0,1,3,3A3,3,0,0,1,62,3Z" transform="translate(384 203)" fill="#fff"/><path d="M48,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H48a3,3,0,0,1,3,3A3,3,0,0,1,48,3Z" transform="translate(391 222)" fill="#fff"/><path d="M62,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H62a3,3,0,0,1,3,3A3,3,0,0,1,62,3Z" transform="translate(384 241)" fill="#fff"/></g></svg>
            </button>
            <h1>{title}</h1>
            {/* checks if these values are empty or not */}
            {displayError && <p>{displayError}</p>}
            {isFetching && <p>Loading...</p>}
            {dataResult}
        </section>
        
        
    )
}

export default Browse