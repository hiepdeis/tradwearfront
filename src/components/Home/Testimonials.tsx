import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Nguyễn Thị Lan",
      location: "TP. Hồ Chí Minh",
      rating: 5,
      comment: "Áo sơ mi chất lượng tuyệt vời! Thiết kế đẹp và vải rất mềm mại. Giao hàng nhanh chóng và đóng gói cẩn thận. Sẽ mua tiếp!",
      product: "Áo sơ mi cao cấp"
    },
    {
      name: "Trần Văn Minh",
      location: "Hà Nội",
      rating: 5,
      comment: "Mua váy dạ hội cho vợ, chất lượng vượt mong đợi! Thiết kế sang trọng và vừa vặn hoàn hảo. Vợ tôi rất hài lòng.",
      product: "Váy dạ hội"
    },
    {
      name: "Lê Thị Hương",
      location: "Đà Nẵng",
      rating: 5,
      comment: "Quần jean rất đẹp và bền! Form dáng chuẩn, chất liệu tốt. Dịch vụ khách hàng nhiệt tình, tư vấn size rất chính xác.",
      product: "Quần jean cao cấp"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Khách Hàng <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Nói Gì</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tham gia cùng hàng nghìn khách hàng hài lòng trên toàn quốc
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-blue-600 mr-3" />
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.comment}"
              </p>
              
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.location}</div>
                <div className="text-sm text-blue-600 mt-1">Đã mua: {testimonial.product}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-current" />
              ))}
            </div>
            <div className="text-gray-900">
              <span className="font-semibold">4.8/5</span>
              <span className="text-gray-600 ml-2">từ 2,500+ đánh giá</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;