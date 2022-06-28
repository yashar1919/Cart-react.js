import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productsContext } from '../context/ProductContextProvider';
import styles from "./ProductDetail.module.css";

const ProductDetail = (props) => {

    const params = useParams();
    const id = params.id;
    const data = useContext(productsContext);
    const product = data[id - 1];


    return (
        <div className={styles.container}>
            <img className={styles.image} src={product.image} alt="product" />
            <div className={styles.textContainer}>
                <h3>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.category}><span>Category: </span>{product.category}</p>
                <div className={styles.buttonContainer}>
                    <span className={styles.price}>{product.price} $</span>
                    <br />
                    <br />
                    <Link to="/products">Back to Shop</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;