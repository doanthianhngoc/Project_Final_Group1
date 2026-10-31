// Danh sách sản phẩm
const list_san_pham = [
{
    id:1,anh:"../img/aodai1.jpg",
    ten:"Áo dài truyền thống",
    gia:450000,category:"truyen-thong"
},
{
    id:2,
    anh:"../img/aodai2.jpg",
    ten:"Áo dài cách tân",
    gia:550000,
    category:"cach-tan"
},
{
    id:3,
    anh:"../img/aodai3.jpg",
    ten:"Áo dài lụa",
    gia:1550000,
    category:"lua"
},
{
    id:4,
    anh:"../img/aodai4.jpg",
    ten:"Áo dài gấm",
    gia:2550000,
    category:"gam"
},
{
    id:5,
    anh:"../img/aodai5.jpg",
    ten:"Áo dài cách tân hoa",
    gia:750000,
    category:"cach-tan"
},
{
    id:6,
    anh:"../img/aodai6.jpg",
    ten:"Áo dài truyền thống đỏ",
    gia:950000,
    category:"truyen-thong"
},
{
    id:7,
    anh:"../img/aodai7.jpg",
    ten:"Áo dài cách tân hoa",
    gia:850000,
    category:"cach-tan"
},
{
    id:8,
    anh:"../img/aodai8.jpg",
    ten:"Áo dài truyền thống",
    gia:1150000,
    category:"truyen-thong"
},
{
    id:9,
    anh:"../img/aodai9.jpg",
    ten:"Áo dài lụa",
    gia:1850000,
    category:"lua"
},
{
    id:10,
    anh:"../img/aodai10.jpg",
    ten:"Áo dài gấm",
    gia:2850000,
    category:"gam"
},
{
    id:11,
    anh:"../img/aodai11.jpg",
    ten:"Áo dài cách tân hoa",
    gia:550000,
    category:"cach-tan"
},
{
    id:12,
    anh:"../img/aodai12.jpg",
    ten:"Áo dài lụa",
    gia:6850000,
    category:"lua"
},
{
    id:13,
    anh:"../img/aodai10.jpg",
    ten:"Áo dài gấm",
    gia:3850000,
    category:"gam"
},
{
    id:14,
    anh:"../img/aodai14.jpg",
    ten:"Áo dài cách truyền thống",
    gia:50000,
    category:"truyen-thong"
},
{
    id:15,
    anh:"../img/aodai15.jpg",
    ten:"Áo dài cách tân hoa",
    gia:5550000,
    category:"cach-tan"
},
{
    id:16,
    anh:"../img/aodai16.jpg",
    ten:"Áo dài gấm",
    gia:9850000,
    category:"gam"
},
{
    id:17,
    anh:"../img/aodai17.jpg",
    ten:"Áo dài lụa",
    gia:6850000,
    category:"lua"
},
{
    id:18,
    anh:"../img/aodai18.jpg",
    ten:"Áo dài cách tân hoa",
    gia:15550000,
    category:"cach-tan"
},


];


const KEY_GIO_HANG="gioHangAoDai";
const SO_SAN_PHAM_MOI_TRANG=6;
let danhSachDangHienThi=list_san_pham;
let trangHienTai=1;

function dinhDangTien(gia){ 
    return gia.toLocaleString("vi-VN")+"đ"; 
}
function layGioHang(){ 
    return JSON.parse(localStorage.getItem(KEY_GIO_HANG)) || []; 
}

function san_pham(){
    let khung=document.getElementById("aodai");
    let batDau=(trangHienTai-1)*SO_SAN_PHAM_MOI_TRANG;
    let ds=danhSachDangHienThi.slice(batDau,batDau+SO_SAN_PHAM_MOI_TRANG);
    khung.innerHTML="";
    if(ds.length===0){
        khung.innerHTML='<p class="khong-co-sp">Không tìm thấy sản phẩm phù hợp.</p>';
        document.getElementById("phanTrang").innerHTML="";
        return;
    }
    ds.forEach(function(item){
        let the=document.createElement("div"); 
        the.className="col-md-6 col-lg-4 mb-4";
        the.innerHTML = `
            <div class="card h-100">

                <!-- Bấm vào ảnh để xem chi tiết -->
                <img src="${item.anh}"
                    class="card-img-top anh-xem-chi-tiet"
                    alt="${item.ten}"
                    onclick="xemChiTiet(${item.id})"
                    title="Nhấn để xem chi tiết">

                <div class="card-body text-center">

                    <!-- Bấm vào tên để xem chi tiết -->
                    <h5 class="ten-xem-chi-tiet"
                        onclick="xemChiTiet(${item.id})">
                        ${item.ten}
                    </h5>

                    <p class="gia-san-pham">
                        ${dinhDangTien(item.gia)}
                    </p>

                    <button class="btn-them-gio"
                            onclick="themVaoGio(${item.id})">

                        <i class="fa-solid fa-cart-shopping"></i>
                        Thêm vào giỏ

                    </button>

                </div>
            </div>
        `;
        khung.appendChild(the);
    });
    hienThiPhanTrang();
}


