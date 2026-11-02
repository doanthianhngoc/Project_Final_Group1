const KEY_LIEN_HE = "phanHoiLienHe";

const bang = document.getElementById("danhSachPhanHoi");
const timKiem = document.getElementById("timKiem");
const thongBao = document.getElementById("thongBao");
const hopSua = document.getElementById("hopSua");
const formSua = document.getElementById("formSua");
const idPhanHoi = document.getElementById("idPhanHoi");
const hoTen = document.getElementById("hoTen");
const email = document.getElementById("email");
const noiDung = document.getElementById("noiDung");

function docPhanHoi() {
    return JSON.parse(localStorage.getItem(KEY_LIEN_HE)) || [];
}

let phanHoi = docPhanHoi();

function luuPhanHoi() {
    localStorage.setItem(KEY_LIEN_HE, JSON.stringify(phanHoi));
}

function hienThongBao(noiDungThongBao) {
    thongBao.textContent = noiDungThongBao;
    window.setTimeout(function () {
        thongBao.textContent = "";
    }, 2500);
}

function hienThiPhanHoi() {
    const tuKhoa = timKiem.value.trim().toLowerCase();
    const ketQua = phanHoi.filter(function (muc) {
        return (
            String(muc.hoTen || "").toLowerCase().includes(tuKhoa) ||
            String(muc.email || "").toLowerCase().includes(tuKhoa) ||
            String(muc.noiDung || "").toLowerCase().includes(tuKhoa)
        );
    });

    bang.replaceChildren();

    if (ketQua.length === 0) {
        const dongTrong = document.createElement("tr");
        dongTrong.innerHTML = `
            <td colspan="6" class="khong-co-du-lieu">
                ${tuKhoa ? "Không tìm thấy phản hồi phù hợp." : "Chưa có phản hồi liên hệ."}
            </td>`;
        bang.appendChild(dongTrong);
        return;
    }

    ketQua.forEach(function (muc, index) {
        const dong = document.createElement("tr");
        dong.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(muc.hoTen)}</td>
            <td>${escapeHtml(muc.email)}</td>
            <td class="noi-dung">${escapeHtml(muc.noiDung)}</td>
            <td>${escapeHtml(muc.ngayGui || "")}</td>
            <td>
                <button type="button" class="nut-sua" data-id="${muc.id}">Sửa</button>
                <button type="button" class="nut-xoa" data-id="${muc.id}">Xóa</button>
            </td>`;
        bang.appendChild(dong);
    });
}

function escapeHtml(chuoi) {
    const the = document.createElement("div");
    the.textContent = chuoi;
    return the.innerHTML;
}

function moFormSua(id) {
    const muc = phanHoi.find(function (phanHoiItem) {
        return String(phanHoiItem.id) === String(id);
    });

    if (!muc) {
        return;
    }

    idPhanHoi.value = muc.id;
    hoTen.value = muc.hoTen;
    email.value = muc.email;
    noiDung.value = muc.noiDung;
    hopSua.hidden = false;
    hoTen.focus();
}

function dongFormSua() {
    hopSua.hidden = true;
    formSua.reset();
}

bang.addEventListener("click", function (event) {
    const nut = event.target.closest("button");
    if (!nut) {
        return;
    }

    const id = nut.dataset.id;
    if (nut.classList.contains("nut-sua")) {
        moFormSua(id);
    }

    if (nut.classList.contains("nut-xoa")) {
        if (!confirm("Bạn có chắc muốn xóa phản hồi này không?")) {
            return;
        }
        phanHoi = phanHoi.filter(function (muc) {
            return String(muc.id) !== String(id);
        });
        luuPhanHoi();
        hienThiPhanHoi();
        hienThongBao("Đã xóa phản hồi.");
    }
});

formSua.addEventListener("submit", function (event) {
    event.preventDefault();
    const muc = phanHoi.find(function (phanHoiItem) {
        return String(phanHoiItem.id) === String(idPhanHoi.value);
    });

    if (!muc) {
        return;
    }

    muc.hoTen = hoTen.value.trim();
    muc.email = email.value.trim();
    muc.noiDung = noiDung.value.trim();
    luuPhanHoi();
    dongFormSua();
    hienThiPhanHoi();
    hienThongBao("Đã cập nhật phản hồi.");
});

timKiem.addEventListener("input", hienThiPhanHoi);
document.getElementById("nutDong").addEventListener("click", dongFormSua);
hopSua.addEventListener("click", function (event) {
    if (event.target === hopSua) {
        dongFormSua();
    }
});

hienThiPhanHoi();
