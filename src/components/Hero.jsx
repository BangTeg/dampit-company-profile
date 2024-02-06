import { Link } from "react-router-dom";
import BgShape from "../images/hero/hero-bg.png";
import HeroCar from "../images/hero/main-car.png";
import { useEffect, useState } from "react";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";

function Hero() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  const bookBtn = () => {
    document
      .querySelector("#booking-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.pageYOffset > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);
  return (
    <>
      <section id="home" className="hero-section">
        <div className="container">
          <img className="bg-shape" src={BgShape} alt="bg-shape" />
          <div className="hero-content">
            <div className="hero-content__text">
              <h4>Dampit Trans</h4>
              <h1>
                <span>Cheapest</span> and <span>Safest</span> Car Rental in <span>Solo</span>.
              </h1>
              <p>
                Explore the freedom of driving your dream car! Discover unbeatable prices,
                enjoy unlimited miles, and experience flexible pick-up options with Dampit Trans.
                Your journey begins with us - <span>where affordability meets adventure</span>.
              </p>
              <div className="hero-content__text__btns">
                <Link
                  onClick={bookBtn}
                  className="hero-content__text__btns__book-ride"
                  to="/"
                >
                  Book Now! &nbsp; <IconCircleCheck />
                </Link>
                <Link className="hero-content__text__btns__learn-more" to="/about">
                  Learn More &nbsp; <IconChevronRight />
                </Link>
              </div>
            </div>

            {/* img */}
            <img
              src={HeroCar}
              alt="dampit-trans-solo-logo"
              className="hero-content__car-img"
            />
          </div>
        </div>

        {/* page up */}
        <div
          onClick={scrollToTop}
          className={`scroll-up ${goUp ? "show-scroll" : ""}`}
        >
          ^
        </div>
      </section>
    </>
  );
}

export default Hero;
