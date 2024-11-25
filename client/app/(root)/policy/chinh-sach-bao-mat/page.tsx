import React from 'react'

const PrivacyPolicyContent = () => {
  return (
    <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Chính Sách Bảo Mật</h2>
        
        {/* Policy Sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">1. Mục Đích Thu Thập Dữ Liệu</h3>
          <p className="mb-4">
            Chúng tôi thu thập dữ liệu cá nhân của bạn với mục đích cải thiện dịch vụ, hỗ trợ khách hàng và cung cấp trải nghiệm mua sắm cá nhân hóa. Mục đích thu thập có thể bao gồm:
          </p>
          <ul className="list-disc pl-6">
            <li>Cung cấp và quản lý đơn hàng.</li>
            <li>Cung cấp hỗ trợ khách hàng khi cần thiết.</li>
            <li>Đảm bảo an toàn và bảo mật của trang web.</li>
            <li>Cải thiện dịch vụ của chúng tôi dựa trên phản hồi của người dùng.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">2. Loại Dữ Liệu Chúng Tôi Thu Thập</h3>
          <p className="mb-4">
            Chúng tôi thu thập một số loại dữ liệu cá nhân sau khi bạn sử dụng dịch vụ của chúng tôi:
          </p>
          <ul className="list-disc pl-6">
            <li>Thông tin cá nhân: như tên, địa chỉ email, số điện thoại, địa chỉ giao hàng.</li>
            <li>Thông tin tài chính: như thông tin thanh toán, thẻ tín dụng, v.v.</li>
            <li>Thông tin giao dịch: bao gồm chi tiết các sản phẩm bạn mua và thanh toán của bạn.</li>
            <li>Thông tin kỹ thuật: bao gồm địa chỉ IP, loại trình duyệt, hệ điều hành, và thông tin về việc sử dụng trang web của bạn.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">3. Cách Thức Bảo Vệ Dữ Liệu</h3>
          <p className="mb-4">
            Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn và sử dụng các biện pháp bảo mật phù hợp để ngăn chặn hành vi truy cập trái phép hoặc lạm dụng dữ liệu.
          </p>
          <ul className="list-disc pl-6">
            <li>Mã hóa thông tin thanh toán và dữ liệu cá nhân trong quá trình giao dịch.</li>
            <li>Sử dụng các công nghệ bảo mật tiên tiến để bảo vệ hệ thống khỏi các cuộc tấn công và truy cập trái phép.</li>
            <li>Giới hạn quyền truy cập dữ liệu cá nhân chỉ cho những nhân viên có thẩm quyền.</li>
            <li>Thực hiện các kiểm tra bảo mật thường xuyên để phát hiện và khắc phục kịp thời các lỗ hổng bảo mật.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">4. Chia Sẻ Dữ Liệu</h3>
          <p className="mb-4">
            Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân của bạn với bên thứ ba, trừ khi:
          </p>
          <ul className="list-disc pl-6">
            <li>Với các nhà cung cấp dịch vụ bên thứ ba giúp chúng tôi xử lý thanh toán và giao hàng.</li>
            <li>Tuân thủ yêu cầu pháp lý hoặc khi cần thiết để bảo vệ quyền lợi hợp pháp của chúng tôi.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">5. Quyền Lợi của Người Dùng</h3>
          <p className="mb-4">
            Bạn có quyền yêu cầu truy cập, chỉnh sửa, hoặc xóa dữ liệu cá nhân của mình mà chúng tôi đang lưu trữ. Bạn cũng có thể yêu cầu ngừng sử dụng dữ liệu cá nhân của mình cho các mục đích tiếp thị.
          </p>
          <ul className="list-disc pl-6">
            <li>Yêu cầu quyền truy cập vào dữ liệu cá nhân của bạn.</li>
            <li>Yêu cầu chỉnh sửa hoặc cập nhật dữ liệu nếu có sự thay đổi.</li>
            <li>Yêu cầu xóa dữ liệu cá nhân của bạn nếu không còn cần thiết.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">6. Thay Đổi Chính Sách</h3>
          <p className="mb-4">
            Chúng tôi có quyền thay đổi chính sách bảo mật này bất cứ lúc nào. Mọi thay đổi sẽ được thông báo trên trang web này với thời gian cập nhật mới.
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

export default PrivacyPolicyContent