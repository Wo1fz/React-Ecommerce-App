import React from 'react'
import { Products, Navbar, Cart, Checkout } from './components'
import { useGlobalContext } from './context'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const { cart, handleUpdateCartQty, handleRemoveFromCart } = useGlobalContext()

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path='/'>
            <Products />
          </Route>
          <Route exact path='/cart'>
            <Cart
              handleUpdateCartQty={handleUpdateCartQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Route>
          <Route exact path='/checkout'>
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
