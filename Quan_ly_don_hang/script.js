
// 1. Lấy danh sách đơn hàng đã lưu trong localStorage
const KEY_DON_HANG = "donHangAoDai";

let danhSachDonHang = JSON.parse(
    localStorage.getItem(KEY_DON_HANG)
) || [];

// 2. Lấy vị trí hiển thị danh sách đơn hàng
const orderList = document.getElementById("orderList");

// 3. Hiển thị danh sách đơn hàng
function hienThiDonHang() {
    orderList.innerHTML = "";

    // Kiểm tra nếu chưa có đơn hàng
    if (danhSachDonHang.length === 0) {
        orderList.innerHTML = `
            <tr>
                <td colspan="6">Chưa có đơn hàng nào.</td>
            </tr>
        `;
        return;
    }

    // Duyệt qua từng đơn hàng
    for (let i = 0; i < danhSachDonHang.length; i++) {
        let donHang = danhSachDonHang[i];

        orderList.innerHTML += `
            <tr>
                <td>${donHang.maDon}</td>
                <td>${donHang.tenKhachHang}</td>
                <td>${donHang.soDienThoai}</td>
                <td>${donHang.tongTien.toLocaleString("vi-VN")}đ</td>
                <td>${donHang.trangThai}</td>
                <td>
                    <button class="action-button view-button"
                        onclick="xemDonHang(${i})">
                        Xem
                    </button>

                    <button class="action-button update-button"
                        onclick="capNhatDonHang(${i})">
                        Cập nhật
                    </button>
                </td>
            </tr>
        `;
    }
}

// 4. Xem chi tiết đơn hàng
function xemDonHang(i) {
    // Lấy mã đơn hàng được chọn
    let maDon = danhSachDonHang[i].maDon;

    // Lưu mã đơn để trang chi tiết biết cần hiển thị đơn nào
    localStorage.setItem("donHangCuoiCung", maDon);

    // Chuyển sang trang chi tiết đơn hàng
    window.location.href = "../Chi_tiet_DH/index.html";
}

// 5. Cập nhật trạng thái đơn hàng
function capNhatDonHang(i) {
    let trangThaiMoi = prompt(
        "Nhập trạng thái mới:\n" +
        "1. Đang xử lý\n" +
        "2. Đã xác nhận\n" +
        "3. Đang giao\n" +
        "4. Đã giao\n" +
        "5. Đã hủy"
    );

    if (trangThaiMoi == "1") {
        danhSachDonHang[i].trangThai = "Đang xử lý";
    } else if (trangThaiMoi == "2") {
        danhSachDonHang[i].trangThai = "Đã xác nhận";
    } else if (trangThaiMoi == "3") {
        danhSachDonHang[i].trangThai = "Đang giao";
    } else if (trangThaiMoi == "4") {
        danhSachDonHang[i].trangThai = "Đã giao";
    } else if (trangThaiMoi == "5") {
        danhSachDonHang[i].trangThai = "Đã hủy";
    } else {
        alert("Lựa chọn không hợp lệ!");
        return;
    }

    // Lưu trạng thái mới vào localStorage
    localStorage.setItem(
        KEY_DON_HANG,
        JSON.stringify(danhSachDonHang)
    );

    // Hiển thị lại danh sách sau khi cập nhật
    hienThiDonHang();

    alert("Cập nhật trạng thái thành công!");
}

// 6. Gọi hàm hiển thị khi mở trang
hienThiDonHang();
