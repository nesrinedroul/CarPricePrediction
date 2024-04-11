import React from 'react';
function CarsComp (){
    return(
    <>
      <section className="popular section" id="popular">
      <h2 className="section__title">
          Choose your Electric Car <br> </br>Of The porsche Brand
      </h2>
      <div className="popular__container container swiper">
          <div className="swiper-wrapper">
              <article className="popular__card swiper-slide">
                 <div className="shape shape__smaller"></div> 
                 <h1 className="popular__title">Porsche</h1>
                 <h3 className="popular__subtitle">Turbo S</h3>
                 <img src="img/popular1.png" alt="car1"></img>
                 <div className="popular__data">
                  <div className="popular__data-group">
                      <i className="ri-dashboard-3-line"></i>3.7 Sec
                  </div>
                  <div className="popular__data-group">
                      <i className="ri-dashboard-3-line"></i>356 Km/h
                  </div>
                  <div className="popular__data-group">
                      <i className="ri-charging-pile-2-fill"></i>Electric
                  </div>
                 </div>
                 <h3 className="popular__price">$175,900</h3>
                <button className="button popular__button">
                  <i className="ri-shopping-bag-3-line"></i>
                </button>
              </article>
               <article className="popular__card swiper-slide">
                  <div className="shape shape__smaller"></div> 
                  <h1 className="popular__title">Porsche</h1>
                  <h3 className="popular__subtitle">Taycan</h3>
                  <img src="img/popular2.png" alt="car2"></img>
                  <div className="popular__data">
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>3.7 Sec
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>356 Km/h
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-charging-pile-2-fill"></i>Electric
                   </div>
                  </div>
                  <h3 className="popular__price">$114900,</h3>
                 <button className="button popular__button">
                   <i className="ri-shopping-bag-3-line"></i>
                 </button>
               </article>

               <article className="popular__card swiper-slide">
                  <div className="shape shape__smaller"></div> 
                  <h1 className="popular__title">Porsche</h1>
                  <h3 className="popular__subtitle">Turbo S Cross</h3>
                  <img src="img/popular3.png" alt="car3"></img>
                  <div className="popular__data">
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>3.7 Sec
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>356 Km/h
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-charging-pile-2-fill"></i>Electric
                   </div>
                  </div>
                  <h3 className="popular__price">$150,900</h3>
                 <button className="button popular__button">
              <i className="ri-shopping-bag-3-line"></i>
                 </button>
               </article>

               <article className="popular__card swiper-slide">
                  <div className="shape shape__smaller"></div> 
                  <h1 className="popular__title">Porsche</h1>
                  <h3 className="popular__subtitle">Boxster 718</h3>
                  <img src="img/popular4.png" alt="car4"></img>
                  <div className="popular__data">
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>3.7 Sec
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>356 Km/h
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-charging-pile-2-fill"></i>Electric
                   </div>
                  </div>
                  <h3 className="popular__price">$125,900</h3>
                 <button className="button popular__button">
                   <i className="ri-shopping-bag-3-line"></i>
                 </button>
               </article>
                
                 <article className="popular__card swiper-slide">
                  <div className="shape shape__smaller"></div> 
                  <h1 className="popular__title">Porsche</h1>
                  <h3 className="popular__subtitle">Cayman</h3>
                  <img src="img/popular5.png" alt="car5"></img>
                  <div className="popular__data">
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>3.7 Sec
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-dashboard-3-line"></i>356 Km/h
                   </div>
                   <div className="popular__data-group">
                       <i className="ri-charging-pile-2-fill"></i>Electric
                   </div>
                  </div>
                  <h3 className="popular__price">$128,900</h3>
                 <button className="button popular__button">
                  <i className="ri-shopping-bag-3-line"></i>
                 </button>
               </article>
      </div>
      <div className="swiper-pagination"></div>
      </div>
  </section>
  </>
    );
}
export default CarsComp;