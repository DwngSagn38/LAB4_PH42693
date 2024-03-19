const express = require('express');
const app = express();

const port = 3000;

app.listen(port, () => {
    console.log("server đang chạy cổng : " + port)
});

// liên kết đến trang upload.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/upload.html');
});


// upload ảnh
const muilter = require('multer');
const fs = require('fs');

const storage = muilter.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let newFileName = fileName;

        // arr = fileName.split('.');
        // let newFileName = '';
        // for(let i = 0; i< arr.length ; i++){
        //     if(i != arr.length - 1){
        //         newFileName += arr[i];
        //     }else{
        //         newFileName += ('-'+Date.now() + '.' + arr[i]);
        //     }
        // }

        cb(null, newFileName);
    }
})

const upload = muilter({ storage: storage });
app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file = req.file;
    if (!file) {
        let error = new Error('Can chọn ảnh tải lên');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file)
})