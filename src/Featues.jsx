import React from 'react';
function Features (){
    return(
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
                    <p className="features__card-description">Turbochargin</p>
                   </div>

                   <div className="features__card features__card-2">
                    <h3 className="features__card-title">350</h3>
                    <p className="features__card-description">km<br/>Range</p>
                   </div>

                   <div className="features__card features__card-3">
                    <h3 className="features__card-title">480</h3>
                    <p className="features__card-description">km<br/>Travel</p>
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
                        <button className="featured__item active-featured" data-filter="all">
                           <span>All</span>
                        </button>
                       </li>
                       <li>
                        <button className="featured__item" data-filter=".tesla">
                <img src="img/logo3.png" alt="f1"></img>
                        </button>
                       </li>
                       <li>
                        <button className="featured__item" data-filter=".audi">
                            <img src="img/logo2.png" alt="f1"></img>
                        </button>
                       </li>
                       <li>
                        <button className="featured__item" data-filter=".porsche">
                            <img src="img/logo1.png" alt="f1"></img>
                        </button>
                       </li>
                   </ul>
                    
                   <div className="featured__content grid">
                    <article className="featured__card" mix tesla>
                        <div className="shape shape__smaller"></div>
                        <h1 className="featured__title">Tesla</h1>
                        <h3 className="featured__subtitle">Model X</h3>
                        <img src="img/featured1.png" alt="f2"></img>
                        <h3 className="featured__price">$98,900</h3>

                        <button className="button featured__button">
                            <i className="ri-shopping-bag-3-line"></i>
                        </button>

                    </article>
                    
                    <article className="featured__card" mix tesla>
                        <div className="shape shape__smaller"></div>
                        <h1 className="featured__title">Tesla</h1>
                        <h3 className="featured__subtitle">Model 3</h3>
                        <img src="img/featured2.png" alt="f2"></img>
                        <h3 className="featured__price">$45,900</h3>

                        <button className="button featured__button">
                            <i className="ri-shopping-bag-3-line"></i>
                        </button>

                    </article>
                 
                    <article className="featured__card" mix audi>
                        <div className="shape shape__smaller"></div>
                        <h1 className="featured__title">Audi</h1>
                        <h3 className="featured__subtitle">E-tron</h3>
                        <img src="img/featured3.png" alt="f2"></img>
                        <h3 className="featured__price">$175,900</h3>

                        <button className="button featured__button">
                            <i className="ri-shopping-bag-3-line"></i>
                        </button>

                    </article>
                   
                    <article className="featured__card" mix porsche>
                        <div className="shape shape__smaller"></div>
                        <h1 className="featured__title">Porsche</h1>
                        <h3 className="featured__subtitle">Boxster 987</h3>
                        <img src="img/featured4.png" alt="f2"></img>
                        <h3 className="featured__price">$126,900</h3>

                        <button className="button featured__button">
                            <i className="ri-shopping-bag-3-line"></i>
                        </button>

                    </article>
                  
                    <article className="featured__card" mix posche>
                        <div className="shape shape__smaller"></div>
                        <h1 className="featured__title">Porsche</h1>
                        <h3 className="featured__subtitle">Panamera</h3>
                        <img src="img/featured5.png" alt="f2"></img>
                        <h3 className="featured__price">$$126,900</h3>

                        <button className="button featured__button">
                            <i className="ri-shopping-bag-3-line"></i>
                        </button>

                    </article>
                    
                   </div>
                </div>
            </section>
       </>
    );
}
export default Features;