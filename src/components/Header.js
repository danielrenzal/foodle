function Header(){
    return (
        <header className="main">
            <button className="open-selection">open</button>
            <form>
                <input type="search" name="search-input" id="search-=input" placeholder="search"/>
                <button type="submit" className="search-btn">Search</button>
            </form>
        </header>
    )
}

export default Header