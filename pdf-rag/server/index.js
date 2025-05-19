import express from "express"
import cors from "cors"
import multer from "multer"
import { Queue } from "bullmq"


const queue = new Queue("file-upload-queue",{
  connection:{
    host:"localhost",
    port :'6379'
  }
})
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

app.post("/upload/pdf",upload.single("pdf"),async(req,res)=>{
    console.log("File recieved:",req.file);
    await queue.add("file-ready",
      JSON.stringify({
        filename:req.file.destination,
        destination:req.file.destination,
        path:req.file.path
      })
    )
    return res.json({message:"uploaded"})
})
app.listen(8000,()=>console.log(`Server is running on PORT: ${8000}`)
)