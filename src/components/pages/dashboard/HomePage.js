import React from 'react';
import main from '../../../assets/images/main.svg';
import Wrapper from '../../../assets/wrappers/HomePage';
import { Logo } from '../../../components';

import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>App</span>
          </h1>
          <p>
            {' '}
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/register" className="btn-common btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default HomePage;
