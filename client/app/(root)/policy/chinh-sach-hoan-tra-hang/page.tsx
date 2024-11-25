import React from 'react'

const ReturnPolicyContent = () => {
  return (
    <main className="flex-grow container mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">Chính Sách Hoàn Trả Hàng</h2>
        
        {/* Policy Sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">1. Điều Kiện Hoàn Trả</h3>
          <p className="mb-4">
            Chúng tôi cam kết cung cấp chính sách hoàn trả linh hoạt để khách hàng có thể yên tâm mua sắm. Bạn có thể yêu cầu hoàn trả sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng nếu sản phẩm không đúng như mô tả hoặc gặp lỗi sản xuất.
          </p>
          <ul className="list-disc pl-6">
            <li>Sản phẩm phải còn nguyên tem, nhãn mác và bao bì gốc.</li>
            <li>Sản phẩm không bị hư hỏng do người dùng hoặc sử dụng sai mục đích.</li>
            <li>Yêu cầu hoàn trả cần được gửi trong vòng 30 ngày kể từ ngày nhận sản phẩm.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">2. Quy Trình Hoàn Trả</h3>
          <p className="mb-4">
            Để yêu cầu hoàn trả hàng, vui lòng thực hiện các bước sau:
          </p>
          <ul className="list-disc pl-6">
            <li>Liên hệ với chúng tôi qua email hoặc hotline để thông báo về yêu cầu hoàn trả.</li>
            <li>Cung cấp thông tin về đơn hàng và lý do yêu cầu hoàn trả (kèm ảnh chụp sản phẩm nếu cần).</li>
            <li>Chúng tôi sẽ xác nhận yêu cầu và hướng dẫn bạn các bước tiếp theo để gửi trả sản phẩm.</li>
            <li>Sản phẩm sẽ được kiểm tra và hoàn trả lại nếu thỏa mãn các điều kiện hoàn trả.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">3. Các Trường Hợp Không Được Hoàn Trả</h3>
          <p className="mb-4">
            Chúng tôi không chấp nhận hoàn trả trong các trường hợp sau:
          </p>
          <ul className="list-disc pl-6">
            <li>Sản phẩm đã được sử dụng hoặc bị hư hỏng do lỗi của người dùng.</li>
            <li>Sản phẩm không có tem bảo hành hoặc không còn bao bì gốc.</li>
            <li>Sản phẩm đã qua hơn 30 ngày kể từ ngày nhận hàng.</li>
            <li>Sản phẩm là hàng giảm giá, hàng khuyến mãi hoặc hàng đặc biệt (trừ khi có thông báo khác).</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">4. Phương Thức Hoàn Trả</h3>
          <p className="mb-4">
            Sau khi hoàn tất quy trình hoàn trả, chúng tôi sẽ thực hiện hoàn tiền qua phương thức thanh toán bạn đã sử dụng khi mua hàng, hoặc nếu bạn yêu cầu, chúng tôi sẽ gửi sản phẩm thay thế (nếu có).
          </p>
          <ul className="list-disc pl-6">
            <li>Hoàn tiền vào tài khoản ngân hàng hoặc qua phương thức thanh toán trực tuyến (như thẻ tín dụng, ví điện tử).</li>
            <li>Chúng tôi sẽ hoàn tất việc hoàn tiền trong vòng 7-10 ngày làm việc kể từ khi nhận được sản phẩm hoàn trả và xác nhận điều kiện hoàn trả hợp lệ.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-4">5. Liên Hệ Hoàn Trả</h3>
          <p className="mb-4">
            Nếu bạn cần yêu cầu hoàn trả hàng hoặc có bất kỳ câu hỏi nào về chính sách hoàn trả, vui lòng liên hệ với chúng tôi qua thông tin dưới đây:
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

export default ReturnPolicyContent