const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function dangNhapAdmin() {
    const email = prompt("Nhập email admin:");
    const pass = prompt("Nhập mật khẩu admin:");

    if (email === "admin@tn05.com" && pass === "123456") {
        const admin = {
            email: email,
            password: pass,
            role: "admin"
        };

        localStorage.setItem("currentUser", JSON.stringify(admin));
        alert("Đăng nhập admin thành công!");
        location.href = "dashboard.html";
    } else {
        alert("Sai email hoặc mật khẩu admin!");
    }
}


function dangNhap() {
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();

    const user = users.find(u => u.email === email && u.password === pass);

    if (!user) {
        alert("Sai tài khoản hoặc mật khẩu!");
        return;
    }

    // ✅ LƯU ĐÚNG DẠNG OBJECT
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Đăng nhập thành công!");

    // ✅ PHÂN LUỒNG ĐÚNG
    if (user.role === "admin") {
        window.location.href = "dashboard.html";
    } else {
        window.location.href = "index.html";
    }
}


// ==================== admin.js (ĐÃ SỬA) ====================

document.addEventListener("DOMContentLoaded", function () {
    // 1. KIỂM TRA QUYỀN ADMIN
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "login.html";
        return;
    }
    let user;
    try {
        user = JSON.parse(currentUser);
    } catch (e) {
        localStorage.removeItem("currentUser");
        alert("Phiên đăng nhập lỗi, vui lòng đăng nhập lại!");
        window.location.href = "login.html";
        return;
    }

    // 2. ĐỒNG HỒ LIVE
    const clockEl = document.getElementById("clock");
    if (clockEl) {
        clockEl.textContent = new Date().toLocaleString('vi-VN');
        setInterval(() => clockEl.textContent = new Date().toLocaleString('vi-VN'), 1000);
    }

    // 3. DỮ LIỆU CHUNG
    let dsHocVien = JSON.parse(localStorage.getItem("hocvien") || "[]");
    let dsThongKe = JSON.parse(localStorage.getItem("thongke") || "[]");
    let dsKhoaHoc = JSON.parse(localStorage.getItem("khoahoc") || "[]");

    // ==================== HỌC VIÊN ====================
    function loadHocVien() {
        const tbody = document.querySelector("#bangHocVien tbody");
        if (!tbody) return;
        tbody.innerHTML = dsHocVien.map(x => `
            <tr>
                <td>${x.id.toString().slice(-8)}</td>
                <td>${x.ten}</td>
                <td>${x.khoa}</td>
                <td>${x.ngay}</td>
                <td>
                    <button class="btn btn-sua" onclick="suaHocVien(${x.id})">Sửa</button>
                    <button class="btn btn-xoa" onclick="xoaHocVien(${x.id})">Xóa</button>
                </td>
            </tr>
        `).join("") || "<tr><td colspan='5'>Chưa có học viên</td></tr>";
    }

  
    };

    window.xoaHocVien = function (id) {
        if (confirm("Xóa học viên này?")) {
            dsHocVien = dsHocVien.filter(x => x.id != id);
            localStorage.setItem("hocvien", JSON.stringify(dsHocVien));
            loadHocVien();
            capNhatDashboard();
        }
    };

    // ==================== KHÓA HỌC ====================
    function loadKhoaHoc() {
        const tbody = document.querySelector("#bangKhoaHoc tbody");
        if (!tbody) return;
        tbody.innerHTML = dsKhoaHoc.map(x => `
            <tr>
                <td>${x.id}</td>
                <td>${x.ten}</td>
                <td>${x.gia.toLocaleString()}đ</td>
                <td><button class="btn btn-xoa" onclick="xoaKhoaHoc(${x.id})">Xóa</button></td>
            </tr>
        `).join("") || "<tr><td colspan='4'>Chưa có khóa học</td></tr>";
    }

    window.themKhoaHoc = function () {
        const ten = prompt("Tên khóa học:");
        const gia = prompt("Giá (VNĐ):");
        if (ten && gia && !isNaN(gia)) {
            dsKhoaHoc.push({ id: Date.now(), ten, gia: Number(gia) });
            localStorage.setItem("khoahoc", JSON.stringify(dsKhoaHoc));
            loadKhoaHoc();
        }
    };

    window.xoaKhoaHoc = function (id) {
        if (confirm("Xóa khóa học?")) {
            dsKhoaHoc = dsKhoaHoc.filter(x => x.id !== id);
            localStorage.setItem("khoahoc", JSON.stringify(dsKhoaHoc));
            loadKhoaHoc();
        }
    };

    // ==================== THỐNG KÊ & DASHBOARD ====================
    function capNhatDashboard() {
        // ✅ SỬA LỖI QUERY SELECTOR
        const elHocVien = document.getElementById("total-hocvien");
        if (elHocVien) elHocVien.innerText = dsHocVien.length;

        // Tính doanh thu tháng
        const donhang = JSON.parse(localStorage.getItem("donhang") || "[]");
        const today = new Date().toLocaleDateString('vi-VN');
        const todayOrders = donhang.filter(d => d.ngay === today).length;
        
        // ✅ TÍNH DOANH THU THÁNG ĐÚNG
        const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
        const monthRevenue = donhang
            .filter(d => {
                if (!d.ngay) return false;
                const [day, month, year] = d.ngay.split('/');
                return `${year}-${month.padStart(2,'0')}` === currentMonth;
            })
            .reduce((sum, d) => sum + (Number(d.gia) || 0), 0);

        const elDonHang = document.getElementById("total-donhang");
        if (elDonHang) elDonHang.innerText = todayOrders || dsThongKe.reduce((a,x)=>a + (x.donhang || 0), 0);

        const elDoanhThu = document.getElementById("total-doanhthu");
        if (elDoanhThu) elDoanhThu.innerText = (monthRevenue / 1000000).toFixed(3) + " triệu";
    }

    // Load lần đầu
    loadHocVien();
    loadKhoaHoc();
    capNhatDashboard();

    // Cập nhật tự động mỗi 5s + khi có thay đổi từ trang khác
    setInterval(capNhatDashboard, 5000);
    window.addEventListener("storage", capNhatDashboard);
});
