"use client";
import { useQuery } from 'react-query';
import { fetchProducts, Product } from '@/api/productsService';
import ProductCard from './ProductCard';

const ProductsPage: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>('products', fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductsPage;
