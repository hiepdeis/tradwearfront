import React, { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { productService } from '../../../services/productService';
import categoryService from '../../../services/categoryService';
import { useToast } from '../../../hooks';
import type { Product } from '../../../types/product';
import type { Category } from '../../../types/category';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, onSuccess, product }) => {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // Predefined options
  const colorOptions = [
    'Đen', 'Trắng', 'Xám', 'Xanh dương', 'Xanh lá', 'Đỏ', 'Hồng'
  ];

  const sizeOptions = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'
  ];

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await categoryService.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        } else {
          error('Không thể tải danh mục');
        }
      } catch (err) {
        error('Lỗi khi tải danh mục');
      } finally {
        setCategoriesLoading(false);
      }
    };

    if (isOpen) {
      loadCategories();
    }
  }, [isOpen, error]);

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        origin: product.origin,
        categoryId: product.category?._id,
        price: product.price,
        colors: product.colors,
        sizes: product.sizes,
        urlImgs: product.urlImgs,
      });
      // Initialize selected colors and sizes
      setSelectedColors(product.colors || []);
      setSelectedSizes(product.sizes || []);
      // Initialize preview URLs with existing images from DB
      setPreviewUrls(product.urlImgs || []);
      // Reset removed images when product changes
      setRemovedImages([]);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'categoryId') {
      const selectedCategory = categories.find(cat => cat._id === value);
      setFormData(prev => ({
        ...prev,
        categoryId: value,
        category: selectedCategory || { _id: '', name: '' },
      }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const imageUrl = previewUrls[index];
    
    // Check if it's a new file (blob URL) or existing image from DB
    const isNewFile = imageUrl?.startsWith('blob:');
    
    if (isNewFile) {
      // Remove from new files
      setImageFiles(prev => prev.filter((_, i) => i !== index));
      URL.revokeObjectURL(imageUrl);
    } else {
      // Add to removed images list (existing image from DB)
      setRemovedImages(prev => [...prev, imageUrl]);
    }
    
    // Remove from preview
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    setIsLoading(true);

    try {
      if (!formData.name?.trim()) {
        error("Tên sản phẩm là bắt buộc");
        return;
      }
      if (!formData.categoryId) {
        error("Vui lòng chọn danh mục");
        return;
      }
      if (selectedColors.length === 0) {
        error("Vui lòng chọn ít nhất một màu sắc");
        return;
      }
      if (selectedSizes.length === 0) {
        error("Vui lòng chọn ít nhất một kích cỡ");
        return;
      }

      const formDataToSend = new FormData();

      // append text fields
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description?.trim() || "");
      formDataToSend.append("origin", formData.origin?.trim() || "");
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("price", String(formData.price || 0));

      // append colors
      selectedColors.forEach(color => {
        formDataToSend.append("colors", color);
      });

      // append sizes
      selectedSizes.forEach(size => {
        formDataToSend.append("sizes", size);
      });

      // append new images (files)
      imageFiles.forEach(file => {
        formDataToSend.append("urlImgs", file); 
      });

      // append removed images (JSON string)
      if (removedImages.length > 0) {
        removedImages.forEach(url => {
          formDataToSend.append("removedImgs", url);
        });
        
      }

      const result = await productService.updateProduct(product.id, formDataToSend);

      if (result.success) {
        success("✅ Cập nhật sản phẩm thành công!", 3000);
        onSuccess();
        handleClose();
      } else {
        error(result.error || "Cập nhật sản phẩm thất bại");
      }
    } catch (err) {
      error("Có lỗi xảy ra khi cập nhật sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Clean up URL objects to prevent memory leaks
    previewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    
    setFormData({});
    setSelectedColors([]);
    setSelectedSizes([]);
    setImageFiles([]);
    setPreviewUrls([]);
    setRemovedImages([]);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Xuất xứ *
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Việt Nam, Mỹ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (VND) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || 0}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu sắc *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map((color) => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorToggle(color)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{color}</span>
                    </label>
                  ))}
                </div>
                {selectedColors.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedColors.map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kích cỡ *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {sizeOptions.map((size) => (
                    <label key={size} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
                {selectedSizes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {selectedSizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Hình ảnh</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tải lên hình ảnh bổ sung
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload-edit"
                  />
                  <label
                    htmlFor="image-upload-edit"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Nhấp để tải lên hoặc kéo thả nhiều hình ảnh
                    </span>
                  </label>
                </div>
                
                {previewUrls.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Hình ảnh ({previewUrls.length} tổng cộng)
                      </span>
                      <div className="flex space-x-2 text-xs text-gray-500">
                        <span>Hiện tại: {previewUrls.filter(url => !url.startsWith('blob:')).length}</span>
                        <span>Mới: {previewUrls.filter(url => url.startsWith('blob:')).length}</span>
                        {removedImages.length > 0 && (
                          <span className="text-red-500">Đã xóa: {removedImages.length}</span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {previewUrls.map((url, index) => {
                        const isNewFile = url.startsWith('blob:');
                        return (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <div className="absolute top-1 left-1">
                              <span className={`px-1 py-0.5 text-xs rounded ${
                                isNewFile 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-blue-500 text-white'
                              }`}>
                                {isNewFile ? 'Mới' : 'Hiện tại'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Danh mục</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId || ''}
                  onChange={handleInputChange}
                  required
                  disabled={categoriesLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                >
                  <option value="">
                    {categoriesLoading ? 'Đang tải danh mục...' : 'Chọn danh mục'}
                  </option>
                
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả *
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mô tả chi tiết sản phẩm"
            />
          </div>


          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Đang cập nhật...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Cập nhật sản phẩm</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
