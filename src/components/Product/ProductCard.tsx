import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  onView3D?: (product: Product) => void; // Made optional since we don't use it
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Navigating to product detail page:', product.id);
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={(e) => handleProductClick(e)}
      >
        <img 
          src={product.urlImgs?.[0] || "/placeholder-image.svg"} 
          alt={product.name}
          className="w-full h-64 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.svg";
          }}
        />
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick(e);
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 z-10"
          >
            <Eye className="h-5 w-5" />
            <span>Xem chi tiết</span>
          </button>
        </div>
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          {product.category?.name || 'Thời trang'}
        </div>
        <div className="absolute top-4 right-4 flex text-yellow-400 text-sm bg-white bg-opacity-90 rounded-full px-2 py-1">
          {'★'.repeat(4)} {/* Default rating since we don't have rating in new API */}
        </div>
      </div>
      
      <div 
        className="p-6 cursor-pointer" 
        onClick={(e) => handleProductClick(e)}
      >
        <div className="space-y-3 mb-4">
          <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-sm">📍</span>
            <p className="text-gray-600 text-sm">{product.origin}</p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{product.description}</p>
          
          {/* Color and Size info */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">🎨</span>
              <span className="text-sm text-gray-500">
                {product.colors?.join(', ') || 'Nhiều màu sắc'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">📏</span>
              <span className="text-sm text-gray-500">
                Size: {product.sizes?.join(', ') || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(product.price)}
            </span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleProductClick(e);
              }}
              className="p-3 border-2 border-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 hover:border-blue-700 transition-all duration-200 transform hover:scale-105"
              title="Xem chi tiết"
            >
              <Eye className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;