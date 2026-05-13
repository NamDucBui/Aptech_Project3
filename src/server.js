const express = require("express");
const cors = require("cors");   
const userRoutes = require('./routes/userRoutes'); 
const configurationRoutes = require('./routes/configurationRoutes');
const postRoutes = require('./routes/postRoutes'); // Nhập tệp postRoutes
const replyRoutes = require('./routes/replyRoutes'); 

const app = express();
const port = 5510;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Sử dụng các route từ userRoutes
app.use('/users', userRoutes); 

// Sử dụng các route từ configurationRoutes
app.use('/configuration', configurationRoutes);

// Sử dụng các route từ postRoutes
app.use('/posts', postRoutes); // Tất cả các route liên quan đến bài viết sẽ bắt đầu bằng /posts

app.use('/replies', replyRoutes);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

