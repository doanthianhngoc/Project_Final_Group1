
const KEY_USERS = "taiKhoanAoDai";

// Lấy các phần tử HTML
const form = document.getElementById("userForm");
const rows = document.getElementById("rows");
const message = document.getElementById("message");

const search = document.getElementById("search");
const userId = document.getElementById("userId");
const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("role");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

// Đọc dữ liệu an toàn từ localStorage
function docNguoiDung() {
    try {
        const data = JSON.parse(
            localStorage.getItem(KEY_USERS) || "[]"
        );

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Không thể đọc dữ liệu người dùng:", error);
        return [];
    }
}

let users = docNguoiDung();

// Lưu danh sách người dùng
function luuNguoiDung() {
    try {
        localStorage.setItem(KEY_USERS, JSON.stringify(users));
        return true;
    } catch (error) {
        console.error("Không thể lưu dữ liệu:", error);
        hienThongBao("Không thể lưu dữ liệu người dùng!", "danger");
        return false;
    }
}

// Hiển thị thông báo
function hienThongBao(noiDung, loai = "success") {
    message.textContent = noiDung;
    message.className = `alert alert-${loai}`;
}

// Xóa thông báo
function xoaThongBao() {
    message.textContent = "";
    message.className = "alert d-none";
}

// Hiển thị danh sách người dùng
function hienThiNguoiDung() {
    const tuKhoa = search.value.trim().toLowerCase();

    // Tìm theo tài khoản hoặc email
    const danhSach = users.filter(user =>
        String(user.taiKhoan || "")
            .toLowerCase()
            .includes(tuKhoa)
    );

    // Xóa các dòng cũ
    rows.replaceChildren();

    // Nếu không có kết quả
    if (danhSach.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 4;
        td.className = "text-center text-muted";
        td.textContent = tuKhoa
            ? "Không tìm thấy người dùng phù hợp."
            : "Chưa có người dùng.";

        tr.appendChild(td);
        rows.appendChild(tr);
        return;
    }

    // Tạo từng dòng trong bảng
    danhSach.forEach((user, index) => {
        const tr = document.createElement("tr");

        const tdSTT = document.createElement("td");
        tdSTT.textContent = index + 1;

        const tdTaiKhoan = document.createElement("td");
        tdTaiKhoan.textContent = user.taiKhoan || "";

        const tdVaiTro = document.createElement("td");
        tdVaiTro.textContent = user.vaiTro || "Khách hàng";

        const tdThaoTac = document.createElement("td");

        // Nút sửa
        const btnSua = document.createElement("button");
        btnSua.type = "button";
        btnSua.className = "btn btn-warning btn-sm mr-2 mb-1";
        btnSua.textContent = "Sửa";

        btnSua.addEventListener("click", () => {
            suaNguoiDung(user.id);
        });

        // Nút xóa
        const btnXoa = document.createElement("button");
        btnXoa.type = "button";
        btnXoa.className = "btn btn-danger btn-sm mb-1";
        btnXoa.textContent = "Xóa";

        btnXoa.addEventListener("click", () => {
            xoaNguoiDung(user.id);
        });

        tdThaoTac.append(btnSua, btnXoa);
        tr.append(tdSTT, tdTaiKhoan, tdVaiTro, tdThaoTac);
        rows.appendChild(tr);
    });
}

