import { useEffect, useState } from "react"

const useFetchAndLocalStorage = (url, useLocalStorage) => {

    const [data, setData] = useState(null);
    const [displayError, setDisplayError] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(()=>{
        setIsFetching(true)
        setData(null)
        if(useLocalStorage === true){
            const check = localStorage.getItem("discover");

        if(check){
            setData(JSON.parse(check))
            setIsFetching(false)
        }else{
            fetch(url)
            .then(response => {
                if(!response.ok){
                    setDisplayError("This website uses an API that sets a limit in sending queries and it might already reached its limit. Try again tomorrow :(")
                    setIsFetching(false)
                }
                return response.json()
            })
            .then(data => {
                // const array = Object.keys(data)[0]
                setData(data)
                localStorage.setItem("discover", JSON.stringify(data))
                setIsFetching(false)
            })
            .catch(() => {
                setDisplayError("Network connection failed :(")
                setIsFetching(false)
            })
            }
        }else{
            fetch(url)
            .then(response => {
                console.log(response)
                if(!response.ok){
                    setDisplayError("This website uses an API that sets a limit in sending queries and it might already reached its limit. Try again tomorrow :(")
                    setIsFetching(false)
                }
                return response.json()
            })
            .then(data => {
                // const array = Object.keys(data)[0]
                setData(data)
                setIsFetching(false)
            })
            .catch((error) => {
                setDisplayError("Network connection failed :(")
                setIsFetching(false)
            })
        }
        
    },[url, useLocalStorage])

    return {data, displayError, isFetching};
}

export default useFetchAndLocalStorage