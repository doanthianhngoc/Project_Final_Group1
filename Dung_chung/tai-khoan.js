
const KEY_CURRENT_USER = "nguoiDungDangNhap";

function khoiTaoTaiKhoan() {
    const container = document.getElementById("taiKhoanContainer");

    if (!container) return;

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem(KEY_CURRENT_USER) || "null"
        );
    } catch (error) {
        user = null;
    }

    container.innerHTML = "";

    // Nút hình người
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nut-mo-tai-khoan";
    button.innerHTML = '<i class="fa-regular fa-user"></i>';

    // Bảng thông tin
    const popup = document.createElement("div");
    popup.className = "popup-tai-khoan";

    if (user) {
        const hoTen = user.hoTen || user.taiKhoan || "Người dùng";
        const email = user.email || "Chưa có email";

        popup.innerHTML = `
            <div class="tai-khoan-dau">
                <div class="avatar-tai-khoan">
                    <i class="fa-solid fa-user"></i>
                </div>

                <h3 class="ten-tai-khoan"></h3>
                <p class="email-tai-khoan"></p>
            </div>

            <div class="tai-khoan-thong-tin">
                <p>
                    <i class="fa-regular fa-user"></i>
                    <span class="ten-hien-thi"></span>
                </p>

                <p>
                    <i class="fa-regular fa-envelope"></i>
                    <span class="email-hien-thi"></span>
                </p>
            </div>

            <div class="tai-khoan-cuoi">
                <button type="button" class="nut-dang-xuat">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Đăng xuất
                </button>
            </div>
        `;

        popup.querySelector(".ten-tai-khoan").textContent = hoTen;
        popup.querySelector(".email-tai-khoan").textContent = email;
        popup.querySelector(".ten-hien-thi").textContent = hoTen;
        popup.querySelector(".email-hien-thi").textContent = email;

        popup.querySelector(".nut-dang-xuat").addEventListener("click", function () {
            localStorage.removeItem(KEY_CURRENT_USER);
            window.location.reload();
        });

    } else {
        popup.innerHTML = `
            <div class="tai-khoan-chua-dang-nhap">
                <p>Bạn chưa đăng nhập</p>
                <a href="../Dang_Nhap_Ky/index.html">
                    Đăng nhập / Đăng ký
                </a>
            </div>
        `;
    }

    container.append(button, popup);

    // Mở / đóng bảng
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        popup.classList.toggle("hien-thi");
    });

    popup.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Nhấn bên ngoài để đóng
    document.addEventListener("click", function () {
        popup.classList.remove("hien-thi");
    });
}

document.addEventListener("DOMContentLoaded", khoiTaoTaiKhoan);
