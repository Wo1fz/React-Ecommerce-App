import React from 'react'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@material-ui/core'
import useStyles from './styles'
import { useGlobalContext } from '../../../context'

const CartItem = ({ item }) => {
  const classes = useStyles()
  const { handleUpdateCartQty, handleRemoveFromCart } = useGlobalContext()

  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant='h6'>{item.name}</Typography>
        <Typography variant='h6'>
          {item.line_total.formatted_with_code}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type='button'
            size='small'
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type='button'
            size='small'
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant='contained'
          type='button'
          color='secondary'
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
