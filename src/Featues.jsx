import React, { useState } from 'react';

function Features() {
    const [filter, setFilter] = useState('all');

    const handleFilterClick = (filter) => {
        setFilter(filter);
    };

    const cars = [
        { id: 1, brand: 'Tesla', model: 'Model X', price: '$98,900', img: 'img/featured1.png', filter: 'tesla' },
        { id: 2, brand: 'Tesla', model: 'Model 3', price: '$45,900', img: 'img/featured2.png', filter: 'tesla' },
        { id: 3, brand: 'Audi', model: 'E-tron', price: '$175,900', img: 'img/featured3.png', filter: 'audi' },
        { id: 4, brand: 'Porsche', model: 'Boxster 987', price: '$126,900', img: 'img/featured4.png', filter: 'porsche' },
        { id: 5, brand: 'Porsche', model: 'Panamera', price: '$126,900', img: 'img/featured5.png', filter: 'porsche' },
    ];

    const filteredCars = filter === 'all' ? cars : cars.filter(car => car.filter === filter);

    return (
        <>
            <section className="features section">
                <h2 className="section__title">
                    More features
                </h2>
                <div className="features__container container grid">
                    <div className="features__group">
                        <img src="img/features.png" className="features__img" alt="features"></img>
                        <div className="features__card features__card-1">
                            <h3 className="features__card-title">800v</h3>
                            <p className="features__card-description">Turbocharging</p>
                        </div>

                        <div className="features__card features__card-2">
                            <h3 className="features__card-title">350</h3>
                            <p className="features__card-description">km<br />Range</p>
                        </div>

                        <div className="features__card features__card-3">
                            <h3 className="features__card-title">480</h3>
                            <p className="features__card-description">km<br />Travel</p>
                        </div>
                    </div>
                </div>
                <img src="img/map.svg" alt="map" className="features__map"></img>
            </section>

            <section className="featured section" id="featured">
                <h2 className="section__title">
                    Featured Luxury Cars
                </h2>
                <div className="featured__container container">
                    <ul className="featured__filters">
                        <li>
                            <button
                                className={`featured__item ${filter === 'all' ? 'active-featured' : ''}`}
                                onClick={() => handleFilterClick('all')}
                            >
                                <span>All</span>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`featured__item ${filter === 'tesla' ? 'active-featured' : ''}`}
                                onClick={() => handleFilterClick('tesla')}
                            >
                                <img src="img/logo3.png" alt="f1"></img>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`featured__item ${filter === 'audi' ? 'active-featured' : ''}`}
                                onClick={() => handleFilterClick('audi')}
                            >
                                <img src="img/logo2.png" alt="f1"></img>
                            </button>
                        </li>
                        <li>
                            <button
                                className={`featured__item ${filter === 'porsche' ? 'active-featured' : ''}`}
                                onClick={() => handleFilterClick('porsche')}
                            >
                                <img src="img/logo1.png" alt="f1"></img>
                            </button>
                        </li>
                    </ul>

                    <div className="featured__content grid">
                        {filteredCars.map(car => (
                            <article className={`featured__card ${car.filter}`} key={car.id}>
                                <div className="shape shape__smaller"></div>
                                <h1 className="featured__title">{car.brand}</h1>
                                <h3 className="featured__subtitle">{car.model}</h3>
                                <img src={car.img} alt={`${car.brand} ${car.model}`}></img>
                                <h3 className="featured__price">{car.price}</h3>

                                <button className="button featured__button">
                                    <i className="ri-shopping-bag-3-line"></i>
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Features;
