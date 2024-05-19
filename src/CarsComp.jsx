import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CarsComp() {
    const [selectedCar, setSelectedCar] = useState(null);

    const cars = [
        {
            title: "Porsche Taycan Turbo S",
            subtitle: "Turbo S",
            imageSrc: "img/popular1.png",
            maxSpeed: "260 Km/h ",
            type: "Electric",
            price: "$185,000"
        },
        {
            title: "Porsche Taycan 4S",
            subtitle: "4S",
            imageSrc: "img/popular2.png",
           
            maxSpeed: "250 Km/h ",
            type: "Electric",
            price: "$103,800"
        },
        {
            title: "Porsche 911 Turbo S",
            subtitle: "Turbo S",
            imageSrc: "img/popular3.png",
         
            maxSpeed: "330 Km/h ",
            type: "Gasoline",
            price: "$203,500"
        },
        {
            title: "Porsche Panamera Turbo",
            subtitle: "Panamera Turbo",
            imageSrc: "img/popular4.png",
            
            maxSpeed: "315 Km/h ",
            type: "Hybrid",
            price: "$150,000"
        },
        {
            title: "Porsche Cayman 718 GTS",
            subtitle: "718 GTS",
            imageSrc: "img/popular5.png",
    
            maxSpeed: "293 Km/h ",
            type: "Gasoline",
            price: "$90,000"
        }
    ];

    const handleCarSelect = (car) => {
        setSelectedCar(car);
    };

    const settings = {
        dots: true,
        infinite: true,
    
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="popular section" id="popular">
            <h2 className="section__title">Choose Your Electric Car Of the Porsche Brand</h2>
            <div className={`popular__container container ${selectedCar ? 'blur' : ''}`} style={{ height: '300px' }}>
                <Slider {...settings}>
                    {cars.map((car, index) => (
                        <div key={index}>
                            <article className="popular__card" onClick={() => handleCarSelect(car)}>
                                <img src={car.imageSrc} alt={car.title} className="popular__img" />
                                <h1 className="popular__title">{car.title}</h1>
                                <h3 className="popular__subtitle">{car.subtitle}</h3>
                                <div className="popular__data">
                                    
                                    <div className="popular__data-group">
                                        <i className="ri-dashboard-3-line"></i> {car.maxSpeed}
                                    </div>
                                    <div className="popular__data-group">
                                        <i className="ri-charging-pile-2-fill"></i> {car.type}
                                    </div>
                                </div>
                                <div className="popular__button">
                                    {car.price}
                                </div>
                            </article>
                        </div>
                    ))}
                </Slider>
            </div>
            {selectedCar && (
                <div className="car-details-modal">
                    <h2>{selectedCar.title}</h2>
                    <p>{selectedCar.subtitle}</p>
                    <img src={selectedCar.imageSrc} alt={selectedCar.title} />
                    <div>
                        <span>{selectedCar.speed}</span>
                        <span>{selectedCar.maxSpeed}</span>
                        <span>{selectedCar.type}</span>
                    </div>
                    <div>{selectedCar.price}</div>
                    <button onClick={() => setSelectedCar(null)}>Close</button>
                </div>
            )}
        </section>
    );
}

export default CarsComp;



