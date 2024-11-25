import React from 'react'

const PrivacyPolicy = () => {
  return (
    <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Chính Sách Quyền Riêng Tư</h2>
        
        {/* Policy Sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">1. Thông Tin Chúng Tôi Thu Thập</h3>
          <ul className="list-disc pl-6">
            <li>Thông tin đăng ký: Khi bạn tạo tài khoản, chúng tôi thu thập thông tin như tên, email, số điện thoại, địa chỉ giao hàng và thông tin thanh toán.</li>
            <li>Thông tin giao dịch: Chúng tôi thu thập thông tin liên quan đến các giao dịch mua hàng của bạn, bao gồm sản phẩm bạn đã mua và các giao dịch thanh toán.</li>
            <li>Thông tin tự động: Chúng tôi thu thập thông tin tự động như địa chỉ IP, loại trình duyệt, hệ điều hành, trang web giới thiệu, và hành vi duyệt web của bạn.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">2. Cách Thức Chúng Tôi Sử Dụng Thông Tin</h3>
          <ul className="list-disc pl-6">
            <li>Xử lý đơn hàng: Để hoàn tất các giao dịch mua hàng, gửi hàng và thông báo về tình trạng đơn hàng của bạn.</li>
            <li>Hỗ trợ khách hàng: Để cung cấp dịch vụ hỗ trợ khách hàng và giải quyết khiếu nại.</li>
            <li>Cải thiện dịch vụ: Để nâng cao chất lượng sản phẩm và dịch vụ.</li>
            <li>Tiếp thị và quảng cáo: Để gửi thông tin khuyến mãi và ưu đãi đặc biệt (nếu bạn đồng ý nhận thông tin này).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">3. Chia Sẻ Thông Tin Cá Nhân</h3>
          <ul className="list-disc pl-6">
            <li>Với các nhà cung cấp dịch vụ bên thứ ba: Để xử lý đơn hàng và cung cấp dịch vụ cho bạn.</li>
            <li>Yêu cầu pháp lý: Để tuân thủ các yêu cầu pháp lý hoặc bảo vệ quyền lợi hợp pháp của chúng tôi.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">4. Bảo Mật Thông Tin</h3>
          <p className="mb-4">
            Chúng tôi thực hiện các biện pháp bảo mật cần thiết để bảo vệ thông tin cá nhân của bạn, bao gồm mã hóa dữ liệu, quản lý quyền truy cập và bảo mật hệ thống.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">5. Quyền Lợi của Bạn</h3>
          <p className="mb-4">
            Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình mà chúng tôi lưu trữ. Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin liên lạc trên trang web.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">6. Cookies</h3>
          <p className="mb-4">
            Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng. Bạn có thể tắt cookies trong trình duyệt của mình, nhưng điều này có thể ảnh hưởng đến khả năng sử dụng trang web.
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
  )
}

export default PrivacyPolicy