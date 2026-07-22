// ==================== courses.js – DANH SÁCH KHÓA HỌC THẬT CỦA EM ====================

const KHOA_HOC = [
    { id: 1, ten: "Khóa học Python - cơ bản", gia: 599000, giam: 900000, img: "6.jpg" },
    { id: 2, ten: "Khóa học C# cho người mới bắt đầu", gia: 499000, giam: 700000, img: "7.jpg" },
    { id: 3, ten: "Lập trình C++ cơ bản", gia: 499000, giam: 720000, img: "8.jpg" },
    { id: 4, ten: "Khóa học SQL - cơ bản", gia: 999000, giam: 4500000, img: "9.jpg" },
    { id: 5, ten: "Khóa học JavaScript cho người mới", gia: 500000, giam: 800000, img: "10.jpg" },
    { id: 6, ten: "Khóa học C# - cơ bản", gia: 499000, giam: 700000, img: "1.jpg" },
    { id: 7, ten: "Khóa học truyền thông và mạng máy tính", gia: 799000, giam: 1200000, img: "2.jpg" },
    { id: 8, ten: "Thiết kế UI/UX", gia: 899000, giam: 1500000, img: "3.jpg" },
    { id: 9, ten: "Thiết kế web cơ bản", gia: 699000, giam: 1100000, img: "4.jpg" },
    { id: 10, ten: "Khóa học Python hướng đối tượng(OOP)", gia: 799000, giam: 1300000, img: "5.jpg" }
];

// Lưu vào localStorage để admin quản lý (chỉ chạy lần đầu hoặc khi cần reset)
if (!localStorage.getItem("khoahoc_real")) {
    localStorage.setItem("khoahoc_real", JSON.stringify(KHOA_HOC));
}