import React, { useEffect, useState, useRef } from 'react';
import GoodsList from './components/GoodsList';
import Cart from './components/Cart';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './style.css';
import { TextField } from '@mui/material';
import { getProductsData, getProductsGroups } from './utils/fetchData';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [grouppedProducts, setGrouppedProducts] = useState({});
  const [exchangeRates, setExchangeRates] = useState({ RUB: 60 });
  const [cartItems, setCartItems] = useState([]);
  const exRef = useRef(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductsData();
      const groups = await getProductsGroups();
      const productsByGroups = setProductsByGroups({
        data: data.Value.Goods,
        groups,
      });
      setGrouppedProducts(productsByGroups);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addToCart = (item, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].cartQuantity += +quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, cartQuantity: quantity }]);
    }
  };

  const setProductsByGroups = ({ data, groups }) => {
    const productsByGroups = Object.fromEntries(
      Object.entries(groups).map((x) => [
        x[0],
        { groupName: x[1].G, products: {} },
      ])
    );
    for (let { C: priceInUSD, G: groupId, T: productId, P: quantity } of data) {
      let priceChangeStatus = '';
      let previousPriceInUSD =
        grouppedProducts[groupId]?.products[productId]?.price?.USD;
      const priceInRUB = +(exchangeRates.RUB * priceInUSD).toFixed(2);
      const previousPriceInRUB =
        grouppedProducts[groupId]?.products[productId]?.price?.RUB;
      if (
        previousPriceInRUB !== undefined &&
        previousPriceInRUB != priceInRUB
      ) {
        priceChangeStatus = priceInRUB > previousPriceInRUB ? 'red' : 'green';
      }
      productsByGroups[groupId].products[productId] = {
        id: productId,
        group: groups[groupId].G,
        name: groups[groupId].B[productId].N,
        quantity,
        priceChangeStatus,
        price: {
          USD: priceInUSD,
          RUB: priceInRUB,
        },
      };
    }
    return productsByGroups;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newExchangeRate = {
        RUB: +exRef.current.value || exchangeRates.RUB,
      };
      setExchangeRates(newExchangeRate);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getProducts();
  }, [exchangeRates]);

  if (loading)
    return (
      <Box className="app__loading">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Typography align="center" sx={{ m: 4, fontWeight: 'bold' }}>
          Discovery Studio Test Store
        </Typography>
        <Typography>Exchange Rate: ₽ {exchangeRates.RUB}</Typography>
        <TextField
          inputRef={exRef}
          type="number"
          size="small"
          sx={{ width: '200px' }}
          label="Exchange rate between 20-80"
          inputProps={{
            max: 80,
            min: 20,
          }}
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <GoodsList
            grouppedProducts={grouppedProducts}
            addToCart={addToCart}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            exchangeRates={exchangeRates}
          />
        </Grid>
      </Grid>
    </>
  );
}
