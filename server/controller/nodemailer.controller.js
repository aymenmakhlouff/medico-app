const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

module.exports = {
    getbill: async (req, res) => {
        const { userEmail, mydescription, mymedecine, myprice, myname } = req.body;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "c4ces.rbk@gmail.com",
                pass: "xgpp ycuf inuu drjy",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let MailGenerator = new Mailgen({
            theme: 'salted',
            product: {
                name: "Medico App",
                link: "https://medicoapp.com/",
            },
        });

        let response = {
            body: {
                name: myname,
                intro: "Your bill has arrived!",
                table: {
                    data: [
                        {
                            Medecine: mymedecine,
                            description: mydescription,
                            price: myprice,
                        },
                    ],
                },
                outro: "Thank you for your purchase!",
            },
        };

        let mail = MailGenerator.generate(response);
        let message = {
            from: "c4ces.rbk@gmail.com",
            to: userEmail,
            subject: "Place Order",
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(201).json({
                    msg: "You should receive an email",
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message || "Unknown error" });
            });
    },
    sendE: async (req, res) => {
      const { userEmail,doctorName,appointmentDetails,textEmail,patient } = req.body;

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "c4ces.rbk@gmail.com",
                pass: "xgpp ycuf inuu drjy",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Medico App",
                link: "https://medicoapp",
            },
        });

        let response = {
            body: {
              name: `Dear ${patient}`,
              intro: `I hope this message finds you well. This is Dr. ${doctorName}, and I am writing to provide you with important information regarding your upcoming appointment.`,
              outro: appointmentDetails,
              outro: textEmail
              // outro: "If you have any questions or concerns, please do not hesitate to contact our office. We look forward to seeing you soon.",
            },
        };

        let mail = MailGenerator.generate(response);
        let message = {
            from: "c4ces.rbk@gmail.com",
            to: userEmail,
            subject: `Your Scheduled Appointment with Dr. ${doctorName} .`,
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(201).json({
                    msg: "You should receive an email",
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message || "Unknown error" });
            });
    },
        // sendOfficialEmail: async (req, res) => {
        //   try {
        //     const { patientEmail, doctorName, appointmentDetails,textEmail } = req.body;
      
        //     // Create Mailgen instance
        //     const mailGenerator = new Mailgen({
        //       theme: "default",
        //       product: {
        //         name: "Medico App",
        //         link: "https://medico-app.com",
        //       },
        //     });
      
        //     // Generate email content
        //     const emailContent = {
        //       body: {
        //         name: `Dear Patient,`,
        //         intro: `I hope this message finds you well. This is Dr. ${doctorName}, and I am writing to provide you with important information regarding your upcoming appointment.`,
        //         details: appointmentDetails,
        //         outro: textEmail
        //         // outro: "If you have any questions or concerns, please do not hesitate to contact our office. We look forward to seeing you soon.",
        //       },
        //     };
      
        //     // Generate HTML content for the email
        //     const emailHTML = mailGenerator.generate(emailContent);
      
        //     // Create email message
        //     const emailMessage = {
        //       from: "c4ces.rbk@gmail.com", // Replace with your email
        //       to: patientEmail,
        //       subject: "Important Information Regarding Your Appointment",
        //       html: emailHTML,
        //     };
      
        //     // Send the email using Mailgun transport
        //     await mailgunTransporter.sendMail(emailMessage);
      
        //     // Respond with success
        //     res.status(201).json({
        //       msg: "Official email sent successfully. The patient should receive an email.",
        //     });
        //   } catch (error) {
        //     // Handle errors
        //     console.error("Error sending email:", error);
        //     res.status(500).json({ error: "An error occurred while sending the email." });
        //   }
        // },
};
