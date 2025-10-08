import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm">Được tin tưởng bởi 10,000+ khách hàng trên toàn quốc</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Thời trang
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500"> tuyệt vời</span>
                <br />
                cho mọi phong cách
              </h1>
              <p className="text-xl text-gray-100 max-w-2xl">
                Khám phá bộ sưu tập quần áo thời trang đa dạng và phong phú. Từ áo sơ mi công sở đến váy dạ hội, chúng tôi mang đến cho bạn những sản phẩm chất lượng cao với thiết kế hiện đại và giá cả hợp lý.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
                <span>Mua sắm ngay</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold transition-all">
                Xem bộ sưu tập
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-gray-200">Thương hiệu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">200+</div>
                <div className="text-sm text-gray-200">Sản phẩm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99%</div>
                <div className="text-sm text-gray-200">Hài lòng</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Áo sơ mi thời trang"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-gray-800">
                <h3 className="font-bold text-lg">Áo sơ mi cao cấp</h3>
                <p className="text-sm text-gray-600">Chất liệu cotton 100%</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-2xl font-bold text-blue-600">299.000đ</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;