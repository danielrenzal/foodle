import { useNavigate } from "react-router-dom"

function RecipeCardList({cards}){

    const navigate = useNavigate();

    return(
        <div className="card-list">
            {
                cards.map((card)=>{
                    return(
                        <article key={card.id} className="food-card">
                            {card.image ? <img src={card.image} alt="recipe" /> : <div className="img-placeholder">image unavailable :(</div>}
                            
                            <div className="food-card-info">
                                <h2>{card.title}</h2>
                                <button onClick={()=>navigate(`/recipe/${card.id}`)}>View recipe</button>
                            </div>
                            
                        </article>
                    )
                })
            }
        </div>
    )
}

export default RecipeCardList