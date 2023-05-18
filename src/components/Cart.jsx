import React, { Fragment, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = ({ cartItems, setCartItems, exchangeRates }) => {
  useEffect(() => {
    const updatedCartItems = cartItems.map((item) => {
      const updatedPriceInRUB = +(exchangeRates.RUB * item.price.USD).toFixed(
        2
      );
      return {
        ...item,
        price: {
          ...item.price,
          RUB: updatedPriceInRUB,
        },
      };
    });
    setCartItems(updatedCartItems);
  }, [exchangeRates]);

  const totalSum = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price.RUB * item.cartQuantity;
    }, 0);
  }, [cartItems]);

  const handleQuantityChange = (event, item) => {
    const newQuantity = event.target.value;
    if (newQuantity >= 0) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, cartQuantity: newQuantity };
        } else {
          return cartItem;
        }
      });
      setCartItems(updatedCartItems);
    }
  };

  const removeItem = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  return (
    <Box className="cart cart-shadow">
      {cartItems.length > 0 ? (
        <div className="cart__list">
          {cartItems.map((cartItem) => (
            <Fragment key={cartItem.id}>
              <div className="cart__wrapper">
                <div className="cart__item-1">
                  <Chip
                    label={cartItem.group}
                    color="primary"
                    variant="outlined"
                    onClick={() => console.log(cartItem.group)}
                    sx={{ width: '65px' }}
                  />
                  <Typography variant="body2" sx={{ width: '250px' }}>
                    {cartItem.name}
                  </Typography>
                </div>
                <div className="cart__item-1">
                  <TextField
                    size="small"
                    value={cartItem.cartQuantity}
                    inputProps={{ min: 0 }}
                    onChange={(event) => handleQuantityChange(event, cartItem)}
                  />
                  <Chip
                    label={cartItem.price.RUB}
                    sx={{ maxWidth: '55px', fontSize: '11px' }}
                  />
                  <button
                    className="cart__delete"
                    onClick={() => removeItem(cartItem)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      ) : (
        <Box>
          <Typography>
            Корзина пустая
            <br />
            Добавьте товары с каталога.
          </Typography>
        </Box>
      )}
      <div className="cart__total">
        <Typography variant="body1">Общая стоимость:</Typography>
        <Typography variant="h6">{`₽ ${totalSum.toFixed(2)}`}</Typography>
      </div>
    </Box>
  );
};

export default Cart;
