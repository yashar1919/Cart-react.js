import React, { useContext } from 'react';
import { productsContext } from '../context/ProductContextProvider';    //Context
import Product from './shared/Product';     //Component
import styles from "./Store.module.css";


const Store = () => {

const products = useContext(productsContext);

    return (
        <div className={styles.container}>
            {products.map(item => <Product key={item.id} itemData={item} />)}
        </div>
    );
};

export default Store;