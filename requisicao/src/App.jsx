import { useState, useEffect, useRef } from 'react'
import './App.css'


const url = "http://localhost:8080/estoque/info"
const url1 = "http://localhost:8080/estoque"

function App() {
  const inputRef = useRef(null)

  const [estoque, setEstoque] = useState([])

  const [tamanho, setTamanho] = useState("")
  const [densidade, setDensidade] = useState("")
  const [quantidadeMilheiro, setQuantidadeMilheiro] = useState("")
  const [peso, setPeso] = useState("")

  //1- resgatando dados
  useEffect(() => {

    async function fetchData(){
      
      const res = await fetch(url)

      const data = await res.json()
  
      setEstoque(data)
    }

    fetchData()
    
  }, [])

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

    const res = await fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(estoque)
    })

    //carregamento dinamico
    const addedEstoque = await res.json()
    setEstoque((prevEstoque) => [...prevEstoque, addedEstoque])

    //limpar os inputs
    clearInputs()

    inputRef.current.focus()
  }

  return (
   <div className="App">
    <h1>Lista de produtos</h1>
    <ul>
      {estoque.map((estoque) => (
        <li key={estoque.id}>
          {estoque.tamanho} - 
          {estoque.densidadeEnum} - 
          {estoque.quantidadeMilheiro} - 
          {estoque.pesoMilheiro}
          </li>
      ))}
    </ul>
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
          <input type="submit" value="criar" />
      </form>
    </div>
   </div>
  )
}

export default App
