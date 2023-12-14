const  Router = require( "express");
const Contacts = require('../dao/factory.js')
const ContactDTO = require("../dao/DTOs/contact.dto.js");
const ContactRepository= require( "../repositores/Contacts.repository.js");
// import Contacts from "../dao/mongo/contacts.mongo.js";

const router = Router()

const contactsServices = new Contacts()

router.get("/", async (req, res) => {
    let result = await contactsServices.get()
    res.send({ status: "success", payload: result })
})

router.post("/", async (req, res) => {
    let { name, last_name, phone } = req.body

    let contact = new ContactDTO({ name, last_name, phone })
    console.log(contact)
    let result = await ContactRepository.createContact(contact)
    console.log(result)
})

export default router