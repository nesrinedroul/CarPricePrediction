import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function SectionComp() {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5 
    });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const variants = {
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, scale: 0.8 }
    };

    return (
        <section className="about section" id="about">
            <div className="about__container container grid">
                <motion.img 
                    ref={ref}
                    src="img/about.png"
                    alt="about"
                    className="about__img"
                    initial="hidden"
                    animate={controls}
                    variants={variants}
                />
                <div className="about__data">
                    <motion.h2 
                        className="section__title about__title"
                        initial="hidden"
                        animate={controls}
                        variants={variants}
                    >
                        Project Made by <br/> Future Engineers
                    </motion.h2>
                    <motion.p 
                        className="about__description"
                        initial="hidden"
                        animate={controls}
                        variants={variants}
                    >
                       Welcome to ESTIMIHALI, your go-to destination for accurate car price estimates. Our user-friendly platform provides customized price charts based on make, model, year, and more. Trust us to deliver transparent reports and expert insights, ensuring informed decisions whether buying or selling. Accessible on-the-go and backed by reliable data, ESTIMIHALI simplifies car valuation for everyone.
                    </motion.p>
                    <motion.a 
                        href="#"
                        className="button"
                        initial="hidden"
                        animate={controls}
                        variants={variants}
                    >
                        Know More
                    </motion.a>
                </div>
            </div>
        </section>
    );
}

export default SectionComp;
