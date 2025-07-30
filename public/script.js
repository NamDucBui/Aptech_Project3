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



async function submitPost(event) {
    event.preventDefault();

    const userId = Number(sessionStorage.getItem('userId'));
    if (!userId) {
        alert('Vui lòng đăng nhập để đăng bài!');
        window.location.href = '05_login.html';
        return;
    }

    const post_title = document.getElementById('post_title').value;
    const post_content = document.getElementById('post_content').value;

    if (!post_title.trim() || !post_content.trim()) {
        return;
    }
    
    try {
        const response = await fetch('http://localhost:5502/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userId,
                post_title,
                post_content
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to submit post: ${await response.text()}`);
        }

        // Clear form
        document.getElementById('post_title').value = '';
        document.getElementById('post_content').value = '';
        
        alert('Bài viết đã được đăng!');
        // Refresh the posts list
        await getPost();
        
        return;
    } catch (error) {
        console.error('Error submitting post:', error);
    }
}



async function getPost() {
    const response = await fetch('http://localhost:5502/posts');
    const posts = await response.json();
    console.log(posts);

    // Sắp xếp posts theo thứ tự mới nhất (giả sử post_id lớn hơn là bài đăng mới hơn)
    posts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));

    // Function to render posts based on the provided array
    async function renderPosts(postsToRender) {
        const tableBody = document.getElementById('dataPost');
        tableBody.innerHTML = '';

        function getTimeAgo(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) {
                return `${diffInSeconds} giây trước`;
            }
            
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
                return `${diffInMinutes} phút trước`;
            }

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
                return `${diffInHours} giờ trước`;
            }

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 30) {
                return `${diffInDays} ngày trước`;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
                return `${diffInMonths} tháng trước`;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            return `${diffInYears} năm trước`;
        }

        for (const post of postsToRender) {
            // Fetch username based on user_id
            const userResponse = await fetch(`http://localhost:5502/users/${post.user_id}`);
            const userData = await userResponse.json();

            // Fetch reply count for this post
            const replyResponse = await fetch(`http://localhost:5502/posts/${post.post_id}/replies/count`);
            const replyCount = await replyResponse.json();

            const row = document.createElement('div');
            row.className = 'post';
            row.innerHTML = `
            <div class="wrap-ut pull-left">
                <div class="userinfo pull-left">
                    <div class="avatar">
                        <img src="images/avt-men.png" alt="" />
                        <a href="07_profile.html?user=${userData.user_id}" class="username" style="color:green;font-weight: bold;">
                            ${userData.username}
                        </a>
                    </div>
                </div>
                <div class="posttext pull-left">
                    <h2><a href="02_topic.html" class="post-link" data-post-id="${post.post_id}">${post.post_title}</a></h2>
                    <p>${post.post_content}</p>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="postinfo pull-left">
                <div class="comments">
                    <div class="commentbg">
                        ${replyCount.count}
                        <div class="mark"></div>
                    </div>
                </div>
                <div class="views"><i class="fa fa-eye"></i>${post.post_view}</div>
                <div class="time"><i class="fa fa-clock-o"></i>${getTimeAgo(post.post_date)}</div>                                    
            </div>
            <div class="clearfix"></div>
            `;

            const link = row.querySelector('.post-link');
            link.addEventListener('click', async (event) => {
                const postId = event.target.getAttribute('data-post-id');
                sessionStorage.setItem('postId', postId);

                // Increment view count
                try {
                    await fetch(`http://localhost:5502/posts/${postId}/views`, {
                        method: 'POST'
                    });
                } catch (error) {
                    console.error('Error incrementing view count:', error);
                }               
            });

            tableBody.appendChild(row);
        }
    }

    // Render all posts initially
    await renderPosts(posts);

    // Search functionality
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.toLowerCase();

        // Filter posts based on the search term in title or content
        const filteredPosts = posts.filter(post =>
            post.post_title.toLowerCase().includes(searchTerm) ||
            post.post_content.toLowerCase().includes(searchTerm)
        );

        // Render the filtered posts
        await renderPosts(filteredPosts);
    });
}





function checkPostId() {
    const postId = sessionStorage.getItem('postId');
    
    if (postId) {
        console.log('Post ID has been saved:', postId);
        // Bạn có thể thực hiện các thao tác khác với postId ở đây
    } else {
        console.log('No Post ID found in sessionStorage.');
    }
}

// Gọi hàm kiểm tra khi cần
checkPostId();

window.onload = getPost;