function locSanPham(){
    let dm=document.querySelector('input[name="category"]:checked').value;
    let gia=document.querySelector('input[name="price"]:checked').value;
    danhSachDangHienThi=list_san_pham.filter(function(item){
        let dungDM=(dm==="all"||item.category===dm),
        dungGia=true;
        if(gia==="under300") dungGia=item.gia<300000;
        if(gia==="300-500") dungGia=item.gia>=300000&&item.gia<=500000;
        if(gia==="500-700") dungGia=item.gia>500000&&item.gia<=700000;
        if(gia==="over700") dungGia=item.gia>700000;
        return dungDM&&dungGia;
    });
    trangHienTai=1;
    document.getElementById("thongBaoLoc").textContent="Tìm thấy "+danhSachDangHienThi.length+" sản phẩm.";
    san_pham();
}


function boLoc(){
    document.querySelector('input[name="category"][value="all"]').checked=true;
    document.querySelector('input[name="price"][value="all"]').checked=true;
    danhSachDangHienThi=list_san_pham; 
    trangHienTai=1;
    document.getElementById("thongBaoLoc").textContent=""; 
    san_pham();
}


function hienThiPhanTrang(){
    let tongTrang=Math.ceil(danhSachDangHienThi.length/SO_SAN_PHAM_MOI_TRANG);
    let khung=document.getElementById("phanTrang"); 
    khung.innerHTML="";
    for(let i=1;i<=tongTrang;i++){
        let nut=document.createElement("button"); 
        nut.textContent=i;
        if(i===trangHienTai) nut.classList.add("dang-chon");
        nut.onclick=function(){
            trangHienTai=i;
            san_pham();
            window.scrollTo(0,0);
        };
        khung.appendChild(nut);
    }
}
function themVaoGio(id){
    let gioHang=layGioHang();
    let sp=list_san_pham.find(
        function(item){
            return item.id===id;
        }
    );
    if(!sp){
        alert("Không tìm thấy sản phẩm!");
        return;
    }
    let daCo=gioHang.find(
        function(item){
            return item.id===id;
        }
    );
    if(daCo){
        daCo.soLuong+=1;
    }
    else{
        gioHang.push({
                id:sp.id,anh:sp.anh,ten:sp.ten,gia:sp.gia,soLuong:1
            }
        );
    }
    localStorage.setItem(KEY_GIO_HANG,JSON.stringify(gioHang));
    // Chuyển thẳng sang trang giỏ hàng sau khi lưu.
    window.location.href="../Gio_hang/index.html";
}
function capNhatSoLuongGioHang(){
    let tong=0;
    layGioHang().forEach(
        function(item){
            tong+=item.soLuong;
        }
    );
}

san_pham();
capNhatSoLuongGioHang();


