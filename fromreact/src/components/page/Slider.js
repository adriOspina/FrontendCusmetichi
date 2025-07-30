import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;
  const intervalTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide % totalSlides) + 1);
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const showSlide = (n) => {
    setCurrentSlide(n);
  };

  return (
    <div className="slide">
      {[...Array(totalSlides).keys()].map((slide) => (
        <React.Fragment key={slide}>
          <input
            className="slide-open"
            type="radio"
            id={`slide-${slide + 1}`}
            name="slide"
            aria-hidden="true"
            hidden=""
            checked={currentSlide === slide + 1}
            onChange={() => showSlide(slide + 1)}
          />
          <div className="slide-item">
            <img src={`./imagenes/slide${slide + 1}.jfif`} alt={`Slide ${slide + 1}`} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;