// Thêm các hàm mới cho trang topic
async function getPostById(postId) {
    try {
        const response = await fetch(`http://localhost:5502/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }
        const post = await response.json();
        updatePostUI(post);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

async function updatePostUI(post) {
    const postContainer = document.querySelector('.post.beforepagination');
    if (postContainer) {
        postContainer.querySelector('.posttext h2').textContent = post.post_title || 'No Title';
        postContainer.querySelector('.posttext p').textContent = post.post_content || 'No Content';
        postContainer.querySelector('.posted').innerHTML = `<i class="fa fa-clock-o"></i> Posted on: ${new Date(post.post_date).toLocaleString()}`;
        postContainer.querySelector('.likeblock').innerHTML = `
            <a href="#" class="up" onclick="likePost(${post.post_id}); return false;">
                <i class="fa fa-thumbs-o-up"></i>${post.post_like || 0} Likes
            </a>`;
    }
}

async function likePost(postId) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        alert('Vui lòng đăng nhập để thích bài viết!');
        window.location.href = '05_login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:5502/posts/${postId}/likes`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to like post');
        }

        // Refresh post data to update like count
        const postResponse = await fetch(`http://localhost:5502/posts/${postId}`);
        const updatedPost = await postResponse.json();
        updatePostUI(updatedPost);
    } catch (error) {
        console.error('Error liking post:', error);
    }
}

async function loadReplies() {
    const postId = sessionStorage.getItem('postId');

    if (!postId) {
        console.error('No postId found in sessionStorage');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5502/replies/posts/${postId}`);
        const replies = await response.json();

        function getTimeAgo(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) {
                return `${diffInSeconds} giây trước`;
            }
            
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
                return `${diffInMinutes} phút trước`;
            }

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
                return `${diffInHours} giờ trước`;
            }

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 30) {
                return `${diffInDays} ngày trước`;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
                return `${diffInMonths} tháng trước`;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            return `${diffInYears} năm trước`;
        }

        const repliesContainer = document.querySelector('.replies');
        if (repliesContainer) {
            repliesContainer.innerHTML = '';

            for (const reply of replies) {
                const userResponse = await fetch(`http://localhost:5502/users/${reply.user_id}`);
                const user = await userResponse.json();

                const replyElement = document.createElement('div');
                replyElement.classList.add('reply');
                replyElement.innerHTML = `
                    <div class="post">
                        <div class="topwrap">
                            <div class="userinfo pull-left">
                                <div class="avatar">
                                    <img src="images/avt-men.png" alt="" />
                                    <span class="username" style="color:green;font-weight: bold;">${user.username}</span>
                                </div>
                                <div class="icons">
                                    <img src="images/icon3.jpg" alt="" />
                                    <img src="images/icon4.jpg" alt="" />
                                    <img src="images/icon5.jpg" alt="" />
                                    <img src="images/icon6.jpg" alt="" />
                                </div>
                            </div>
                            <div class="posttext pull-left">
                                <p>${reply.reply_content}</p>
                                <div class="clearfix"></div>
                            </div>
                            <div class="postinfobot">
                                <div class="likeblock pull-left">
                                    <a href="#" class="up"><i class="fa fa-thumbs-o-up"></i>10</a>
                                    <a href="#" class="down"><i class="fa fa-thumbs-o-down"></i>1</a>
                                </div>
                                <div class="prev pull-left">
                                    <a href="#"><i class="fa fa-reply"></i></a>
                                </div>
                                <div class="clearfix"></div>
                                <div class="replyinfobot">
                                    <div class="posted pull-left"><i class="fa fa-clock-o"></i> ${getTimeAgo(reply.reply_date)}</div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="next pull-right">
                                    <a href="#"><i class="fa fa-share"></i></a>
                                    <a href="#"><i class="fa fa-flag"></i></a>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                `;
                repliesContainer.appendChild(replyElement);
            }
        }
    } catch (error) {
        console.error('Error loading replies:', error);
    }
}

// Thêm event listener cho form reply
document.addEventListener('DOMContentLoaded', () => {
    const replyForm = document.getElementById('replyForm');
    if (replyForm) {
        replyForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const userId = sessionStorage.getItem('userId');
            if (!userId) {
                alert('Vui lòng đăng nhập để bình luận!');
                window.location.href = '05_login.html';
                return;
            }

            const replyContent = document.getElementById('reply').value;
            if (!replyContent.trim()) {
                return;
            }

            const postId = sessionStorage.getItem('postId');
            
            const now = new Date();
            const vietnamTime = new Date(now.getTime() + (7 * 60 * 60 * 1000));
            
            const replyData = {
                post_id: parseInt(postId),
                user_id: parseInt(userId),
                reply_content: replyContent,
                reply_date: vietnamTime.toISOString(),
                reply_target_id: null
            };

            try {
                const response = await fetch('http://localhost:5502/replies', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(replyData)
                });

                if (!response.ok) {
                    throw new Error('Failed to submit reply');
                }

                document.getElementById('reply').value = '';
                alert('Bình luận thành công!');
                await loadReplies();
            } catch (error) {
                console.error('Error posting reply:', error);
            }
        });
    }

    // Load post and replies if we're on the topic page
    const postId = sessionStorage.getItem('postId');
    if (postId && document.querySelector('.post.beforepagination')) {
        getPostById(postId);
        loadReplies();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    updateUserMenu();
});

document.addEventListener('DOMContentLoaded', () => {
    const usernames = document.querySelectorAll('.username'); 

    usernames.forEach(username => {
        username.addEventListener('click', (event) => { 
            const userId = event.target.getAttribute('data-user-id'); 
            sessionStorage.setItem('clickedUserId', userId); 
            window.location.href = '07_profile.html'; 
        });
    });
});


