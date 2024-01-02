import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
    auth:{
        user:'gramtest60@gmail.com',
        pass:'jbvqxdzmcfxxkimy'
    }
})
export default transporter