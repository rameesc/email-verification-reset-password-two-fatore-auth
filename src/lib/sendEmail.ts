
import nodemailer from "nodemailer"



export const sendEmail=async(email:string ,html:string,subject:string)=>{

    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        auth:{
            user:process.env.PERSON_EMAIL,
            pass:process.env.EMAIL_APP_PASSWORD
            
        }
    })
    const emailOption={
        from:process.env.PERSON_EMAIL,
        to:email,
        subject:subject,
        html:html

    };

    try{
        await transporter.sendMail(emailOption);
        return {
            message:'Email sent successfully',
            success:true
        }


    }catch(error){

       console.log(error)
    }

}