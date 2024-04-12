import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core Swiper styles
import 'swiper/css/pagination'; // Pagination styles


function CarsComp() {
    const [selectedCar, setSelectedCar] = useState(null); // State to handle selected car details

    const cars = [
        {
            title: "Porsche Taycan Turbo S",
            subtitle: "Turbo S",
            imageSrc: "img/popular1.png",
            speed: "2.6 Sec",
            maxSpeed: "260 Km/h",
            type: "Electric",
            price: "$185,000"
        },
        {
            title: "Porsche Taycan 4S",
            subtitle: "4S",
            imageSrc: "img/popular2.png",
            speed: "3.8 Sec",
            maxSpeed: "250 Km/h",
            type: "Electric",
            price: "$103,800"
        },
        {
            title: "Porsche 911 Turbo S",
            subtitle: "Turbo S",
            imageSrc: "img/popular3.png",
            speed: "2.7 Sec",
            maxSpeed: "330 Km/h",
            type: "Gasoline",
            price: "$203,500"
        },
        {
            title: "Porsche Panamera Turbo",
            subtitle: "Panamera Turbo",
            imageSrc: "img/popular4.png",
            speed: "3.6 Sec",
            maxSpeed: "315 Km/h",
            type: "Hybrid",
            price: "$150,000"
        },
        {
            title: "Porsche Cayman 718 GTS",
            subtitle: "718 GTS",
            imageSrc: "img/popular5.png",
            speed: "4.5 Sec",
            maxSpeed: "293 Km/h",
            type: "Gasoline",
            price: "$90,000"
        }
    ];

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    return (
        <section className="popular section" id="popular">
            <h2 className="section__title">Choose Your Electric Car Of The Porsche Brand</h2>
            <div className="popular__container container" style={{ height: '400px' }}>
                <Swiper
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {cars.map((car, index) => (
                        <SwiperSlide key={index} onClick={() => handleCarSelect(car)}>
                            <article className="popular__card">
                                <img src={car.imageSrc} alt={car.title} />
                                <h1>{car.title}</h1>
                                <h3>{car.subtitle}</h3>
                                <div>
                                    <span><i className="ri-dashboard-3-line"></i> {car.speed}</span>
                                    <span><i className="ri-dashboard-3-line"></i> {car.maxSpeed}</span>
                                    <span><i className="ri-charging-pile-2-fill"></i> {car.type}</span>
                                </div>
                                <div>{car.price}</div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {selectedCar && (
                <div className="car-details-modal">
                    <h2>{selectedCar.title}</h2>
                    <p>{selectedCar.subtitle}</p>
                    <img src={selectedCar.imageSrc} alt={selectedCar.title} />
                    <button onClick={() => setSelectedCar(null)}>Close</button>
                </div>
            )}
        </section>
    );
}

export default CarsComp;
