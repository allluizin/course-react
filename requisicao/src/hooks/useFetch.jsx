import { useState, useEffect } from "react";

// 4- custom hook
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    //refatorando post
    const [config, setConfig] = useState(null) //config da requisicao
    const [method, setMethod] = useState(null)//metodo da requisicao
    const [callFetch, setCallFetch] = useState(false)

    //6 loading
    const [loading, setLoading] = useState(false)
    //tratando erros
    const [error, setError] = useState(null)
    //8 desafio 6
    const [itemId, setItemId] = useState(null)

    const httpConfig = (data, method) => {
        if(method === 'POST'){
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })

            setMethod(method)
        }else if(method === "DELETE"){
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
            })
            setMethod(method)
            setItemId(data) //aqui vai o id do estoque
        }
    }

    useEffect(() => {
        
        const fetchData = async () => {
            //6 loading
            setLoading(true)

            try{
                const res = await fetch(url)

                const json = await res.json()
    
                setData(json)
            }catch(error){
                console.log(error.message)
                
                setError("Houve erro ao carregar os dados")
                
            }

            setLoading(false)
        }
        fetchData()

    }, [url, callFetch]); //callfetch beacuse update estoque

    //refatorando o post
    useEffect(() => {
        const httpRequest = async () =>{
           let json
            if(method === 'POST'){
                let fetchOPtions = [url, config]
                
                const res = await fetch(...fetchOPtions)
    
                json = await res.json()

                setCallFetch(json)
            }else if(method === "DELETE"){
                const deleteUrl = `${url}/${itemId}`

                const res = await fetch(deleteUrl, config)
    
                json = await res.json()
            }
            setCallFetch(json)
        }
        httpRequest()
    }, [config, method, url])

    return {data, httpConfig, loading, error}
}