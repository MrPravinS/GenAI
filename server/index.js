import express from "express"
import cors from "cors"
import multer from "multer"


const app = express()
app.use(cors());




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage:storage })
  

app.get("/",(req,res)=>{
    return res.json({status:"All Good"})
})

app.post("/upload/pdf",upload.single("pdf"),(req,res)=>{
    console.log("File recieved:",req.file);
    
    return res.json({message:"uploaded"})
})
app.listen(8000,()=>console.log(`Server is running on PORT: ${8000}`)
)