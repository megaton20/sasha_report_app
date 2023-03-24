
const express = require ('express')
const router = express.Router()
const multer = require('multer');


const storageEngine = multer.diskStorage({
    destination: "./images", 
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}-- ${file.originalname}`);
    },
})

const upload = multer({
    storage:storageEngine,
    limits:{
        fileSize:1000000
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file,cb);
    },
})

const checkFileType = (file,cb) =>{
    // allowed extensions /\.(jpg | jpeg | png)$/)
    const fileType = /jpeg|jpg|png|gifs|svg/;
    // check extention name
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileType.test(file.mimeType);
    if(mimeType && extName) {
        return cb(null, true);
    }else {
        cb("Error you can only upload images");
    }
};



router.post('/image', upload.single('image'), (req, res)=> {
    if(req.file){
        res.send("single file uploaded good");
    }else {
        res.send("pls do valid image");
    }
})

router.post('/multple', upload.array("images", 5), (req, res)=>{
if (req.files) {
    res.send("multiple file good")
} else {
    res.send("multiple file bad")
}
})


router.get('/', (req, res) =>{
    res.render('login')
})

router.get('/forget', (req, res) =>{
    res.render('forget')
})








module.exports = router;