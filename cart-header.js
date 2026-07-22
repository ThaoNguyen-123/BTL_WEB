// cart-header.js - CẬP NHẬT GIỎ HÀNG + ẨN KHI LÀ ADMIN
document.addEventListener("DOMContentLoaded", function() {
    function updateCartCount() {
        let raw = sessionStorage.getItem("order") || "";
        let count = 0;
        if (raw) {
            try {
                raw = raw.replace(/}{/g, "},{");
                const cart = JSON.parse("[" + raw + "]");
                count = cart.length;
            } catch(e) {}
        }
        // Cập nhật số lượng ở header
        document.querySelectorAll(".cart-amount, .cart-number span").forEach(el => {
            if (el.classList.contains("cart-amount")) el.textContent = count;
            else el.textContent = `(${count} sản phẩm)`;
        });
        // Cập nhật cả tiêu đề giỏ hàng nếu có
        document.querySelectorAll(".cart-number").forEach(el => {
            el.innerHTML = `(${count} sản phẩm)`;
        });
    }

    // Cập nhật ngay + mỗi giây
    updateCartCount();
    setInterval(updateCartCount, 1000);

    // ẨN GIỎ HÀNG KHI LÀ ADMIN
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser === "admin@tn05.com") {
        document.querySelectorAll('a[href="cart.html"], .cart, .fa-cart-plus').forEach(el => {
            el.style.display = "none";
        });
    }
});
