import {useParams} from "react-router-dom"
import useFetchAndLocalStorage from "../custom-hooks/useFetchAndLocalStorage";

const RecipeInfo = () => {
   
    const params = useParams().recipeID;

    const {data, displayError, isFetching} = useFetchAndLocalStorage(`https://api.spoonacular.com/recipes/${params}/information?apiKey=441b9454444143fe846dd59f4a0b3bad`, false); 

    let dataResult;
    if (data !== null){
        if(data.hasOwnProperty('title')){
            dataResult = data;
        }else{
            dataResult = null
        }
        
    }else{
        dataResult = null
    }

    return (
        <div>
            {!dataResult ? null :
            <article className="recipe-infos">
                <header>
                    <h1>{data.title}</h1>
                    <div className="time-serving-info">
                        <span className="time">
                            <p>Time</p>
                            <p>{data.readyInMinutes} Min</p>
                        </span>
                        <span className="servings">
                            <p>Servings</p>
                            <p>{data.servings}</p>
                        </span>
                    </div>
                </header>
                
                <div className="content">
                    <img src={dataResult.image} alt="recipe" />
                    <div className="ingredients">
                        <h2>Ingredients</h2>
                        <ul>
                        {dataResult.extendedIngredients.map((item, index)=>{
                        return <li key={index}>{item.original}</li>
                    })}
                        </ul>
                    </div>
                    <div className="instructions">
                    <h2>Instructions</h2>
                    <ul>
                    {dataResult.analyzedInstructions[0].steps.map((item, index)=>{
                        return(
                            <li key={index}>
                                <h3>step {item.number}</h3>
                                <p>{item.step}</p>
                            </li>
                            
                        )
                    })}
                    </ul>
                    
                </div>
                </div>
                
            </article>
            
            }
            {displayError && <p className="error-msg">{displayError}</p>}
            {isFetching && <p className="loading-indicator">Loading...</p>}
        </div>
    )
}

export default RecipeInfo