import { useState, useEffect } from 'react'
import Header from '../components/Header'
import CardPizza from '../components/CardPizza'
import { imagenesPizzas } from '../utils/imagenesPizzas'

const Home = () => {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    consultarApi()
  }, [])

  const consultarApi = async () => {
    const url = 'http://localhost:5000/api/pizzas'
    const response = await fetch(url)
    const data = await response.json()
    setPizzas(data)
  }

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div className="col-md-4" key={pizza.id}>
              <CardPizza
                id={pizza.id}
                name={pizza.name}
                price={pizza.price}
                ingredients={pizza.ingredients}
                img={imagenesPizzas[pizza.id]}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home