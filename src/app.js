const express = require("express")
const bodyParser =require("body-parser")
const nodemailller = require("nodemailer")
const mongoose =require( 'mongoose')
const contactsRouter =require('./routes/contacts.router.js')

const app = express()
const port = 8080


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//configurar el transporte Nodemailer

const transporter = nodemailller.createTransport({
    service:"Gmail",
    auth:{
        user:"shirleytique911@gmail.com",
        pass:"ixuu eobx eaed ajxo"  //contraseña de aplicacion general "gmail"
    }
})

app.get("/", async(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post("/enviar-correo", (req,res)=>{
    const{ nombre, correo, mensaje} = req.body

    const mailOptions ={
        from: "shirleytique911@gmail.com",
        to: "shirleytique911@gmail.com",
        subject:"Mensaje de contacto",
        // text:`Nombre: ${nombre}\nCorreo: ${correo}\,Mensaje: ${mensaje},`
        html:`
        <div>
        <h1>${nombre}</h1>
        <h2>${correo}</h2>
        <p>${mensaje}</p>
        </div>`
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




mongoose.connect('mongodb+srv://shirleytique911:GKZraArQ50QuepXc@cluster0.dvtsniz.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/contacts", contactsRouter)


app.listen(port,()=> {
    console.log(`server running on port ${port}`)

})
