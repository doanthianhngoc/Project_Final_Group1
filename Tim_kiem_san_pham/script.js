function timSanPham() {
    // Lay tu khoa tim kiem
    let tuKhoa = document.getElementById("tuKhoa")
        .value.toLowerCase().trim();

    // Lay tat ca san pham
    let sanPham = document.querySelectorAll(".san-pham");
    let dem = 0;

    // Kiem tra tung san pham
    sanPham.forEach(function(sp) {
        let ten = sp.querySelector("h3")
            .textContent.toLowerCase().trim();

        if (ten.includes(tuKhoa) && tuKhoa !== "") {
            sp.style.display = "";
            dem++;
        } else if (tuKhoa === "") {
            sp.style.display = "";
            dem++;
        } else {
            sp.style.display = "none";
        }
    });

    // Hien thi ket qua
    let thongBao = document.getElementById("thongBao");

    if (dem === 0) {
        thongBao.textContent = "Không tìm thấy sản phẩm phù hợp!";
    } else {
        thongBao.textContent = "Tìm thấy " + dem + " sản phẩm.";
    }
}

// Tim nhanh theo danh muc
function timNhanh(tuKhoa) {
    document.getElementById("tuKhoa").value = tuKhoa;
    timSanPham();
}