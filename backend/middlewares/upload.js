const multer=require('multer')
const path=require("path")
const {v4:uuidv4}=require("uuid")

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        const uuid=uuidv4();
        const date= Date.now();
        const ext=path.extname(file.originalname)
        cb(null,`${date}_${uuid}${ext}`)
    }
})
const upload=multer({storage:storage})

module.exports=upload