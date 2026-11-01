const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Cảm ơn bạn đã liên hệ với Áo Dài Việt!\n\nChúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.");

    contactForm.reset();
});