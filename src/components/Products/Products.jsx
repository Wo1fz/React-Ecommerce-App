import React from 'react'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running shoes',
    price: '$50',
    image:
      'https://static01.nyt.com/images/2020/02/25/well/PHYSED-SHOES1/merlin_168154896_a69879b8-d43a-40d0-8297-dd7086d7d784-mobileMasterAt3x.jpg',
  },
  {
    id: 2,
    name: 'Macbook',
    description: 'Apple macbook',
    price: '$100',
    image:
      'https://www.apple.com/v/macbook-air/j/images/meta/macbook-air_overview__15sjf4iagj6q_og.png?202105271811',
  },
]

const Products = () => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Products
