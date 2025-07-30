document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password // Đổi `pass` thành `password`
    };

    // In ra nội dung đã gửi
    console.log("Nội dung đã gửi:", userData);

    try {
        const response = await fetch('http://localhost:5502/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json(); 
        console.log(result); // In ra kết quả để kiểm tra

        const messageElement = document.getElementById('message');
        if (response.ok) {
            messageElement.textContent = "Đăng nhập thành công!";
            messageElement.style.color = "green";
            alert("Đăng nhập thành công!"); // Hiển thị alert
        } else {
            const errorMessage = result.message || "Đăng nhập thất bại!";
            console.error("Lỗi từ máy chủ:", errorMessage); // In ra lỗi để kiểm tra
            messageElement.textContent = errorMessage;
            messageElement.style.color = "red";
            alert("Đăng nhập thất bại!"); // Hiển thị alert
        }
    } catch (error) {
        console.error("Lỗi:", error);
        const messageElement = document.getElementById('message');
        messageElement.textContent = "Đã xảy ra lỗi. Vui lòng thử lại.";
        messageElement.style.color = "red";
        alert("Đã xảy ra lỗi. Vui lòng thử lại."); // Hiển thị alert
    }
});