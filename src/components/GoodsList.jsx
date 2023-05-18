import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GoodsList = ({ grouppedProducts, addToCart }) => {
  return (
    <div className="goods">
      {Object.entries(grouppedProducts).map(([groupId, group], index) => (
        <Accordion
          key={groupId}
          disabled={Object.keys(group.products).length === 0}
          defaultExpanded={index === 0 ? true : false}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle1" gutterBottom>
              {group.groupName}
            </Typography>
          </AccordionSummary>
          <ul className="goods__list">
            {Object.values(group.products).map((product) => (
              <li className="goods__item" key={product.id}>
                <Typography
                  className="goods__item-title"
                  sx={{ color: '#154c79' }}
                >
                  {product.name} ({product.quantity})
                </Typography>
                <div className="goods__price">
                  <Chip
                    label={`₽ ${product.price.RUB}`}
                    color={
                      product.priceChangeStatus === 'green'
                        ? 'success'
                        : 'error'
                    }
                  />
                </div>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => addToCart(product, 1)}
                >
                  Купить
                </Button>
              </li>
            ))}
          </ul>
        </Accordion>
      ))}
    </div>
  );
};

export default GoodsList;
