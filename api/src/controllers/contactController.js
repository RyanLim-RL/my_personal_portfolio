import sendMail from "../utils/mailer.js";


const sendEmail = async (req, res) => {
    try{
        const {from, subject, body} = req.body;
        if(!from || !subject || !body) {
            return res.status(400).json({ success: false, message: "Please fill out all fields." });
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(from)) {
            return res.status(400).json({ success: false, message: "Invalid email address." });
        }
        await sendMail(from, subject, `            
            <p>Message: ${body}</p>
        `);

        res.status(200).json({ success: true, message: "Email sent!" });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: "Email failed to send." });
    }
}

export default { sendEmail };
