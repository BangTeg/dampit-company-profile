import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

function Faq() {
  const [activeQ, setActiveQ] = useState("q1");

  const openQ = (id) => {
    setActiveQ(activeQ === id ? "" : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id ? "active-answer" : "";
  };

  const getClassQuestion = (id) => {
    return activeQ === id ? "active-question" : "";
  };

  return (
    <>
      <section className="faq-section">
        <div className="container">
          <div className="faq-content">
            <div className="faq-content__title">
              <h5>FAQ</h5>
              <h2>Frequently Asked Questions</h2>
              <p>
                Frequently Asked Questions About Dampit Trans Booking Process.
                This Sections Answers to Common Concerns and Inquiries.
              </p>
            </div>

            <div className="all-questions">
              <div className="faq-box">
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__question  ${getClassQuestion("q1")}`}
                >
                  <p>1. Is it permissible to rent a vehicle without using a driver service from Dampit Trans?</p>
                  <IconChevronDown />
                </div>
                <div
                  id="q1"
                  onClick={() => openQ("q1")}
                  className={`faq-box__answer ${getClassAnswer("q1")}`}
                >
                    No, Dampit Trans does not provide vehicle rentals without our drivers. 
                    We prioritize the safety and convenience of our customers by offering professional drivers with our rental services. 
                    If you have any inquiries or need assistance, please feel free to email us or chat with us on WhatsApp.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__question ${getClassQuestion("q2")}`}
                >
                  <p>2. What is the flow for making a car rental reservation at Dampit Trans?</p>
                  <IconChevronDown />{" "}
                </div>
                <div
                  id="q2"
                  onClick={() => openQ("q2")}
                  className={`faq-box__answer ${getClassAnswer("q2")}`}
                >
                  To make a car rental reservation at Dampit Trans, follow these steps:
                  1. Login or register if you haven't created an account before.
                  2. Fill in your user profile information.
                  3. Select the desired vehicle and provide the rental details such as pick-up location, dates, and preferences.
                  4. Submit the reservation request.
                  5. The admin will confirm the reservation through WhatsApp chat.
                  6. Once the reservation is approved, you will receive an email with confirmation details and the total price.
                </div>
              </div>
              <div className="faq-box">
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__question ${getClassQuestion("q3")}`}
                >
                  <p>3. Which destinations can be covered during the rental session from the Dampit Trans service?</p>
                  <IconChevronDown />
                </div>
                <div
                  id="q3"
                  onClick={() => openQ("q3")}
                  className={`faq-box__answer ${getClassAnswer("q3")}`}
                >
                  With Dampit Trans, you can explore various places in Indonesia. Our rental services cover popular areas like Jogjakarta, Malang, Surabaya, Bandung, Bali, and more. 
                  Choose from a wide range of vehicles including sedans, SUVs, and vans for your family vacation, business trip, or leisure getaway. 
                  Our drivers ensure a safe and comfortable travel experience, allowing you to relax and enjoy Indonesia's scenic beauty. 
                  Experience the convenience and reliability of Dampit Trans as you explore Indonesia's diverse landscapes, cultural, and vibrant cities.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
