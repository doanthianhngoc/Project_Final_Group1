const KEY_USERS = "taiKhoanAoDai";
const KEY_CURRENT_USER = "nguoiDungDangNhap";


const $ = id => document.getElementById(id);
const form = $("formDangKy");
const thongBao = $("thongBao");
let dangKy = true;


function layNguoiDung() {
    try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; }
    catch { return []; }
}
function luuNguoiDung(ds) {
    localStorage.setItem(KEY_USERS, JSON.stringify(ds));
}
function hienLoi(id, text) { $(id).textContent = text; }
function xoaLoi() {
    ["loiHoTen","loiTaiKhoan","loiEmail","loiMatKhau","loiNhapLai"].forEach(id => hienLoi(id,""));
    thongBao.textContent = "";
    thongBao.className = "";
}
function doiCheDo(isRegister) {
    dangKy = isRegister;
    form.reset();
    xoaLoi();
    $("tieuDeForm").textContent = dangKy ? "Đăng ký" : "Đăng nhập";
    $("moTaForm").textContent = dangKy ? "Tạo tài khoản để trải nghiệm Áo Dài Việt." : "Chào mừng bạn quay trở lại!";
    $("btnSubmit").textContent = dangKy ? "Đăng ký" : "Đăng nhập";
    $("nhomHoTen").hidden = !dangKy;
    $("nhomEmail").hidden = !dangKy;
    $("nhomNhapLai").hidden = !dangKy;
    $("dongChuyenDoi").textContent = dangKy ? "Đã có tài khoản?" : "Chưa có tài khoản?";
    $("nutChuyenDoi").textContent = dangKy ? "Đăng nhập ngay" : "Đăng ký ngay";
}
$("nutChuyenDoi").addEventListener("click", e => {
    e.preventDefault();
    doiCheDo(!dangKy);
});


form.addEventListener("submit", e => {
    e.preventDefault();
    xoaLoi();


    const hoTen = $("hoTen").value.trim();
    const taiKhoan = $("taiKhoan").value.trim();
    const email = $("email").value.trim().toLowerCase();
    const matKhau = $("matKhau").value;
    const nhapLai = $("nhapLaiMatKhau").value;
    let hopLe = true;


    if (!taiKhoan) { hienLoi("loiTaiKhoan","Vui lòng nhập tên đăng nhập."); hopLe = false; }
    if (!matKhau || matKhau.length < 6) { hienLoi("loiMatKhau","Mật khẩu phải có ít nhất 6 ký tự."); hopLe = false; }


    const ds = layNguoiDung();


    if (dangKy) {
        if (!hoTen) { hienLoi("loiHoTen","Vui lòng nhập họ tên."); hopLe = false; }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { hienLoi("loiEmail","Vui lòng nhập email hợp lệ."); hopLe = false; }
        if (matKhau !== nhapLai) { hienLoi("loiNhapLai","Mật khẩu nhập lại không khớp."); hopLe = false; }
        if (!hopLe) return;


        if (ds.some(u => (u.taiKhoan || "").toLowerCase() === taiKhoan.toLowerCase())) {
            hienLoi("loiTaiKhoan","Tên đăng nhập đã tồn tại."); return;
        }
        if (ds.some(u => (u.email || "").toLowerCase() === email)) {
            hienLoi("loiEmail","Email đã được đăng ký."); return;
        }


        ds.push({ id: Date.now(), hoTen, taiKhoan, email, matKhau, vaiTro: "Khách hàng" });
        luuNguoiDung(ds);
        doiCheDo(false);
        $("taiKhoan").value = taiKhoan;
        thongBao.textContent = "Đăng ký thành công! Hãy đăng nhập bằng tài khoản vừa tạo.";
        thongBao.className = "thanh_cong";
        return;
    }


    if (!hopLe) return;
    const nhapDangNhap = taiKhoan.toLowerCase();
    const user = ds.find(u =>
        ((u.taiKhoan || "").toLowerCase() === nhapDangNhap ||
         (u.email || "").toLowerCase() === nhapDangNhap) &&
        u.matKhau === matKhau
    );
    if (!user) {
        thongBao.textContent = "Tên đăng nhập/email hoặc mật khẩu không chính xác.";
        thongBao.className = "that_bai";
        return;
    }


    localStorage.setItem(KEY_CURRENT_USER, JSON.stringify({
        id: user.id, hoTen: user.hoTen || user.taiKhoan,
        taiKhoan: user.taiKhoan, email: user.email || "",
        vaiTro: user.vaiTro || "Khách hàng"
    }));
    thongBao.textContent = "Đăng nhập thành công! Đang chuyển về trang chủ...";
    thongBao.className = "thanh_cong";
    setTimeout(() => window.location.href = "../Trang_chu/index.html", 700);
});


// Nếu đã có tài khoản trong máy này thì hiện đăng nhập; nếu chưa có thì hiện đăng ký.
doiCheDo(layNguoiDung().length > 0 ? false : true);
