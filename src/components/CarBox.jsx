import { useState } from "react";

function CarBox({ data, carID }) {
  const [carLoad, setCarLoad] = useState(true);
  return (
    <>
      {data[carID].map((car, id) => (
        <div key={id} className="box-cars">
          {/* car */}
          <div className="pick-car">
            {carLoad && <span className="loader"></span>}
            <img
              style={{ display: carLoad ? "none" : "block" }}
              src={car.img}
              alt="car_img"
              onLoad={() => setCarLoad(false)}
            />
          </div>
          {/* description */}
          <div className="pick-description">
            <div className="pick-description__price">
              <span>Rp {car.price}</span>/ day
            </div>
            <div className="pick-description__table">
              <div className="pick-description__table__col">
                <span>Model</span>
                <span>{car.model}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Capacity</span>
                <span>{car.capacity} Persons</span>
              </div>

              <div className="pick-description__table__col">
                <span>Include</span>
                <span>{car.include}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Area</span>
                <span>{car.include}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Parking</span>
                <span>{car.parking}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Payment</span>
                <span>{car.payment}</span>
              </div>

              <div className="pick-description__table__col">
                <span>Overtime</span>
                <span>Rp {car.overtime}/hour</span>
              </div>
            </div>
            {/* btn cta */}
            <a className="cta-btn" href="#booking-section">
              Reserve Now
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default CarBox;
