import React from 'react';
import '../styles/Products.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
};

export default ProductCard;
