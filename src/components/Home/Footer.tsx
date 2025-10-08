import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ShoppingBag } from 'lucide-react';

const TradeWearFooterLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Fashion icon */}
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-white">Trade Wear</span>
        <span className="text-xs text-blue-300 font-medium -mt-1">THỜI TRANG CAO CẤP</span>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <TradeWearFooterLogo />
            <p className="text-gray-300 leading-relaxed">
              Mang đến những sản phẩm thời trang cao cấp với thiết kế hiện đại và chất lượng tuyệt vời cho phong cách cá nhân của bạn.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#home" className="hover:text-white transition-colors">Trang chủ</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Sản phẩm</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Giới thiệu</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đơn hàng tùy chỉnh</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Dịch vụ khách hàng</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Thông tin giao hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đổi trả hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn chọn size</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Theo dõi đơn hàng</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Thông tin liên hệ</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>hello@tradewear.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+84 (28) 1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Bản tin</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-400 text-white"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Trade Wear. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Điều khoản dịch vụ</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Chính sách cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;