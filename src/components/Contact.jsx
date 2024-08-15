import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
const Contact = () => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzcJhwApjprjKPf05AHPd20zoPaDVDa9qh3-xmq57gM6jgbklMlR5oo3clJr57OkkZH2w/exec";
  const [submitMessage, setSubmitMessage] = useState(false);
  const submitForm = (e) => {
    const form = document.forms["submit-to-google-sheet"];
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        setSubmitMessage(true);
        form.reset();
      })
      .catch((error) => console.error("Error!", error.message));
  };
  return (
    <div className="contact">
      <form name="submit-to-google-sheet" onSubmit={submitForm}>
        <h3>Feedback</h3>
        <input type="text" name="Name" placeholder="Enter your name" required />
        <input
          type="text"
          name="Email"
          placeholder="Enter your email"
          required
        />
        <textarea
          rows={"4"}
          name="Message"
          placeholder="give your feedback"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="line"></div>
      <div className="socialCon">
        <div class="links">
          <Link
            to="https://www.facebook.com/profile.php?id=100088212666382"
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            to="https://www.linkedin.com/in/shahzaib-khan-82a6722a8/"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
          <Link to="https://github.com/codezeb45" target="_blank">
            <FaGithub />
          </Link>
          <Link to="https://www.instagram.com/shah_zaibkhan45/">
            <FaInstagram />
          </Link>
        </div>
        <h4>
          <FaPhoneAlt /> +92 308 7822902
        </h4>
        <h4>
          <IoHome /> Multan, Pakistan
        </h4>
      </div>
      {submitMessage && (
        <div className="message">Message sent successfully</div>
      )}
    </div>
  );
};

export default Contact;
