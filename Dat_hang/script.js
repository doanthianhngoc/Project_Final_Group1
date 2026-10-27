const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy thông tin khách hàng
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = document.getElementById("payment").value;

    // Hiển thị thông báo xác nhận
    alert(
        "XÁC NHẬN ĐẶT HÀNG\n\n" +
        "Họ tên: " + name + "\n" +
        "Số điện thoại: " + phone + "\n" +
        "Địa chỉ: " + address + "\n" +
        "Thanh toán: " + payment + "\n" +
        "Tổng tiền: " +
        document.getElementById("totalPrice").textContent
    );
});
