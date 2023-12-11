
require('dotenv').config();
const nodemailer = require("nodemailer");




let sendSimpleEmail = async(dataSend) => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
            
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
            },
        });
   
        let info = await transporter.sendMail({

            from: '"BookingCare.com 🏥" <admin@gmail.com>', 
            to: dataSend.receiversEmail, 
            subject: "Thông tin đặt lịch khám bệnh ✔", 
            text: "Hello world?", 
            html: getBodyHtmlEmail(dataSend)
        });
      
    
}


let getBodyHtmlEmail = (dataSend) =>{
    let result = '';
    if(dataSend.language === 'vi') {
        result = `
        <h3> Xin chào ${dataSend.patientName}</h3>

        <p>Bạn nhận được email này vì đã đặt lịch khám online trên Booking Care  </p>

        <p>Thông tin đặt lịch khám bệnh: </p>
        <div>
            <b> Thời gian: ${dataSend.time} </b>
        </div>
        <div>
            <b> Bác sĩ: ${dataSend.doctorName} </b>
        </div>
        <p> Nếu các thông tin trên là đúng, vui lòng click đường link bên dưới
         để xác nhật hoàn tất thủ tục đặt lịch khám bệnh.
        </p>

        <div>
            <a href=" ${dataSend.redirectLink}" target="_blank"> Click here</a>
        </div>

        <div>
            Xin chân thành cảm ơn
        </div>
    `;
    }

    if(dataSend.language === 'en'){
        result =

        `
                <h3> Dear ${dataSend.patientName}</h3>

                <p>
                You received this email because you booked an online appointment on Booking Care </p>

                <p>Information on scheduling medical examinations: </p>
                <div>
                    <b> Time: ${dataSend.time} </b>
                </div>
                <div>
                    <b> Doctor: ${dataSend.doctorName} </b>
                </div>
                <p> If the above information is correct, please click the link below
                    to confirm and complete the medical examination scheduling procedure.
                </p>

                <div>
                    <a href=" ${dataSend.redirectLink}" target="_blank"> Click here</a>
                </div>

                <div>
                
                    Sincerely thank you
                </div>
            `;

    }

   return result;
}

let getBodyHtmlEmailRemedy = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi') {
        result = `
        <h3> Xin chào ${dataSend.patientName} </h3>

        <p>Bạn nhận được email này vì đã đặt lịch thành công và khám thành công  </p>

        <p>Thông tin đơn thuốc / hoá đơn được gửi trong file đính kèm</p>
        
        <div>
            Xin chân thành cảm ơn
        </div>
    `;
    }

    if(dataSend.language === 'en'){
        result =
        ` <h3> Dear ${dataSend.patientName} </h3>

        <p> You have received this email because of your successful booking and successful discovery </p>

        <p>Prescription/invoice information is sent in the attached file</p>
        
        <div>
            Sincerely thank
        </div>`
        ;

    }

   return result;

}


let sendAttachment = async(dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
        
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({

        from: '"BookingCare.com 🏥" <admin@gmail.com>', 
        to: dataSend.email, 
        subject: "Kết quả khám bệnh ✔", 
        text: "Hello world?", 
        html: getBodyHtmlEmailRemedy(dataSend),
        attachments: [
            {   
                filename: `remedy-${dataSend.patientId} - ${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment:sendAttachment
}