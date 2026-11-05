
// 1. Lấy đơn hàng đã đặt
const maDon = localStorage.getItem("donHangCuoiCung");

const danhSachDonHang = JSON.parse(
    localStorage.getItem("donHangAoDai")
) || [];

const orderDetail = document.getElementById("orderDetail");

// 2. Tìm đơn hàng vừa đặt
let donHang = null;

for (let i = 0; i < danhSachDonHang.length; i++) {
    if (danhSachDonHang[i].maDon == maDon) {
        donHang = danhSachDonHang[i];
        break;
    }
}

// 3. Hiển thị thông tin đơn hàng
if (donHang != null) {

    let sanPhamHTML = "";

    for (let i = 0; i < donHang.sanPham.length; i++) {
        let sanPham = donHang.sanPham[i];

        sanPhamHTML += `
            <p>
                ${sanPham.ten} × ${sanPham.soLuong}
                - ${(sanPham.gia * sanPham.soLuong).toLocaleString("vi-VN")}đ
            </p>
        `;
    }

    orderDetail.innerHTML = `
        <h3>Thông tin khách hàng</h3>
        <p> Mã đơn: ${donHang.maDon}</p>
        <p> Họ tên: ${donHang.tenKhachHang}</p>
        <p> Email: ${donHang.email}</p>
        <p> Số điện thoại: ${donHang.soDienThoai}</p>
        <p> Địa chỉ: ${donHang.diaChi}</p>
        <p> Thanh toán: ${donHang.phuongThucThanhToan}</p>

        <h3>Sản phẩm đã đặt</h3>
        ${sanPhamHTML}

        <h3>Tổng tiền: ${donHang.tongTien.toLocaleString("vi-VN")}đ</h3>

        <p>Trạng thái: ${donHang.trangThai}</p>
    `;

} else {
    orderDetail.innerHTML = "<p>Không tìm thấy đơn hàng!</p>";
}
