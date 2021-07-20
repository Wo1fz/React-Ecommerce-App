import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from '@material-ui/core'
// MenuItem, Menu,
import { ShoppingCart, Home } from '@material-ui/icons'
import logo from '../../assets/cat.png'
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ totalItems }) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            variant='h6'
            className={classes.title}
            color='inherit'
          >
            <img
              src={logo}
              alt='Commerce.js'
              height='50px'
              className={classes.image}
            />
            Wo1fz Shop
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' ? (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to='/cart'
                aria-label='Show cart items'
                color='inherit'
              >
                <Badge badgeContent={totalItems} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          ) : (
            <div>
              <IconButton
                component={Link}
                to='/'
                aria-label='To home'
                color='inherit'
              >
                <Home />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
