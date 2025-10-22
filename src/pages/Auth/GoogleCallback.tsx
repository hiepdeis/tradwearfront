import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useAuth } from '../../hooks';
import { useAuthStore } from '../../stores/authStore';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const AES_SECRET = 'a4464ecefbabc1578a3894dde3f6e64354091b8f856d78c5bd9937743e44c556';

const GoogleCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { setAccessToken } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const tokenParam = searchParams.get('token');
        
        if (!tokenParam) {
          setStatus('error');
          setMessage('Không tìm thấy token xác thực');
          return;
        }

        // Decrypt token directly like AuthValidatePage
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(tokenParam), AES_SECRET);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const parsed = JSON.parse(decrypted) as { status: string; data: { access_token: string; user: any }; message: string };

        if (parsed.status === 'success' && parsed.data?.access_token) {
          // Set session data
          setAccessToken(parsed.data.access_token);
          setUser(parsed.data.user);
          
          setStatus('success');
          setMessage('Đăng nhập thành công!');
          
          // Redirect based on role after 2 seconds
          setTimeout(() => {
            const role = parsed.data.user?.role;
            if (role === 'admin') {
              navigate('/admin/users', { replace: true });
            } else {
              navigate('/', { replace: true });
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(parsed.message || 'Đăng nhập thất bại');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Đã xảy ra lỗi khi xử lý đăng nhập');
      }
    };

    handleCallback();
  }, [searchParams, setUser, setAccessToken, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center">
            {status === 'loading' && (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-16 w-16 text-green-600" />
            )}
            {status === 'error' && (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {status === 'loading' && 'Đang xử lý...'}
            {status === 'success' && 'Thành công!'}
            {status === 'error' && 'Có lỗi xảy ra'}
          </h2>
          
          <p className="mt-2 text-gray-600">
            {message}
          </p>
          
          {status === 'success' && (
            <p className="mt-4 text-sm text-gray-500">
              Bạn sẽ được chuyển hướng về trang chủ...
            </p>
          )}
          
          {status === 'error' && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Quay lại đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleCallback;
