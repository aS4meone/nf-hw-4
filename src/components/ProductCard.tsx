import Image from 'next/image';
import React from "react";

interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({id, title, price, description, category, image}) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto">
            <div className="relative">
                <Image src={image} alt={title} width={600} height={400} className="w-full h-64 object-cover"/>
            </div>
            <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-medium">{category}</span>
                    <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );
};

export default ProductCard;
