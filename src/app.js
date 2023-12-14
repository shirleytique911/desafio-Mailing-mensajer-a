const express = require("express")
const bodyParser =require("body-parser")
const nodemailller = require("nodemailer")

const app = express()
const port = 8080


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//configurar el transporte Nodemailer

const transporter =nodemailller.createTransport({
    service:"Gmail",
    auth:{
        user:"shirleytique911@gmail.com",
        pass:"ixuu eobx eaed ajxo"  //contraseña de aplicacion general "gmail"
    }
})

app.get("/", async(req,res)=>{
    res.sendFile(__dirname +"/index.html")
})

app.post("/enviar-correo", (req,res)=>{
    const{ nombre, correo,mensaje} =req.body

    const mailOptions ={
        from:"shirleytique911@gmail.com",
        to:"lorenatique911@gmail.com",
        subject:"Mensaje de contacto",
        text:`Nombre:${nombre}\nCorreo: ${correo}\,Mensaje: ${mensaje},`
    }
    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log(error)
            res.send("error al enviar correo")
        }else{
            console.log("correo enviado")
            res.send("correo enviado con exito")
        }
    })
})

app.listen(port,()=> {
    console.log(`server running on port ${port}`)

})