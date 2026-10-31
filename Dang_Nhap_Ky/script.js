
const KEY_USERS = "taiKhoanAoDai";
const KEY_CURRENT_USER = "nguoiDungDangNhap";

// Lấy danh sách tài khoản
function layDanhSachNguoiDung() {
    return JSON.parse(localStorage.getItem(KEY_USERS)) || [];
}

// Lưu danh sách tài khoản
function luuDanhSachNguoiDung(dsNguoiDung) {
    localStorage.setItem(KEY_USERS, JSON.stringify(dsNguoiDung));
}

let dangKy = true;

// Lấy các phần tử HTML
const form = document.getElementById("formDangKy");
const taiKhoan = document.getElementById("taiKhoan");
const email=document.getElementById("email");
const matKhau = document.getElementById("matKhau");
const loiTaiKhoan = document.getElementById("loiTaiKhoan");
const loiEmail=document.getElementById("loiEmail");
const loiMatKhau = document.getElementById("loiMatKhau");
const thongBao = document.getElementById("thongBao");
const nutDangKy = document.getElementById("nutDangKy");

// Chuyển đổi giữa đăng ký và đăng nhập
if (nutDangKy) {
    nutDangKy.addEventListener("click", function (e) {
        e.preventDefault();

        dangKy = !dangKy;

        document.querySelector(".form_dang_nhap h2").textContent =
            dangKy ? "Đăng Ký" : "Đăng Nhập";

        form.querySelector("button[type='submit']").textContent =
            dangKy ? "Đăng Ký" : "Đăng Nhập";

        nutDangKy.textContent =
            dangKy ? "Đăng nhập ngay" : "Đăng ký ngay";

        thongBao.textContent = "";
        loiTaiKhoan.textContent = "";
        loiMatKhau.textContent = "";
    });
}

// Xử lý đăng ký và đăng nhập
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const tenTaiKhoan = taiKhoan.value.trim();
        const matKhauNhap = matKhau.value.trim();

        loiTaiKhoan.textContent = "";
        loiMatKhau.textContent = "";
        thongBao.textContent = "";

        let hopLe = true;

        if (tenTaiKhoan === "") {
            loiTaiKhoan.textContent = "Vui lòng nhập tài khoản!";
            hopLe = false;
        }

        if (matKhauNhap === "") {
            loiMatKhau.textContent = "Vui lòng nhập mật khẩu!";
            hopLe = false;
        } else if (matKhauNhap.length < 6) {
            loiMatKhau.textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
            hopLe = false;
        }

        if (!hopLe) return;

        let dsNguoiDung = layDanhSachNguoiDung();

        // CHỨC NĂNG ĐĂNG KÝ
        if (dangKy) {
            const daTonTai = dsNguoiDung.some(
                user => user.taiKhoan.toLowerCase() === tenTaiKhoan.toLowerCase()
            );

            if (daTonTai) {
                loiTaiKhoan.textContent = "Tài khoản đã tồn tại!";
                return;
            }

            const nguoiDungMoi = {
                id: Date.now(),
                taiKhoan: tenTaiKhoan,
                matKhau: matKhauNhap,
                vaiTro: "user"
            };

            dsNguoiDung.push(nguoiDungMoi);
            luuDanhSachNguoiDung(dsNguoiDung);

            thongBao.style.color = "green";
            thongBao.textContent = "Đăng ký thành công! Hãy đăng nhập.";

            form.reset();
        }

        // CHỨC NĂNG ĐĂNG NHẬP
        else {
            const nguoiDung = dsNguoiDung.find(
                user =>
                    user.taiKhoan.toLowerCase() === tenTaiKhoan.toLowerCase() &&
                    user.matKhau === matKhauNhap
            );

            if (!nguoiDung) {
                thongBao.style.color = "red";
                thongBao.textContent = "Tài khoản hoặc mật khẩu không chính xác!";
                return;
            }

            // Lưu thông tin người đang đăng nhập
            localStorage.setItem(
                KEY_CURRENT_USER,
                JSON.stringify({
                    id: nguoiDung.id,
                    taiKhoan: nguoiDung.taiKhoan,
                    vaiTro: nguoiDung.vaiTro
                })
            );

            thongBao.style.color = "green";
            thongBao.textContent = "Đăng nhập thành công!";

            setTimeout(() => {
                window.location.href = "../Trang_chu/index.html";
            }, 1000);
        }
    });
}
