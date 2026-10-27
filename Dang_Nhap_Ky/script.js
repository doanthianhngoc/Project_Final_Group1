
let form = document.getElementById("formDangNhap");

let taiKhoan = document.getElementById("taiKhoan");
let matKhau = document.getElementById("matKhau");

let loiTaiKhoan = document.getElementById("loiTaiKhoan");
let loiMatKhau = document.getElementById("loiMatKhau");
let thongBao = document.getElementById("thongBao");

// Kiểm tra khi nhấn nút đăng nhập
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Xóa thông báo cũ
    loiTaiKhoan.textContent = "";
    loiMatKhau.textContent = "";
    thongBao.textContent = "";

    let ten = taiKhoan.value.trim();
    let mk = matKhau.value.trim();

    let hopLe = true;

    // Kiểm tra tài khoản
    if (ten == "") {
        loiTaiKhoan.textContent = "Vui lòng nhập tài khoản!";
        hopLe = false;
    }

    // Kiểm tra mật khẩu
    if (mk == "") {
        loiMatKhau.textContent = "Vui lòng nhập mật khẩu!";
        hopLe = false;
    }

    // Nếu thông tin hợp lệ thì lưu người dùng
    if (hopLe == true) {

        // Lấy danh sách người dùng đã lưu
        let danhSach = JSON.parse(
            localStorage.getItem("taiKhoanAoDai")
        ) || [];

        // Tìm tài khoản đã tồn tại
        let nguoiDung = danhSach.find(function (user) {
            return user.taiKhoan == ten;
        });

        // Nếu chưa có thì thêm vào danh sách
        if (!nguoiDung) {
            nguoiDung = {
                id: Date.now(),
                taiKhoan: ten,
                vaiTro: "Khách hàng"
            };

            danhSach.push(nguoiDung);

            // Lưu danh sách vào localStorage
            localStorage.setItem(
                "taiKhoanAoDai",
                JSON.stringify(danhSach)
            );
        }

        thongBao.style.color = "#b52f67";
        thongBao.textContent =
            "Thông tin người dùng đã được lưu vào hệ thống!";
    }
});
