const KEY_GIO_HANG="gioHangAoDai";
// const PHI_VAN_CHUYEN=0;


// Thay số 0 nếu muốn tính phí vận chuyển.
function dinhDangTien(gia){
    return gia.toLocaleString("vi-VN")+"đ";
}
function layGioHang(){
    return JSON.parse(localStorage.getItem(KEY_GIO_HANG))||[];
}
function luuGioHang(gioHang){
    localStorage.setItem(KEY_GIO_HANG,JSON.stringify(gioHang));
}


function hienThiGioHang(){
    let gioHang=layGioHang(),
    bang=document.getElementById("danhSachGioHang");
    let thongBao=document.getElementById("gioHangTrong"),
    tamTinh=0,
    tongSoLuong=0;
    bang.innerHTML="";
    thongBao.style.display=gioHang.length===0?"block":"none";
    gioHang.forEach(
        function(item,index){
        let thanhTien=item.gia*item.soLuong;
        tamTinh+=thanhTien;
        tongSoLuong+=item.soLuong;
        let dong=document.createElement("tr");
        dong.innerHTML=`
            <td>${index+1}</td>
            <td class="cot-san-pham">
                <img src="${item.anh}" alt="${item.ten}">
                <span>${item.ten}</span>
            </td>
            <td>${dinhDangTien(item.gia)}</td>
            <td>
                <div class="nut-so-luong">
                    <button onclick="doiSoLuong(${item.id},-1)">−</button>
                    <span>${item.soLuong}</span>
                    <button onclick="doiSoLuong(${item.id},1)">+</button>
                </div>
            </td>
            <td>${dinhDangTien(thanhTien)}</td>
            <td>
                <button class="nut-xoa" onclick="xoaSanPham(${item.id})">Xóa</button>
            </td>
        `;
    bang.appendChild(dong);
 });
 document.getElementById("tamTinh").textContent=dinhDangTien(tamTinh);
//  document.getElementById("phiVanChuyen").textContent=dinhDangTien(PHI_VAN_CHUYEN);
 document.getElementById("tongTien").textContent=dinhDangTien(tamTinh+(gioHang.length));
}
function doiSoLuong(id,thayDoi){
    let gioHang=layGioHang();
    let sp=gioHang.find(
        function(item){
            return item.id===id;
        }
    );
    if(sp){
        sp.soLuong+=thayDoi;
        if(sp.soLuong<=0){
            gioHang=gioHang.filter(function(item){
                return item.id!==id;
            }
        );
    }
}


    luuGioHang(gioHang);
    hienThiGioHang();
}
function xoaSanPham(id){
    let gioHang=layGioHang().filter(
        function(item){
            return item.id!==id;
        }
    );


    luuGioHang(gioHang);
    hienThiGioHang();
}

function thanhToan() {

    // Kiểm tra giỏ hàng trống
    if (layGioHang().length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    // Kiểm tra đăng nhập
    let nguoiDung = localStorage.getItem("nguoiDungDangNhap");

    if (!nguoiDung) {
        alert("Bạn cần đăng nhập trước khi đặt hàng!");
        window.location.href = "../Dang_Nhap_Ky/index.html";
        return;
    }

    // Chuyển đến trang đặt hàng
    window.location.href = "../Dat_hang/index.html";
}

hienThiGioHang();
