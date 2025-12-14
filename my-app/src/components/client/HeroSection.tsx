"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  return (
    <section id="hero" className="hero section light-background">
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">
              Enjoy Your Healthy
              <br />
              Delicious Food
            </h1>

            <p data-aos="fade-up" data-aos-delay="100">
              We are team of talented designers making websites with Bootstrap
            </p>

            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="#book-a-table" className="btn-get-started">
                Book a Table
              </a>
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox btn-watch-video d-flex align-items-center"
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>

          <div
            className="col-lg-5 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
          >
            <Image
              src="/assets/img/hero-img.png"
              width={500}
              height={500}
              alt="Hero Image"
              className="img-fluid animated"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
