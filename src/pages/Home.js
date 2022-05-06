import Discover from "../components/Discover"
import { useEffect, useState, useRef } from "react"
import { CategoriesData } from "../CategoriesData";
import Browse from "../components/Browse";
import {Routes, Route, useNavigate} from "react-router-dom";
import Search from "./Search";
import RecipeInfo from "./RecipeInfo";

function Home(){

    //state and function for toggling category menu
    const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
    const toggleCategory = () => setIsCategoryMenuOpen(!isCategoryMenuOpen);

    //state for toggling search input
    const [showInput, setShowInput] = useState(false);

    //state for getting the input for searching
    const [searchKeyword, setSearchKeyword] = useState("");

    //to prevent the useEffect hook(for updating the URL) to run at first render
    const isFirstRender = useRef(true);

    //state for storing selected categories that will be displayed in the category menu.
    const [selected, setSelected] = useState([]);

    //state for storing selected categories that will be inserted to the API url
    //this is for when the user remove or change a category. It will be easier to update the full API url
    const [addedURL, setAddedURL] = useState([]);

    //state for storing the addedURL TOGETHER with the full API url
    const [url, setUrl] = useState(null);

    //search recipe funtion
    const navigate = useNavigate();

    const submitSearch = (e) => {
        e.preventDefault();
        navigate(`/foodle/search/${searchKeyword}`);
        setShowInput(false);
    }


    //function for when selecting a category
    const selectCategory = (item, key) => {
        isFirstRender.current = false; //this lets the useEffect to run now once its triggered

        if(key === "Meal type"){ //adding dash because this will be inserted to the API endpoint
             key = "type"
        }
        
        // storing categories
        setSelected([...selected,`${item}`]) 
        setAddedURL([...addedURL, `&${key}=${item}`]) 
    }


    // function when a user remove a selected category
    const removeSelected = (item) => {
        setSelected(selected.filter((value)=> value !== item))
        setAddedURL(addedURL.filter((value)=> !value.includes(item)))
    }

    
    //for updating the full API url
    useEffect(()=>{
        if(isFirstRender.current === false){ //preventing the updating of URL at first render
            setUrl(`https://api.spoonacular.com/recipes/complexSearch?apiKey=441b9454444143fe846dd59f4a0b3bad&number=50${addedURL.map((item)=>`${item}`).join('')}`)
        }

        if (addedURL.length === 0){//if the user removed all the selected categories, it will set the
            setUrl(null) // full url to null. This will render back the Discover section.
        }
            
    },[addedURL])

//RENDER
    return (
        <div className="home">
            <header className="home-header">
                    <div className="logo">Foodle</div>
                    <div className="form-container" id={showInput ? "open" : ""}>
                    <div className="wrapper">
                        <button className="back-btn" onClick={()=>setShowInput(!showInput)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="67.969" height="49.036" viewBox="0 0 67.969 49.036"><g transform="translate(-300.145 -197.482)"><path d="M-13.228,46.036a2.992,2.992,0,0,1-2.179-.937L-35.758,23.6a3,3,0,0,1,0-4.123L-15.409-2.06a3,3,0,0,1,4.241-.121,3,3,0,0,1,.121,4.241l-18.4,19.48,18.4,19.433a3,3,0,0,1-.116,4.241A2.99,2.99,0,0,1-13.228,46.036Z" transform="translate(336.725 200.482)" fill="#fff"/><path d="M58.114,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H58.114a3,3,0,0,1,3,3A3,3,0,0,1,58.114,3Z" transform="translate(307 222)" fill="#fff"/></g></svg>
                        </button>
                        <form className="search-form" onSubmit={submitSearch}>
                            <input onChange={(e)=> setSearchKeyword(e.target.value)} value={searchKeyword} type="search" name="search-input" id="search-=input" placeholder="search"/>
                            <button type="submit" className="search-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68"><g transform="translate(-222 -188)"><path d="M28.25,6A22.25,22.25,0,1,0,50.5,28.25,22.249,22.249,0,0,0,28.25,6m0-6A28.25,28.25,0,1,1,0,28.25,28.281,28.281,0,0,1,28.25,0Z" transform="translate(222 188)" fill="#fff"/><path d="M17,20a2.991,2.991,0,0,1-2.121-.879l-17-17a3,3,0,0,1,0-4.243,3,3,0,0,1,4.243,0l17,17A3,3,0,0,1,17,20Z" transform="translate(270 236)" fill="#fff"/></g></svg>
                            </button>
                        </form>
                    </div>
                    </div>
                    <button className="open-search-field-btn" onClick={()=>setShowInput(!showInput)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68"><g transform="translate(-222 -188)"><path d="M28.25,6A22.25,22.25,0,1,0,50.5,28.25,22.249,22.249,0,0,0,28.25,6m0-6A28.25,28.25,0,1,1,0,28.25,28.281,28.281,0,0,1,28.25,0Z" transform="translate(222 188)" fill="#fff"/><path d="M17,20a2.991,2.991,0,0,1-2.121-.879l-17-17a3,3,0,0,1,0-4.243,3,3,0,0,1,4.243,0l17,17A3,3,0,0,1,17,20Z" transform="translate(270 236)" fill="#fff"/></g></svg>
                    </button>
            </header>
                <Routes>
                    <Route path="/foodle/" element={
                        <main className="main-content">
                        <section className="category-menu" id={isCategoryMenuOpen ? "open" : ""}>
                            <button className="close-category" onClick={toggleCategory}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="67.969" height="49.036" viewBox="0 0 67.969 49.036"><g transform="translate(-300.145 -197.482)"><path d="M-13.228,46.036a2.992,2.992,0,0,1-2.179-.937L-35.758,23.6a3,3,0,0,1,0-4.123L-15.409-2.06a3,3,0,0,1,4.241-.121,3,3,0,0,1,.121,4.241l-18.4,19.48,18.4,19.433a3,3,0,0,1-.116,4.241A2.99,2.99,0,0,1-13.228,46.036Z" transform="translate(336.725 200.482)" fill="#fff"/><path d="M58.114,3H0A3,3,0,0,1-3,0,3,3,0,0,1,0-3H58.114a3,3,0,0,1,3,3A3,3,0,0,1,58.114,3Z" transform="translate(307 222)" fill="#fff"/></g></svg>
                            </button>
                                <ul className="selected-categories-container">
                                    {//adding a "placeholder" if the container is empty
                                        selected.length === 0
                                        ?
                                        <p>Choose a category</p>
                                        :
                                        selected.map((item, index)=>{
                                            return <li key={index} onClick={()=>removeSelected(item)} className="selected-category">
                                                        {item}
                                                        <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81"><g transform="translate(-512.5 -12.5)"><path d="M75,78a2.991,2.991,0,0,1-2.121-.879l-75-75a3,3,0,0,1,0-4.243,3,3,0,0,1,4.243,0l75,75A3,3,0,0,1,75,78Z" transform="translate(515.5 15.5)" fill="#707070"/><path d="M0,78a2.991,2.991,0,0,1-2.121-.879,3,3,0,0,1,0-4.243l75-75a3,3,0,0,1,4.243,0,3,3,0,0,1,0,4.243l-75,75A2.991,2.991,0,0,1,0,78Z" transform="translate(515.5 15.5)" fill="#707070"/></g></svg>
                                                        </span>
                                                   </li>
                                        })
                                    }
                                </ul>
                            <div className="categories">
                                {//rendering the list of categories
                                    Object.keys(CategoriesData).map((key, index)=>{
                                        return (
                                            <div className={key} key={index}>
                                                <h3>{key}</h3>
                                                <ul>
                                                    {CategoriesData[key].map((item, index)=>{
                                                        return <li key={index} onClick={()=>selectCategory(item, key)}><button>{item}</button></li>
                                                    })}
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                        </section>
                            {url === null ? <Discover title="Discover" toggleCategory={toggleCategory}/> : <Browse title="Browse" url={url} toggleCategory={toggleCategory}/>}
                        </main>
                    }/>
                    <Route path="/foodle/search/:keyword" element={<Search />}/>
                    <Route path="/foodle/recipe/:recipeID" element={<RecipeInfo />}/>

            
            </Routes>
        </div>
    )
}

export default Home