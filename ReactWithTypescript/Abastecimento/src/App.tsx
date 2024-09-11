import { useState, FormEvent } from 'react'
import './App.css'

import gasStation from './assets/logo.png'

interface InfoProps {
  compensa: string;
  alcool: string | number;
  gasolina: string | number;
}

function App() {
  const [inputGasolina, setInputGasolina] = useState<number>(0);
  const [inputAlcool, setInputAlcool] = useState<number>(0);
  const [info, setInfo] = useState<InfoProps>();
  
  function calcular(event: FormEvent) {
    event.preventDefault();
    
    let calculo = (inputAlcool / inputGasolina);

    if(calculo <= .7) {
      setInfo({compensa: "álcool", alcool: formatarMoeda(inputAlcool), gasolina: formatarMoeda(inputGasolina)})
    } else {
      setInfo({compensa: "gasolina", alcool: formatarMoeda(inputAlcool), gasolina: formatarMoeda(inputGasolina)})
    }
  }

  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      }
    );
    return valorFormatado;
  }

  return (
    <>
      <main className='container'>
        <img className='logo' src={gasStation} alt="Gas station logo" />

        <h1 className='title' >Qual melhor opção?</h1>

        <form  className='form' onSubmit={calcular}>
          <label>Álcool (preço por litro): </label> <br/>
          <input className='input' type="number" placeholder='0,00' min='1' step='.01' required
            value={inputAlcool}
            onChange={ (e) => setInputAlcool(Number(e.target.value)) }
          />
          <br/>
          <label>Gasolina (preço por litro): </label> <br/>
          <input className='input' type="number" placeholder='0,00' min='1' step='.01' required
            value={inputGasolina}
            onChange={ (e) => setInputGasolina(Number(e.target.value)) }
          />
          <br/>
          <input className='button' type="submit" value="Calcular"/>
        </form>
        { info ? 
          <section className='result'>
            <h2 className='result-title'>Compensa usar {info?.compensa}</h2>

            <span>Álcool: {info?.alcool}</span>
            <span>Gasolina: {info?.gasolina}</span>
          </section>
        : ""}
        

      </main>
    </>
  )
}

export default App
