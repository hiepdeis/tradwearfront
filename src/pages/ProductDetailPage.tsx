import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  Ruler,
  Clock,
  Award,
} from "lucide-react";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../hooks";
import type { Product } from "../types/product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, isInCart } = useCart();
  const { success, error: showError } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Helper functions
  const getUniqueColors = () => {
    return product?.colors || [];
  };

  const getUniqueSizes = () => {
    return product?.sizes || [];
  };

  const isColorSizeAvailable = (color: string, size: string) => {
    // Check if both color and size are available in the product
    return product?.colors?.includes(color) && product?.sizes?.includes(size);
  };

  const isProductInCart = (productId: string, color: string, size: string) => {
    return isInCart(productId, color, size);
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await productService.getProductById(id);

        if (response.success && response.data) {
          setProduct(response.data);
          // Set default color and size
          if (response.data.colors && response.data.colors.length > 0) {
            setSelectedColor(response.data.colors[0]);
          }
          if (response.data.sizes && response.data.sizes.length > 0) {
            setSelectedSize(response.data.sizes[0]);
          }
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        setError("Lỗi khi tải sản phẩm");
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Initialize color and size when product loads
  useEffect(() => {
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedColor, selectedSize]);

  // Reset quantity when color or size changes
  useEffect(() => {
    setQuantity(1);
  }, [selectedColor, selectedSize]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Đang tải sản phẩm...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Không tìm thấy sản phẩm"}
          </h1>
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) {
      if (!selectedColor) {
        showError("Vui lòng chọn màu sắc");
      } else if (!selectedSize) {
        showError("Vui lòng chọn kích cỡ");
      }
      return;
    }

    // Check if the same product with same color and size already exists in cart
    const existingItem = cart?.items?.find(item => 
      item.productId === product.id && 
      item.color === selectedColor &&
      item.size === selectedSize
    );
    
    if (existingItem) {
      // Update quantity of existing item
      updateQuantity(existingItem.id, existingItem.quantity + quantity);
      success(
        `Đã cập nhật số lượng ${product.name} (${selectedColor} - Size ${selectedSize}) trong giỏ hàng!`
      );
    } else {
      // Add new item with color and size info
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
        image: product.urlImgs?.[0],
        currency: 'VND',
      });

      success(
        `Đã thêm ${quantity} sản phẩm ${product.name} (${selectedColor} - Size ${selectedSize}) vào giỏ hàng!`
      );
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden">
              
                <img
                  src={product.urlImgs[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-image.svg";
                  }}
                />
            
              
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-sm">
                <div className="font-semibold">{product.name}</div>
                <div className="text-xs opacity-90">Hình ảnh sản phẩm</div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.urlImgs && product.urlImgs.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {product.urlImgs.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-image.svg";
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Purchase */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                {product.category?.name || 'Thời trang'}
              </span>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Mô tả sản phẩm
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {getUniqueColors().length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Chọn màu sắc
                </h3>
                <div className="flex flex-wrap gap-3">
                  {getUniqueColors().map((color) => {
                    // Map color names to actual colors
                    const getColorClass = (colorName: string) => {
                      const colorMap: { [key: string]: string } = {
                        'Đỏ': 'bg-red-500',
                        'Xanh dương': 'bg-blue-500',
                        'Xanh lá': 'bg-green-500',
                        'Vàng': 'bg-yellow-500',
                        'Tím': 'bg-purple-500',
                        'Hồng': 'bg-pink-500',
                        'Cam': 'bg-orange-500',
                        'Đen': 'bg-black',
                        'Trắng': 'bg-white border-2 border-gray-300',
                        'Xám': 'bg-gray-500',
                        'Nâu': 'bg-amber-700',
                        'Xanh navy': 'bg-blue-900',
                        'Xanh mint': 'bg-emerald-300',
                        'Hồng pastel': 'bg-pink-200',
                        'Vàng pastel': 'bg-yellow-200',
                      };
                      return colorMap[colorName] || 'bg-gray-300';
                    };

                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-12 h-12 rounded-full border-3 transition-all transform hover:scale-110 ${
                          selectedColor === color
                            ? "border-blue-500 ring-4 ring-blue-200"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        title={color}
                      >
                        <div className={`w-full h-full rounded-full ${getColorClass(color)}`}></div>
                        {selectedColor === color && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {getUniqueSizes().length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Chọn kích cỡ
                </h3>
                 <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                   {getUniqueSizes().map((size) => {
                     const isAvailable = isColorSizeAvailable(selectedColor, size);
                     
                     return (
                       <button
                         key={size}
                         onClick={() => setSelectedSize(size)}
                         disabled={!isAvailable}
                         className={`relative w-12 h-12 rounded-lg border-2 transition-all transform hover:scale-105 font-semibold text-sm ${
                           selectedSize === size
                             ? "border-blue-500 bg-blue-500 text-white shadow-lg"
                             : isAvailable
                             ? "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-md"
                             : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                         }`}
                         title={isAvailable ? `Size ${size}` : `Size ${size} - Hết hàng`}
                       >
                         {size}
                         {!isAvailable && (
                           <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-6 h-0.5 bg-gray-400 rotate-45"></div>
                           </div>
                         )}
                       </button>
                     );
                   })}
                 </div>
              </div>
            )}

            {/* Size Chart */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Bảng kích cỡ
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        SIZE/CM
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Length
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Chest
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Shoulder
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Sleeve
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                        Weight
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { size: 'S', length: 64, chest: 48, shoulder: 44, sleeve: 18, weight: '40-45KG' },
                      { size: 'M', length: 66, chest: 50, shoulder: 46, sleeve: 19, weight: '45-55KG' },
                      { size: 'L', length: 68, chest: 52, shoulder: 48, sleeve: 20, weight: '55-65KG' },
                      { size: 'XL', length: 70, chest: 54, shoulder: 50, sleeve: 21, weight: '65-70KG' },
                      { size: '2XL', length: 72, chest: 56, shoulder: 52, sleeve: 22, weight: '70-75KG' },
                      { size: '3XL', length: 73, chest: 58, shoulder: 54, sleeve: 22, weight: '75-85KG' },
                      { size: '4XL', length: 74, chest: 60, shoulder: 55, sleeve: 23, weight: '85-90KG' }
                    ].map((row, index) => (
                      <tr key={row.size} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          {row.size}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                          {row.length}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                          {row.chest}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                          {row.shoulder}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center border-r border-gray-200">
                          {row.sleeve}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 text-center">
                          {row.weight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>* Tất cả số đo được tính bằng cm (centimet)</p>
                <p>* Trọng lượng được tính bằng kg (kilogram)</p>
              </div>
            </div>

            {/* Selected Product Info */}
            {/* {selectedColor && selectedSize && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {selectedColor} - Size {selectedSize}
                      </h4>
                      <p className="text-xs text-gray-600">
                        Đã chọn thành công
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product?.price || 0)}
                    </div>
                    <div className="text-xs text-gray-500">Giá sản phẩm</div>
                  </div>
                </div>
                
              </div>
            )} */}

            {/* Quantity Selection */}
            {selectedColor && selectedSize && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center space-x-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-black font-medium text-lg hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="text-black font-medium text-lg min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-black font-medium text-lg hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {selectedColor && selectedSize && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Sản phẩm có sẵn và sẵn sàng giao hàng
                  </span>
                </div>
              </div>
            )}

            {/* Total Price */}
            {selectedColor && selectedSize && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-medium text-gray-700">
                      Tổng cộng ({quantity} sản phẩm):
                    </span>
                    <div className="text-sm text-gray-500">
                      {selectedColor} - Size {selectedSize}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-blue-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format((product?.price || 0) * quantity)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {quantity > 1 && `${new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product?.price || 0)} × ${quantity}`}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            {selectedColor && selectedSize && (
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-3 text-lg ${
                  isProductInCart(product.id, selectedColor, selectedSize)
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>
                  {isProductInCart(product.id, selectedColor, selectedSize)
                    ? "Đã có trong giỏ hàng"
                    : "Thêm vào giỏ hàng"}
                </span>
              </button>
            )}
                
            {/* Product Information */}
            {selectedColor && selectedSize && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Thông tin sản phẩm
                </h4>
                <div className="text-sm text-blue-800">
                  <ul className="space-y-1">
                    <li>• Màu sắc: {selectedColor}</li>
                    <li>• Kích cỡ: {selectedSize}</li>
                    <li>• Xuất xứ: {product?.origin}</li>
                    <li>• Danh mục: {product?.category?.name || 'Thời trang'}</li>
                    <li>• Giao hàng: 3-5 ngày làm việc</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Specifications Section */}
        <div className="mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-900">Danh mục</span>
                  <p className="text-gray-600">{product.category?.name || 'Thời trang'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Ruler className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-900">Xuất xứ</span>
                  <p className="text-gray-600">{product.origin}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <span className="font-medium text-gray-900">Giao hàng</span>
                  <p className="text-gray-600">3-5 ngày làm việc</p>
                </div>
              </div>
              
               <div className="flex items-center space-x-3">
                 <Award className="h-5 w-5 text-blue-600" />
                 <div>
                   <span className="font-medium text-gray-900">Màu sắc</span>
                   <p className="text-gray-600">
                     {product?.colors?.join(", ") || "N/A"}
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Chi tiết sản phẩm
            </h3>
             <ul className="space-y-3 text-gray-600">
               <li className="flex justify-between">
                 <span>Màu sắc:</span>
                 <span className="font-medium">{product?.colors?.join(", ") || "N/A"}</span>
               </li>
               <li className="flex justify-between">
                 <span>Kích cỡ:</span>
                 <span className="font-medium">{product?.sizes?.join(", ") || "N/A"}</span>
               </li>
               <li className="flex justify-between">
                 <span>Trạng thái:</span>
                 <span className="font-medium text-green-600">Có sẵn</span>
               </li>
               <li className="flex justify-between">
                 <span>Xuất xứ:</span>
                 <span className="font-medium">{product?.origin}</span>
               </li>
               <li className="flex justify-between">
                 <span>Danh mục:</span>
                 <span className="font-medium">{product?.category?.name || 'Thời trang'}</span>
               </li>
             </ul>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thông tin giao hàng</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Giao hàng tiêu chuẩn: 3-5 ngày</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Giao hàng nhanh: 1-2 ngày</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Miễn phí ship từ 500.000đ</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Đóng gói cẩn thận</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Theo dõi đơn hàng</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;