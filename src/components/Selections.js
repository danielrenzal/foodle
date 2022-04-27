import { useEffect, useState } from "react"

function Selections({isSelectionShown}){
    
    const [close, setClose] = useState(isSelectionShown)

    useEffect(()=>{
        setClose(isSelectionShown)
    }, [isSelectionShown])

    
    return(
        <section className="category-menu" id={close === "clicked" ? "open" : "close"}>
            {/* <div className="logo">Foodle</div> */}
            <h2>Browse by category</h2>
            <div className="selections">
                <div className="cuisine">
                    <h3>Cuisine</h3>
                    <ul>
                        <li><button>African</button></li>
                        <li><button>European</button></li>
                        <li><button>Japanese</button></li>
                        <li><button>Thai</button></li>
                        <li><button>Mediterranean</button></li>
                        <li><button>Japanese</button></li>
                    </ul>
                </div>
                <div className="diet">
                    <h3>Diet</h3>
                    <ul>
                        <li><button>Vegan</button></li>
                        <li><button>Vegetarian</button></li>
                        <li><button>Ketogenic</button></li>
                        <li><button>Gluten Free</button></li>
                        <li><button>Pescetarian</button></li>
                        <li><button>Paleo</button></li>
                    </ul>
                </div>
                <div className="meal-type">
                    <h3>Meal Type</h3>
                    <ul>
                        <li><button>Main Course</button></li>
                        <li><button>Side Dish</button></li>
                        <li><button>Dessert</button></li>
                        <li><button>Snack</button></li>
                        <li><button>Fingerfood</button></li>
                        <li><button>Soup</button></li>
                    </ul>
                </div>


                <div className="apply-filter"><button>Apply filter</button></div>
            </div>
        </section>
    )
}

export default Selections