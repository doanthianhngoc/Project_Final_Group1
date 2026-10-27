let list_san_pham=[
    {   id:1,
        anh:"../img/aodai1.jpg",
        ten:"Áo dài truyền thống",
        gia:450000,
        icon:"fa-solid fa-cart-shopping"   
    },
    {
        id:2,
        anh:"../img/aodai2.jpg",
        ten:"Áo dài cất tận",
        gia:550000,
        icon:"fa-solid fa-cart-shopping"  
    },
    {
        id:3,
        anh:"../img/aodai3.jpg",
        ten:"Áo dài lụa",
        gia:1550000,
        icon:"fa-solid fa-cart-shopping"
    },
    {
        id:4,
        anh:"../img/aodai4.jpg",
        ten:"Áo dài Gấm",
        gia:2550000,
        icon:"fa-solid fa-cart-shopping"
    },
    {
        id:5,
        anh:"../img/aodai5.jpg",
        ten:"Áo dài cách tân",
        gia:750000,
        icon:"fa-solid fa-cart-shopping"  
    },
    {
        id:6,
        anh:"../img/aodai6.jpg",
        ten:"Áo dài cách tân",
        gia:950000,
        icon:"fa-solid fa-cart-shopping"  
    },

]


function san_pham() {
    let sp = ''; // 1. Khởi tạo chuỗi rỗng ban đầu

    for (let i = 0; i < list_san_pham.length; i++) {
        let item = list_san_pham[i];

        // 2. Dùng '+=' để cộng dồn TẤT CẢ sản phẩm vào biến sp
        sp += '<div class="col-md-4 mb-4">';
        sp += '  <div class="card h-100">';
        sp += '    <img src="' + item.anh + '" class="card-img-top" alt="' + item.ten + '">';
        sp += '    <div class="card-body text-center">';
        sp += '      <h5 class="card-title">' + item.ten + '</h5>';
        sp += '      <p class="card-text text-danger fw-bold">' + item.gia.toLocaleString('vi-VN') + ' VNĐ</p>';
        sp += '      <button class="btn btn-primary">';
        sp += '        <i class="' + item.icon + '" style="color: red;"></i> Thêm vào giỏ';
        sp += '      </button>';
        sp += '    </div>';
        sp += '  </div>';
        sp += '</div>';
    }

    // 3. Thay thế toàn bộ nội dung HTML bằng biến sp đã tích lũy đủ 6 sản phẩm
    document.getElementById('aodai').innerHTML = sp;
}

// Gọi hàm để chạy khi tải trang
san_pham();