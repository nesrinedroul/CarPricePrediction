import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

function Mymain() {
    useEffect(() => {
        // Initialize ScrollReveal
        ScrollReveal().reveal('.home__title, .home__subtitle, .home__elec', {
            duration: 1000,
            origin: 'top',
            distance: '50px',
            delay: 300
        });
        ScrollReveal().reveal('.home__car-data', {
            duration: 1000,
            origin: 'left',
            distance: '50px',
            delay: 600,
            interval: 200
        });
        ScrollReveal().reveal('.home__button', {
            duration: 1000,
            origin: 'bottom',
            distance: '50px',
            delay: 900
        });
    }, []);

    return (
        <main className="main">
            <section className="home section" id="home">
                <div className="shape shape__big"></div>
                <div className="shape shape__small"></div>
                <div className="home__container conatiner grid">
                    <div className="home__data">
                        <h1 className="home__title">Choose the best car</h1>
                        <h2 className="home__subtitle">Porsche mission E</h2>
                        <h3 className="home__elec">
                            <i className="ri-flashlight-fill"> cars </i>
                        </h3>
                    </div>
                    <div className="home__img">
                        <img src="img/home.png" alt="img" />
                    </div>
                    <div className="home__car">
                        <div className="home__car-data">
                            <div className="home__car-icon">
                                <i className="ri-temp-cold-line"></i>
                            </div>
                            <h2 className="home__car-number">24</h2>
                            <h3 className="home__car-name">TEMPERATURE</h3>
                        </div>
                        <div className="home__car-data">
                            <div className="home__car-icon">
                                <i className="ri-dashboard-3-line"></i>
                            </div>
                            <h2 className="home__car-number">873</h2>
                            <h3 className="home__car-name">MILEAGE</h3>
                        </div>
                        <div className="home__car-data">
                            <div className="home__car-icon">
                                <i className="ri-flashlight-fill"></i>
                            </div>
                            <h2 className="home__car-number">94%</h2>
                            <h3 className="home__car-name">BATTERY</h3>
                        </div>
                    </div>
                    <a href="#" className="home__button">START</a>
                </div>
            </section>
        </main>
    );
}

export default Mymain;