// Thêm người dùng hoặc cập nhật người dùng
form.addEventListener("submit", function (event) {
    // Ngăn trình duyệt tải lại trang khi gửi form
    event.preventDefault();
    xoaThongBao();

    const id = userId.value;
    const taiKhoan = email.value.trim();
    const matKhau = password.value;
    const vaiTro = role.value;

    // Kiểm tra thông tin bắt buộc
    if (taiKhoan === "") {
        hienThongBao("Vui lòng nhập tài khoản hoặc email!", "warning");
        email.focus();
        return;
    }

    // Kiểm tra tài khoản bị trùng
    // Bỏ qua chính người dùng đang sửa
    const trungTaiKhoan = users.some(user =>
        String(user.taiKhoan || "").toLowerCase() === taiKhoan.toLowerCase()
        && String(user.id) !== id
    );

    if (trungTaiKhoan) {
        hienThongBao("Tài khoản này đã tồn tại!", "danger");
        email.focus();
        return;
    }

    // Nếu có ID thì đang sửa
    if (id !== "") {
        const index = users.findIndex(
            user => String(user.id) === id
        );

        if (index === -1) {
            hienThongBao("Không tìm thấy người dùng cần sửa!", "danger");
            return;
        }

        // Tạo bản sao để tránh thay đổi dữ liệu trước khi lưu thành công
        const usersCu = [...users];

        users[index] = {
            ...users[index],
            taiKhoan: taiKhoan,
            vaiTro: vaiTro
        };

        // Chỉ cập nhật mật khẩu nếu người dùng nhập mật khẩu mới
        if (matKhau !== "") {
            if (matKhau.length < 6) {
                hienThongBao(
                    "Mật khẩu mới phải có ít nhất 6 ký tự!",
                    "warning"
                );
                return;
            }

            users[index].matKhau = matKhau;
        }

        if (!luuNguoiDung()) {
            users = usersCu;
            return;
        }

        hienThongBao("Cập nhật người dùng thành công!");

    } else {
        // Khi thêm mới, bắt buộc nhập mật khẩu
        if (matKhau === "") {
            hienThongBao("Vui lòng nhập mật khẩu!", "warning");
            password.focus();
            return;
        }

        if (matKhau.length < 6) {
            hienThongBao(
                "Mật khẩu phải có ít nhất 6 ký tự!",
                "warning"
            );
            password.focus();
            return;
        }

        const userMoi = {
            id: Date.now(),
            taiKhoan: taiKhoan,
            matKhau: matKhau,
            vaiTro: vaiTro
        };

        users.push(userMoi);

        if (!luuNguoiDung()) {
            users.pop();
            return;
        }

        hienThongBao("Thêm người dùng thành công!");
    }

    hienThiNguoiDung();
    form.reset();
    userId.value = "";
    formTitle.textContent = "Thêm người dùng";
    saveButton.textContent = "Thêm tài khoản";
});

// Đưa dữ liệu người dùng lên form để sửa
function suaNguoiDung(id) {
    const user = users.find(
        item => String(item.id) === String(id)
    );

    if (!user) {
        hienThongBao("Không tìm thấy người dùng!", "danger");
        return;
    }

    userId.value = user.id;
    email.value = user.taiKhoan;
    password.value = "";
    role.value = user.vaiTro || "Khách hàng";

    formTitle.textContent = "Sửa người dùng";
    saveButton.textContent = "Lưu thay đổi";

    xoaThongBao();
    window.scrollTo({ top: 0, behavior: "smooth" });
    email.focus();
}

// Xóa người dùng
function xoaNguoiDung(id) {
    const user = users.find(
        item => String(item.id) === String(id)
    );

    if (!user) {
        hienThongBao("Không tìm thấy người dùng!", "danger");
        return;
    }

    if (!confirm(`Bạn có chắc chắn muốn xóa tài khoản "${user.taiKhoan}" không?`)) {
        return;
    }

    const usersCu = users;

    users = users.filter(
        item => String(item.id) !== String(id)
    );

    if (!luuNguoiDung()) {
        users = usersCu;
        return;
    }

    // Nếu đang sửa chính người dùng vừa xóa thì làm sạch form
    if (userId.value === String(id)) {
        form.reset();
        userId.value = "";
        formTitle.textContent = "Thêm người dùng";
        saveButton.textContent = "Thêm tài khoản";
    }

    hienThiNguoiDung();
    hienThongBao("Xóa người dùng thành công!");
}

// Nút làm mới form
resetButton.addEventListener("click", function () {
    form.reset();

    userId.value = "";
    formTitle.textContent = "Thêm người dùng";
    saveButton.textContent = "Thêm tài khoản";

    xoaThongBao();
});

// Tìm kiếm khi người dùng nhập từ khóa
search.addEventListener("input", hienThiNguoiDung);

// Hiển thị dữ liệu khi mở trang
hienThiNguoiDung();
