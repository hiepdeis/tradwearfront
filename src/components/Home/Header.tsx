import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogIn,
  ChevronDown,
  UserCircle,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks";
import CartIcon from "../Cart/CartIcon";

const TradeWearLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Logo image */}
        <img
          src="/tradwear.jpg"
          alt="TradWear Logo"
          className="w-12 h-12 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          TradWear
        </span>
        <span className="text-xs text-gray-500 font-medium -mt-1">
          THỜI TRANG CAO CẤP
        </span>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'products') {
      // Navigate to all products page
      navigate('/products');
    } else {
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If already on home page, just scroll
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/">
            <TradeWearLogo />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Trang chủ
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Sản phẩm
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Giới thiệu
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Liên hệ
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Authentication buttons */}
            {isAuthenticated ? (
              <div
                className="hidden md:flex items-center space-x-4"
                ref={dropdownRef}
              >
                <CartIcon />
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Xin chào, {user?.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-12 mt-48 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-in fade-in duration-200">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle className="h-4 w-4 mr-3" />
                        Hồ sơ cá nhân
                      </Link>

                      <Link
                        to="/purchase-history"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-3" />
                        Lịch sử mua hàng
                      </Link>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Đăng nhập</span>
                </Link>
                {/* <Link
                  to="/register"
                  className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Đăng ký</span>
                </Link> */}
              </div>
            )}

            <button
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-gradient-to-r from-blue-50 to-purple-50">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white text-left"
              >
                Trang chủ
              </button>
              <button
                onClick={() => handleNavClick('products')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white text-left"
              >
                Sản phẩm
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white text-left"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white text-left"
              >
                Liên hệ
              </button>

              {/* Mobile Auth buttons */}
              <div className="border-t pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700 px-2 py-1 bg-white rounded">
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        Xin chào, {user?.name}!
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircle className="h-4 w-4" />
                      <span>Thông tin cá nhân</span>
                    </Link>

                    <Link
                      to="/purchase-history"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Lịch sử mua hàng</span>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-left text-gray-700 hover:text-red-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white w-full"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-white"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Đăng nhập</span>
                    </Link>
                    {/* <Link
                      to="/register"
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Đăng ký</span>
                    </Link> */}
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
