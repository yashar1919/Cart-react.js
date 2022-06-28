import { Navigate, Route, Routes } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';  //Component
import Navbar from './components/shared/Navbar';  //Component
import ShopCart from './components/ShopCart';  //Component
import Store from './components/Store';  //Component
import CartContextProvider from './context/CartContextProvider';  //Context
import ProductContextProvider from './context/ProductContextProvider';  //Context

const App = () => {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Navbar />
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<Store />} />
          <Route path="/shopcart" element={<ShopCart />} />
          <Route path='/*' element={<Navigate to="/products"/>}/>
        </Routes>
      </CartContextProvider>
    </ProductContextProvider>
  );
};

export default App;
