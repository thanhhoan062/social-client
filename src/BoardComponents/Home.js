import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { FaBars } from 'react-icons/fa';
import phoneImg from '../images/phone.svg';
import '../App.css';

const Home = () => {
  const [content, setContent] = useState('');
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const err =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(err);
      }
    );
  }, []);

  return (
    <section className="hero">
      <main>
        <button className="sidebar-toggle">
          <FaBars />
        </button>
        <div className="hero-center">
          <article className="hero-info">
            <h1>
              Payments infrastructure <br />
              for the internet
            </h1>
            <p>
              Millions of companies of all sizes—from startups to Fortune
              500s—use Stripe’s software and APIs to accept payments, send
              payouts, and manage their businesses online.
            </p>
            <button className="btn">Start now</button>
          </article>
          <article className="hero-images">
            <img src={phoneImg} className="phone-img" alt="phone" />
          </article>
        </div>
      </main>
    </section>
  );
};
export default Home;
