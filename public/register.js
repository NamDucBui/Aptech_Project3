document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5502/users/get/statistics')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the HTML with the fetched data
            document.getElementById('registered-count').textContent = `Người dùng đã đăng ký: ${data.totalUsers}`;
            document.getElementById('logged-in-count').textContent = `Người dùng đang đăng nhập: ${data.loggedInUsers}`;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


async function fetchLogoConfig() {
try {
    const response = await fetch('http://localhost:5502/configuration/1'); 
    const data = await response.json();
    document.getElementById('full-logo').src = data.value; 
} catch (error) {
    console.error('Error fetching logo configuration:', error);
}
}
fetchLogoConfig();

// Biến để theo dõi trạng thái của ảnh
let isDefaultImage = true;
const defaultAvatarSrc = 'images/avt-men.png'; // Đường dẫn đến ảnh ban đầu
const newAvatarSrc = 'images/avt-women.png'; // Đường dẫn đến ảnh mới

document.getElementById('changeAvatarBtn').addEventListener('click', function() {
    const avatarImage = document.getElementById('userAvatar');

    // Thay đổi ảnh dựa trên trạng thái
    if (isDefaultImage) {
        avatarImage.src = newAvatarSrc; // Thay đổi sang ảnh mới
    } else {
        avatarImage.src = defaultAvatarSrc; // Trở về ảnh ban đầu
    }

    // Đảo ngược trạng thái
    isDefaultImage = !isDefaultImage;
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    // Lấy giá trị từ các trường trong form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact_details').value; 
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const personalInfo = document.getElementById('personal_info').value; 
    const professionalInfo = document.getElementById('professional_info').value; 
    const qualifications = document.getElementById('qualifications').value;
    const experienceInput = document.getElementById('experience').value;
    const experience = Number(experienceInput);
    const achievements = document.getElementById('achievement').value; 
    const profileVisibility = document.getElementById('profile_visibility').value; 

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== passwordConfirm) {
        alert("Mật khẩu không khớp!");
        return;
    }

    // Chuẩn bị dữ liệu để gửi
    const userData = {
        username,
        email,
        contact_details: contact,
        password, // Gửi mật khẩu chưa mã hóa
        personal_info: personalInfo,
        professional_info: professionalInfo,
        qualifications,
        experience,
        achievement: achievements,
        profile_visibility: profileVisibility,
        logged_in: 1 
    };

    try {
        const response = await fetch('http://localhost:5502/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
    
        // Ghi log phản hồi để kiểm tra
        const text = await response.text(); // Đọc phản hồi dưới dạng văn bản
        console.log("Phản hồi từ máy chủ:", text); // Ghi log phản hồi
    
        if (response.ok) {
            const result = JSON.parse(text); // Giả sử máy chủ trả về một đối tượng JSON
            console.log(result); // Ghi log kết quả
            document.getElementById('registerForm').reset(); // Đặt lại form
            //window.location.href = 'http://127.0.0.1:5502/05_login.html';
            alert("Đăng ký thành công!"); // Hiển thị thông báo thành công
        } else {
            let errorResponse;
            try {
                errorResponse = JSON.parse(text);
            } catch {
                errorResponse = { message: text };
            }
            alert(`Đăng ký không thành công: ${errorResponse.message || "Vui lòng thử lại."}`);
        }
    } catch (error) {
        console.error("Lỗi:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
});