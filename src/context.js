import React, { useState, useContext, useEffect, useCallback } from 'react'
import { commerce } from './lib/commerce'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  const fetchProducts = useCallback(async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }, [])

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [fetchProducts])

  const handleAddToCart = async (productID, quantity) => {
    const { cart } = await commerce.cart.add(productID, quantity)

    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
