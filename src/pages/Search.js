import useFetchAndLocalStorage from '../custom-hooks/useFetchAndLocalStorage';
import RecipeCardList from '../components/RecipeCardList';
import {useParams} from 'react-router-dom';

const Search = () => {


    const apiURL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=441b9454444143fe846dd59f4a0b3bad'
    const params = useParams().keyword;

    const {data, displayError, isFetching} = useFetchAndLocalStorage(`${apiURL}&query=${params}`, false);

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

    return (
        <section className="recipes-section">
            <h1 style={{fontSize:"1.3125em"}}>Search results from '{params}'</h1>
            {/* checks if these values are empty or not */}
            {displayError && <p>{displayError}</p>}
            {isFetching && <p>Loading...</p>}
            {dataResult}
        </section>
    )
}

export default Search