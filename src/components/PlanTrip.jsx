import SelectCar from "../images/plan/icon1.png";
import Contact from "../images/plan/icon2.png";
import Drive from "../images/plan/icon3.png";

function PlanTrip() {
  return (
    <>
      <section className="plan-section">
        <div className="container">
          <div className="plan-container">
            <div className="plan-container__title">
              <h3>Plan Your Trip With Us</h3>
              <h2>Quick & Credible Car Rental in Solo</h2>
            </div>

            <div className="plan-container__boxes">
            <div className="plan-container__boxes__box">
              <img src={SelectCar} alt="icon_img" />
              <h3>Select Car</h3>
              <p>
                Discover the joy of choosing the perfect vehicle for your journey. Our diverse fleet offers a wide range of vehicles to meet all your driving needs, ensuring a seamless and enjoyable travel experience.
              </p>
            </div>

            <div className="plan-container__boxes__box">
              <img src={Contact} alt="icon_img" />
              <h3>Responsive Admin</h3>
              <p>
                Experience hassle-free assistance with our knowledgeable and friendly admin team. Ready to address any questions or concerns, our responsive support ensures your car rental journey is smooth and stress-free.
              </p>
            </div>

            <div className="plan-container__boxes__box">
              <img src={Drive} alt="icon_img" />
              <h3>Experienced Driver</h3>
              <p>
                Embark on your journey with confidence, knowing our experienced drivers have you covered. Whether you're exploring the open road or navigating the city streets, our wide range of cars and skilled drivers ensure a safe and enjoyable ride.
              </p>
            </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlanTrip;
