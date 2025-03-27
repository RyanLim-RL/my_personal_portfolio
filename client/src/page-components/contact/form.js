import { useState } from "react";
import axios from "axios";
import "../../styles/contact_styles/form.css";

const Form = () => {
    const [formData, setFormData] = useState({
        from: "",
        subject: "",
        body: "",
    });

    const [status, setStatus] = useState("Click to Send");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, formData);
            if (response.data.success) {
                setStatus("Email sent successfully!");
                setFormData({ from: "", subject: "", body: "" });
            } else {
                setStatus("Failed to send email.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setStatus("Failed to send email.");
        } finally {
            setTimeout(() => {
                setStatus("Click to Send");
            }, 5000);
        }
    };
    return (
        <div className="contact-card">
            <div className="title-container">
                <h1>Get in Touch</h1>
                <p>Contact me quickly via this form or via the links below</p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="from"
                    placeholder="Your Email"
                    value={formData.from}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="body"
                    placeholder="Your Message"
                    value={formData.body}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{status}</button>
            </form>
        </div>
    );
};

export default Form;