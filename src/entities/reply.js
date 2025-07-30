class Reply {
    constructor({
        reply_id,
        post_id,
        user_id,
        reply_content,
        reply_date = new Date()
    }) {
        this.reply_id = reply_id;
        this.post_id = post_id;
        this.user_id = user_id;
        this.reply_content = reply_content;
        this.reply_date = reply_date;
    }

    isValid() {
        return (
            typeof this.post_id === 'number' && this.post_id > 0 &&
            typeof this.user_id === 'number' && this.user_id > 0 &&
            typeof this.reply_content === 'string' && this.reply_content.length > 0 &&
            !isNaN(new Date(this.reply_date).getTime())
        );
    }
}

module.exports = Reply;

