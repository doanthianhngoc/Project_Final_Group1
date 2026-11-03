
/* 1. Lấy các phần tử HTML */
const khungQuanLy = document.getElementById("khungQuanLy");
const noiDungTongQuan = document.getElementById("noiDungTongQuan");


/* 2. Khai báo đường dẫn các trang quản lý */
const cacTrang = {
    donhang: "../Quan_ly_don_hang/index.html",

    nguoidung: "../Quan_ly_nguoi_dung/index.html",

    phanhoi: "../Quan_ly_phan_hoi/index.html"
};


/* 3. Hàm hiển thị trang quản lý */
function hienThiTrang(loai, nut) {

    // Xóa trạng thái active của các mục menu
    document.querySelectorAll(".menu a").forEach(function(a) {
        a.classList.remove("active");
    });

    // Thêm active cho mục đang chọn
    if (nut) {
        nut.classList.add("active");
    }

    // Nếu chọn tổng quan
    if (loai === "tongquan") {

        khungQuanLy.style.display = "none";

        noiDungTongQuan.style.display = "block";

        return;
    }

    // Kiểm tra đường dẫn
    if (!cacTrang[loai]) {
        return;
    }

    // Ẩn trang tổng quan
    noiDungTongQuan.style.display = "none";

    // Hiện iframe
    khungQuanLy.style.display = "block";

    // Chỉ tải lại khi chuyển sang trang khác
    if (khungQuanLy.getAttribute("src") !== cacTrang[loai]) {
        khungQuanLy.src = cacTrang[loai];
    }
}


/* 4. Hàm mở trang từ các thẻ chức năng */
function moTrang(loai) {

    const cacNut = document.querySelectorAll(".menu a");

    let nutDuocChon = null;

    if (loai === "donhang") {
        nutDuocChon = cacNut[1];
    }

    else if (loai === "nguoidung") {
        nutDuocChon = cacNut[2];
    }

    else if (loai === "phanhoi") {
        nutDuocChon = cacNut[3];
    }

    hienThiTrang(loai, nutDuocChon);
}
