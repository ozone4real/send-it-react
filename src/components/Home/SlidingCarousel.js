import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SlidingCarousel extends Component {
  state = {
    toggleCarousel: false,
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ toggleCarousel: !this.state.toggleCarousel });
    }, 7000);
  }

  render() {
    return (
      <section id="showcase">
        <div className="container">
          <ul>
            <li id="carousel-item-1" className={this.state.toggleCarousel ? 'sliding' : ''}>
              <div id="selling-point">
                <p>Nigeria's number one courier service provider.</p>
                <p>Lightening fast deliveries of your parcels</p>
                <Link to="/createOrder">
                  <p>CREATE AN ORDER NOW</p>
                </Link>
              </div>
            </li>
            <li id="carousel-item-2">
              <div id="selling-point">
                <p>Any location, Any destination, we're ready</p>
                <p>Always at Your service, anytime, anyday.</p>
                <a href="bookings.html">
                  <p>CREATE AN ORDER NOW</p>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default SlidingCarousel;
