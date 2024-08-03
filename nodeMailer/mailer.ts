import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"francosemailtransporter@gmail.com",
        pass:"azsm zigy bkuz kcrb",
    },
    from:"francosemailtransporter@gmail.com"
})

export const sendEmail = async (to:string,code:string):Promise <void> =>{
    try {
        const mailOptions = {
            from:"Yo",
            to,
            subject:"Verification Code",
            text:`Your code is ${code}`
        }
    await transporter.sendMail(mailOptions)
    console.log("Email sent");
}

    catch(error){
          console.error("Error sending mail",error)
    }
}