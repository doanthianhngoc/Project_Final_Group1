
/* 1. Khai bao mang san pham */
let sanPham = [
    {
        id: 1,
        ten: "Áo dài truyền thống",
        gia: "450.000đ",
        hinh: "s11.jpg",
        danhGia: 24,
        moTa: "Áo dài truyền thống với thiết kế thanh lịch, duyên dáng và tinh tế."
    },
    {
        id: 2,
        ten: "Áo dài cách tân",
        gia: "520.000đ",
        hinh: "s12.jpg",
        danhGia: 18,
        moTa: "Áo dài cách tân hiện đại, trẻ trung và phù hợp với nhiều dịp."
    },
    {
        id: 3,
        ten: "Áo dài gấm cao cấp",
        gia: "680.000đ",
        hinh: "s13.jpg",
        danhGia: 15,
        moTa: "Áo dài gấm cao cấp với chất liệu sang trọng và thiết kế tinh tế."
    },
    {
        id: 4,
        ten: "Áo dài dự tiệc",
        gia: "420.000đ",
        hinh: "s15.jpg",
        danhGia: 12,
        moTa: "Áo dài dự tiệc duyên dáng, nổi bật trong những dịp đặc biệt."
    }
];


/* 2. Lay vi tri hien thi san pham trong HTML */
let productList = document.getElementById("productList");


/* 3. Duyet mang va hien thi san pham */
if (productList != null) {

    sanPham.forEach(function(sp) {

        productList.innerHTML += `
            <a href="../Chi_tiet_san_pham/index.html?id=${sp.id}"
            class="product-link">

                <div class="product">

                    <img src="${sp.hinh}" alt="${sp.ten}">

                    <h3>${sp.ten}</h3>

                    <p class="price">${sp.gia}</p>

                    <p class="rating">
                        ★★★★★ <span>(${sp.danhGia})</span>
                    </p>

                </div>

            </a>
        `;

    });

}
