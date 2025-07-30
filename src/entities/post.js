class Post {
    constructor({
        post_id,
        user_id,
        post_title,
        post_content,
        post_like,
        post_view,
        post_replies,
        post_date = new Date() // Mặc định là thời gian hiện tại
    }) {
        this.post_id = post_id; // ID của bài viết
        this.user_id = user_id; // ID của người dùng đã tạo bài viết
        this.post_title = post_title; // Tiêu đề của bài viết
        this.post_content = post_content; // Nội dung của bài viết
        this.post_like = post_like || 0; // Số lượt thích, mặc định là 0
        this.post_view = post_view || 0; // Số lượt xem, mặc định là 0
        this.post_replies = post_replies || 0; // Số lượt trả lời, mặc định là 0
        this.post_date = post_date;
    }
    
    isValid() {
        return (
            typeof this.user_id === 'number' && this.user_id > 0 &&
            typeof this.post_title === 'string' && this.post_title.length > 0 &&
            typeof this.post_content === 'string' && this.post_content.length > 0 &&
            (this.post_like === null || typeof this.post_like === 'number') &&
            (this.post_view === null || typeof this.post_view === 'number') &&
            (this.post_replies === null || typeof this.post_replies === 'number') &&
            !isNaN(new Date(this.post_date).getTime()) // Kiểm tra xem post_date có phải là một ngày hợp lệ không
        );
    }

    
}

module.exports = Post;
