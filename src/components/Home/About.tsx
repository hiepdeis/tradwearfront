import React from 'react';
import { Printer, Globe, Award, Truck } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Printer className="h-12 w-12 text-blue-600" />,
      title: "Thiết kế chuyên nghiệp",
      description: "Đội ngũ thiết kế chuyên nghiệp tạo ra những sản phẩm thời trang độc đáo và hiện đại."
    },
    {
      icon: <Globe className="h-12 w-12 text-green-600" />,
      title: "Xu hướng toàn cầu",
      description: "Cập nhật những xu hướng thời trang mới nhất từ khắp nơi trên thế giới."
    },
    {
      icon: <Award className="h-12 w-12 text-purple-600" />,
      title: "Chất lượng cao cấp",
      description: "Mỗi sản phẩm đều được kiểm tra kỹ lưỡng để đảm bảo chất lượng và độ bền cao nhất."
    },
    {
      icon: <Truck className="h-12 w-12 text-orange-600" />,
      title: "Giao hàng toàn quốc",
      description: "Giao hàng nhanh chóng và an toàn đến mọi tỉnh thành với đầy đủ bảo hiểm."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tại sao chọn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Trade Wear</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi đam mê mang đến cho bạn những sản phẩm thời trang chất lượng cao với 
            thiết kế hiện đại và sự chú ý tỉ mỉ đến từng chi tiết.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl text-white p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Cam kết chất lượng của chúng tôi</h3>
              <div className="space-y-4 text-lg">
                <p>
                  Mỗi sản phẩm thời trang đều được sản xuất từ những chất liệu cao cấp và 
                  kỹ thuật may hiện đại để đảm bảo độ bền và vẻ đẹp hoàn hảo.
                </p>
                <p>
                  Đội ngũ thiết kế và chuyên gia thời trang của chúng tôi làm việc cùng nhau 
                  để đảm bảo tính thẩm mỹ và xu hướng trong từng sản phẩm.
                </p>
                <p>
                  Từ những chi tiết tinh tế của áo sơ mi đến sự sang trọng của váy dạ hội, 
                  chúng tôi mang đến cho bạn những sản phẩm thời trang hoàn hảo.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Thương hiệu</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-sm opacity-90">Khách hàng hài lòng</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">99.5%</div>
                <div className="text-sm opacity-90">Đánh giá chất lượng</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-sm opacity-90">Sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;