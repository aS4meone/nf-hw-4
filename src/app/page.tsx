import Providers from '../components/Providers';
import ProductsPage from '../components/ProductsPage';
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Providers>
      <ProductsPage />
    </Providers>
  );
};

export default HomePage;
