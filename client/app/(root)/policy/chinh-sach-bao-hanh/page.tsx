import React from 'react'

const WarrantyPolicyContent = () => {
  return (
    <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Chính Sách Bảo Hành</h2>
        
        {/* Policy Sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">1. Thời Gian Bảo Hành</h3>
          <p className="mb-4">
            Tất cả sản phẩm mua tại cửa hàng của chúng tôi đều được bảo hành 1 năm kể từ ngày mua. Chúng tôi cam kết bảo hành miễn phí các lỗi kỹ thuật phát sinh trong quá trình sử dụng hợp lý của sản phẩm.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">2. Điều Kiện Bảo Hành</h3>
          <p className="mb-4">
            Chính sách bảo hành chỉ áp dụng khi sản phẩm đáp ứng các điều kiện sau:
          </p>
          <ul className="list-disc pl-6">
            <li>Sản phẩm được mua trực tiếp tại cửa hàng của chúng tôi hoặc trên website chính thức.</li>
            <li>Sản phẩm không bị hư hỏng do sử dụng sai mục đích hoặc vi phạm hướng dẫn sử dụng.</li>
            <li>Sản phẩm phải có tem bảo hành còn nguyên vẹn, không bị rách, tháo dỡ hoặc sửa chữa bởi bên thứ ba.</li>
            <li>Sản phẩm còn trong thời gian bảo hành (1 năm từ ngày mua).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">3. Quy Trình Bảo Hành</h3>
          <p className="mb-4">
            Khi sản phẩm gặp sự cố, khách hàng vui lòng thực hiện các bước sau để yêu cầu bảo hành:
          </p>
          <ul className="list-disc pl-6">
            <li>Liên hệ với chúng tôi qua hotline hoặc email để thông báo về sự cố của sản phẩm.</li>
            <li>Cung cấp thông tin chi tiết về lỗi và gửi kèm hóa đơn mua hàng hoặc tem bảo hành.</li>
            <li>Chúng tôi sẽ xác nhận thông tin và hướng dẫn bạn các bước tiếp theo để gửi sản phẩm bảo hành.</li>
            <li>Sản phẩm sẽ được kiểm tra và sửa chữa miễn phí nếu lỗi thuộc phạm vi bảo hành.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">4. Các Trường Hợp Không Được Bảo Hành</h3>
          <p className="mb-4">
            Chúng tôi không chịu trách nhiệm bảo hành trong các trường hợp sau:
          </p>
          <ul className="list-disc pl-6">
            <li>Sản phẩm bị hư hỏng do tai nạn, cháy nổ, thiên tai hoặc các yếu tố khách quan.</li>
            <li>Sản phẩm bị hư hỏng do sử dụng sai cách hoặc không tuân thủ các hướng dẫn của nhà sản xuất.</li>
            <li>Sản phẩm đã bị thay đổi hoặc sửa chữa bởi người không có thẩm quyền hoặc các dịch vụ sửa chữa không chính thức.</li>
            <li>Sản phẩm hết thời gian bảo hành (quá 1 năm kể từ ngày mua).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">5. Thời Gian Xử Lý Bảo Hành</h3>
          <p className="mb-4">
            Sau khi chúng tôi nhận được sản phẩm và kiểm tra lỗi, thời gian xử lý bảo hành sẽ từ 7 đến 14 ngày làm việc, tùy thuộc vào mức độ lỗi và việc cung cấp linh kiện thay thế nếu cần.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">6. Liên Hệ Bảo Hành</h3>
          <p className="mb-4">
            Nếu bạn cần yêu cầu bảo hành hoặc có bất kỳ câu hỏi nào về chính sách bảo hành, vui lòng liên hệ với chúng tôi theo thông tin dưới đây:
          </p>
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

export default WarrantyPolicyContent