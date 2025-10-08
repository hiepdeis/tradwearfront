import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-blue-600 rounded-full flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-3xl font-bold text-gray-800">Không tìm thấy trang</h2>
          <p className="text-lg text-gray-600">
            Oops! Trang bạn đang tìm kiếm có vẻ như đã biến mất.
          </p>
          <p className="text-sm text-gray-500">
            Đừng lo lắng, bạn vẫn có thể khám phá bộ sưu tập thời trang tuyệt vời của chúng tôi!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-blue-700 transition-all font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Về trang chủ</span>
          </Link>
          
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <strong>Cần hỗ trợ?</strong> Liên hệ với đội ngũ hỗ trợ của chúng tôi tại{' '}
            <a href="mailto:support@clothes.com" className="underline">
              support@clothes.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;