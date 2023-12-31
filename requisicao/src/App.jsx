import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch'

const url = "http://localhost:8080/estoque"

function App() {
  const inputRef = useRef(null)

  const [estoque, setEstoque] = useState([])

  //custom hook
  const {data : items, httpConfig, loading, error} = useFetch(url);
  

  const [tamanho, setTamanho] = useState("")
  const [densidade, setDensidade] = useState("")
  const [quantidadeMilheiro, setQuantidadeMilheiro] = useState("")
  const [peso, setPeso] = useState("")

  //1- resgatando dados
  // useEffect(() => {

  //   async function fetchData(){
      
  //     const res = await fetch(url)

  //     const data = await res.json()
  
  //     setEstoque(data)
  //   }

  //   fetchData()
    
  // }, [])

  //limpeza de inputs
  const clearInputs = () => {
    setTamanho("")
    setDensidade("")
    setQuantidadeMilheiro("")
    setPeso("")
  }
    
  //2 -- add estoque
  const handleSubmit = async (e) => {
    e.preventDefault()

    const estoque = {
      tamanho: tamanho,
      densidadeEnum: densidade,
      quantidadeMilheiro: quantidadeMilheiro,
      pesoMilheiro: peso,
    }

    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(estoque)
    // })

    // //carregamento dinamico
    // const addedEstoque = await res.json()
    // setEstoque((prevEstoque) => [...prevEstoque, addedEstoque])

    //refatorando o post
    httpConfig(estoque, "POST")

    //limpar os inputs
    

    inputRef.current.focus()
  }
  //desafio 6
  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  return (
   <div className="App">
    <h1>Lista de produtos</h1>
    {loading && <p>Carregando dados...</p>}
    {error && <p>{error}</p>}
    {!error && <ul>
      {items && items.map((estoque) => (
        <li key={estoque.id}>
          {estoque.tamanho} - 
          {estoque.densidadeEnum} - 
          {estoque.quantidadeMilheiro} - 
          {estoque.pesoMilheiro}
          <button onClick={() => handleRemove(estoque.id)}>Excluir</button>
          </li>
      ))}
    </ul>}
    <div className="add-product">
      <form onSubmit={handleSubmit}>
          <label>
            Tamanho:
            <input type="text" value={tamanho} name='tamanho' onChange={(e) => setTamanho(e.target.value)} ref={inputRef}/>
          </label>
          <label>
            Densidade:
            <input type="text" value={densidade} name='densidade' onChange={(e) => setDensidade(e.target.value)} />
          </label>
          <label>
            quantidade:
            <input type="text" value={quantidadeMilheiro} name='quantidade' onChange={(e) => setQuantidadeMilheiro(e.target.value)} />
          </label>
          <label>
            peso:
            <input type="text" value={peso} name='peso' onChange={(e) => setPeso(e.target.value)} />
          </label>
          {loading && <input type="submit" disabled value="aguarde.." />}
          {!loading && <input type="submit" value="enviar dados" />}
      </form>
    </div>
   </div>
  )
}

export default App
