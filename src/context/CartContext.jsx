import { createContext, useState } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const agregarPizza = (pizza) => {
    const nuevoCarrito = [...cart]
    const index = nuevoCarrito.findIndex((item) => item.id === pizza.id)

    if (index === -1) {
      setCart([...cart, { id: pizza.id, name: pizza.name, price: pizza.price, img: pizza.img, count: 1 }])
      return
    }

    nuevoCarrito[index].count = nuevoCarrito[index].count + 1
    setCart(nuevoCarrito)
  }

  const aumentar = (id) => {
    const nuevoCarrito = [...cart]
    const index = nuevoCarrito.findIndex((item) => item.id === id)
    nuevoCarrito[index].count = nuevoCarrito[index].count + 1
    setCart(nuevoCarrito)
  }

  const disminuir = (id) => {
    const nuevoCarrito = [...cart]
    const index = nuevoCarrito.findIndex((item) => item.id === id)
    nuevoCarrito[index].count = nuevoCarrito[index].count - 1

    if (nuevoCarrito[index].count === 0) {
      setCart(nuevoCarrito.filter((item) => item.id !== id))
      return
    }

    setCart(nuevoCarrito)
  }

  let total = 0
  cart.forEach((item) => {
    total = total + item.price * item.count
  })

  return (
    <CartContext.Provider value={{ cart, agregarPizza, aumentar, disminuir, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider