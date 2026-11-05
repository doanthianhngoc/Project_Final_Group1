
// 1. Khai báo các phần tử HTML
const orderForm = document.getElementById("orderForm");
const orderItems = document.getElementById("orderItems");
const totalPrice = document.getElementById("totalPrice");

// 2. Tên các mục lưu trong localStorage
const KEY_GIO_HANG = "gioHangAoDai";
const KEY_DON_HANG = "donHangAoDai";
const KEY_CURRENT_USER = "nguoiDungDangNhap";

// 3. Lấy thông tin người dùng đang đăng nhập
function layNguoiDungDangNhap() {
    try {
        return JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
    } catch (error) {
        return null;
    }
}

// 4. Tự động điền thông tin người dùng vào form
function dienThongTinNguoiDung() {
    const nguoiDung = layNguoiDungDangNhap();

    if (!nguoiDung) {
        alert("Bạn cần đăng nhập trước khi đặt hàng!");
        window.location.href = "../Dang_Nhap_Ky/index.html";
        return;
    }

    // Điền tên đăng nhập
    document.getElementById("name").value =
        nguoiDung.taiKhoan || "";

    // Điền Gmail
    document.getElementById("email").value =
        nguoiDung.email || "";
}

// 5. Lấy dữ liệu giỏ hàng
function layGioHang() {
    return JSON.parse(localStorage.getItem(KEY_GIO_HANG)) || [];
}

// 6. Định dạng giá tiền
function dinhDangTien(gia) {
    return gia.toLocaleString("vi-VN") + "đ";
}

// 7. Hiển thị sản phẩm và tính tổng tiền
function hienThiDonHang() {
    const gioHang = layGioHang();
    let tongTien = 0;

    if (gioHang.length === 0) {
        orderItems.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        totalPrice.textContent = "0đ";
        return;
    }

    orderItems.innerHTML = "";

    gioHang.forEach(function (sanPham) {
        const thanhTien = sanPham.gia * sanPham.soLuong;
        tongTien += thanhTien;

        orderItems.innerHTML += `
            <div class="order-item">
                <span>
                    ${sanPham.ten} × ${sanPham.soLuong}
                </span>
                <strong>${dinhDangTien(thanhTien)}</strong>
            </div>
        `;
    });

    totalPrice.textContent = dinhDangTien(tongTien);
}

// 8. Hiển thị thông tin khi mở trang đặt hàng
dienThongTinNguoiDung();
hienThiDonHang();

// 9. Xử lý khi khách nhấn nút đặt hàng
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const gioHang = layGioHang();

    // Kiểm tra giỏ hàng
    if (gioHang.length === 0) {
        alert("Giỏ hàng đang trống. Vui lòng chọn sản phẩm!");
        return;
    }

    // Lấy thông tin khách hàng
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const note = document.getElementById("note").value.trim();
    const payment = document.getElementById("payment").value;

    // Tính tổng tiền
    let tongTien = 0;

    gioHang.forEach(function (sanPham) {
        tongTien += sanPham.gia * sanPham.soLuong;
    });

    // Tạo thông tin đơn hàng
    const donHang = {
        maDon: Date.now(),
        tenKhachHang: name,
        email: email,
        soDienThoai: phone,
        diaChi: address,
        ghiChu: note,
        phuongThucThanhToan: payment,
        sanPham: gioHang,
        tongTien: tongTien,
        trangThai: "Đang xử lý",
        ngayDat: new Date().toLocaleString("vi-VN")
    };

    // Lấy danh sách đơn hàng đã lưu
    const danhSachDonHang =
        JSON.parse(localStorage.getItem(KEY_DON_HANG)) || [];

    // Thêm đơn hàng mới
    danhSachDonHang.push(donHang);

    // Lưu đơn hàng vào localStorage
    localStorage.setItem(
        KEY_DON_HANG,
        JSON.stringify(danhSachDonHang)
    );

    // Lưu mã đơn hàng vừa đặt
    localStorage.setItem(
        "donHangCuoiCung",
        donHang.maDon
    );

    // Xóa giỏ hàng sau khi đặt thành công
    localStorage.removeItem(KEY_GIO_HANG);

    // Ẩn form đặt hàng
    orderForm.style.display = "none";

    // Hiển thị màn hình đặt hàng thành công
    document.getElementById("successMessage").style.display = "block";

    // Nút quay lại trang chủ
    document.getElementById("homeButton").addEventListener("click", function () {
        window.location.href = "../Trang_chu/index.html";
    });

    // Nút xem chi tiết đơn hàng
    document.getElementById("detailButton").addEventListener("click", function () {
        window.location.href = "../Chi_tiet_don_hang/index.html";
    });
});