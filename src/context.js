import React, { useState, useContext, useEffect, useCallback } from 'react'
import { commerce } from './lib/commerce'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )

      setOrder(incomingOrder)

      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        order,
        errorMessage,
        handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
        handleCaptureCheckout,
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
