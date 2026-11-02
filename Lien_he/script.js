
const contactForm = document.getElementById("contactForm");
const KEY_LIEN_HE = "phanHoiLienHe";

if (contactForm) {
    // Dùng capture để chặn các xử lý submit khác của form
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const hoTen = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const noiDung = document.getElementById("message").value.trim();
        const formNotice = document.getElementById("formNotice");

        if (hoTen === "" || email === "" || noiDung === "") {
            formNotice.textContent =
                "Vui lòng nhập đầy đủ họ tên, email và nội dung.";
            formNotice.className = "error";
            return;
        }

        const kiemTraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!kiemTraEmail.test(email)) {
            formNotice.textContent = "Vui lòng nhập địa chỉ email hợp lệ.";
            formNotice.className = "error";
            document.getElementById("email").focus();
            return;
        }

        let danhSach = [];

        try {
            danhSach = JSON.parse(
                localStorage.getItem(KEY_LIEN_HE)
            ) || [];
        } catch (error) {
            danhSach = [];
        }

        danhSach.push({
            id: Date.now(),
            hoTen: hoTen,
            email: email,
            noiDung: noiDung,
            ngayGui: new Date().toLocaleString("vi-VN")
        });

        // Lưu phản hồi
        localStorage.setItem(
            KEY_LIEN_HE,
            JSON.stringify(danhSach)
        );

        // Hiển thị xác nhận
        alert(
            "Gửi liên hệ thành công!\n\n" +
            "Cảm ơn bạn đã liên hệ với Áo Dài Việt."
        );

        // Xóa nội dung vừa nhập
        contactForm.reset();

        formNotice.textContent = "Gửi liên hệ thành công!";
        formNotice.className = "success";

        // Không chuyển sang trang quản lý liên hệ
    }, true);
}