// Thông tin chi tiết bổ sung cho từng sản phẩm
const thongTinChiTiet = {
    1: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài truyền thống với kiểu dáng thanh lịch, phù hợp dịp lễ, Tết và sự kiện."
    },

    2: {
        chatLieu: "Lụa mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Thiết kế cách tân trẻ trung, phù hợp với nhiều hoạt động."
    },

    3: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Chất liệu lụa mềm mại, tạo cảm giác nhẹ nhàng và duyên dáng."
    },

    4: {
        chatLieu: "Gấm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài gấm có họa tiết dệt nổi, tạo vẻ sang trọng."
    },

    5: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài cách tân họa tiết hoa, mang phong cách trẻ trung."
    },

    6: {
        chatLieu: "Lụa",
        mauSac: "Đỏ",
        moTa: "Áo dài truyền thống màu đỏ, thích hợp cho dịp lễ hội."
    },

    7: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Thiết kế cách tân kết hợp họa tiết hoa."
    },

    8: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài truyền thống với phom dáng kín đáo và thanh lịch."
    },

    9: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài lụa mềm mại, phù hợp các buổi tiệc và sự kiện."
    },

    10: {
        chatLieu: "Gấm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài gấm với bề mặt vải có hoa văn."
    },

    11: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài cách tân họa tiết hoa, phù hợp đi chơi hoặc dự sự kiện."
    },

    12: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài lụa có độ rũ mềm, tạo vẻ duyên dáng."
    },

    13: {
        chatLieu: "Gấm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Mẫu áo dài gấm có họa tiết dệt, thích hợp dịp trang trọng."
    },

    14: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài phong cách truyền thống, thiết kế đơn giản và thanh lịch."
    },

    15: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài cách tân họa tiết hoa, tạo phong cách trẻ trung."
    },

    16: {
        chatLieu: "Gấm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài gấm với họa tiết nổi bật, phù hợp dịp lễ và sự kiện."
    },

    17: {
        chatLieu: "Lụa",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài lụa mềm mại, mang vẻ nhẹ nhàng và duyên dáng."
    },

    18: {
        chatLieu: "Vải mềm",
        mauSac: "Theo hình ảnh sản phẩm",
        moTa: "Áo dài cách tân với kiểu dáng hiện đại."
    }
};


// Chuyển mã danh mục thành tên danh mục
function tenDanhMuc(category) {

    const danhMuc = {
        "truyen-thong": "Áo dài truyền thống",
        "cach-tan": "Áo dài cách tân",
        "gam": "Áo dài gấm",
        "lua": "Áo dài lụa"
    };

    return danhMuc[category] || "Chưa phân loại";
}


// Hàm hiển thị chi tiết sản phẩm
function xemChiTiet(id) {

    // Tìm sản phẩm theo ID
    const sanPham = list_san_pham.find(function(item) {
        return item.id === Number(id);
    });

    if (!sanPham) {
        alert("Không tìm thấy sản phẩm!");
        return;
    }

    // Lấy thông tin bổ sung
    const thongTin = thongTinChiTiet[sanPham.id] || {
        chatLieu: "Đang cập nhật",
        mauSac: "Đang cập nhật",
        moTa: "Thông tin sản phẩm đang được cập nhật."
    };

    const noiDung = document.getElementById("noiDungChiTiet");
    const hopThoai = document.getElementById("hopThoaiChiTiet");

    if (!noiDung || !hopThoai) {
        console.error("Không tìm thấy hộp thoại chi tiết!");
        return;
    }

    // Hiển thị thông tin sản phẩm
    noiDung.innerHTML = `
        <div class="chi-tiet-khung">

            <div class="chi-tiet-anh">
                <img src="${sanPham.anh}" alt="${sanPham.ten}">
            </div>

            <div class="chi-tiet-thong-tin">

                <p class="chi-tiet-nhan">ÁO DÀI VIỆT</p>

                <h2>${sanPham.ten}</h2>

                <p class="chi-tiet-gia">
                    ${dinhDangTien(sanPham.gia)}
                </p>

                <p>
                    <strong>Chất liệu:</strong>
                    ${thongTin.chatLieu}
                </p>

                <p>
                    <strong>Danh mục:</strong>
                    ${tenDanhMuc(sanPham.category)}
                </p>

                <p>
                    <strong>Màu sắc:</strong>
                    ${thongTin.mauSac}
                </p>

                <p>
                    <strong>Kích thước:</strong>
                    S, M, L, XL (tùy mẫu)
                </p>

                <p>
                    <strong>Mô tả:</strong>
                    ${thongTin.moTa}
                </p>

                <button class="btn-them-gio"
                        onclick="themVaoGio(${sanPham.id})">

                    <i class="fa-solid fa-cart-shopping"></i>
                    Thêm vào giỏ

                </button>

            </div>
        </div>
    `;

    // Mở hộp thoại
    hopThoai.classList.add("dang-mo");

    // Không cho cuộn trang phía sau
    document.body.style.overflow = "hidden";
}


// Hàm đóng hộp thoại
function dongChiTiet() {

    const hopThoai = document.getElementById("hopThoaiChiTiet");

    if (hopThoai) {
        hopThoai.classList.remove("dang-mo");
    }

    document.body.style.overflow = "";
}


// Đóng hộp thoại khi bấm vào vùng nền tối
function dongChiTietNeuBamNen(event) {

    if (event.target.id === "hopThoaiChiTiet") {
        dongChiTiet();
    }
}
