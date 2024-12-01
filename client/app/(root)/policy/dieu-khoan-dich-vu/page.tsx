import React from 'react';

const TermsOfService = () => {
  return (
    <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Điều Khoản và Dịch Vụ</h2>
        
        {/* Terms Sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">1. Giới Thiệu</h3>
          <p className="mb-4">
            Các điều khoản và điều kiện này quy định việc sử dụng các dịch vụ của chúng tôi. Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản này.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">2. Quyền và Nghĩa Vụ Của Bạn</h3>
          <ul className="list-disc pl-6">
            <li>Bạn cam kết cung cấp thông tin chính xác, đầy đủ và cập nhật khi đăng ký và sử dụng dịch vụ của chúng tôi.</li>
            <li>Bạn có trách nhiệm bảo vệ tài khoản và mật khẩu của mình để tránh sự truy cập trái phép.</li>
            <li>Bạn đồng ý không sử dụng dịch vụ của chúng tôi cho các mục đích bất hợp pháp hoặc vi phạm quyền lợi của người khác.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">3. Quyền Sử Dụng Dịch Vụ</h3>
          <p className="mb-4">
            Chúng tôi cấp quyền sử dụng dịch vụ của mình cho bạn với mục đích cá nhân và không được chuyển nhượng. Bạn không được phép sao chép, sửa đổi hoặc phân phối dịch vụ mà không có sự đồng ý của chúng tôi.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">4. Bảo Mật và Quyền Riêng Tư</h3>
          <p className="mb-4">
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn và sử dụng chúng chỉ trong phạm vi cần thiết để cung cấp dịch vụ cho bạn. Xin vui lòng tham khảo Chính sách Quyền Riêng Tư của chúng tôi để biết thêm chi tiết.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">5. Giới Hạn Trách Nhiệm</h3>
          <p className="mb-4">
            Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại hoặc tổn thất nào phát sinh từ việc sử dụng dịch vụ của chúng tôi, bao gồm nhưng không giới hạn ở lỗi phần mềm, mất mát dữ liệu hoặc gián đoạn dịch vụ.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">6. Điều Khoản Thay Đổi</h3>
          <p className="mb-4">
            Chúng tôi có quyền thay đổi, sửa đổi hoặc cập nhật các điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web của chúng tôi.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">7. Chấm Dứt Sử Dụng Dịch Vụ</h3>
          <p className="mb-4">
            Chúng tôi có thể chấm dứt quyền sử dụng dịch vụ của bạn nếu bạn vi phạm các điều khoản này hoặc nếu chúng tôi nhận thấy hành vi lạm dụng dịch vụ.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Liên Hệ Với Chúng Tôi</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold mr-4">Email:</span>
              <a href="mailto:contact@website.com" className="text-blue-500 hover:underline">trongbinh88@gmail.com</a>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-4">Hotline:</span>
              <a href="tel:+84987654321" className="text-blue-500 hover:underline">0946 296 296</a>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-4">Địa Chỉ:</span>
              <p className="text-gray-700">Làng rèn truyền thống, thôn Bàn Mạch, xã Lý Nhân, huyện Vĩnh Tường, tỉnh Vĩnh Phúc</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TermsOfService;
