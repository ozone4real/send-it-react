import React from "react";

const InfoTiles = () => {
  return (
    <React.Fragment>
      <section id="info">
        <div className="container">
          <div id="happy-customer">.</div>
          <div id="selling-point2">
            <h3>Happy customer</h3>
            <p>
              {" "}
              The satisfaction of our customers is our utmost priority. Which is
              why we strive to provide high-standard services and the best
              possible experience for our customers at all times.
            </p>
            <p>Happy Customer, Happy we !!!</p>
          </div>
        </div>
      </section>
      <section id="info2">
        <div className="container">
          <div id="fast-icon">.</div>
          <div id="selling-point3">
            <h3>Quick as possible !! </h3>
            <hr />
            <p>
              <a href="bookings.html">CREATE AN ORDER</a> from anywhere and to
              any destination, we'll be there in an eye's blink.
            </p>
            <p>
              {" "}
              We always go the distance, so you don't have to.....and very fast.
            </p>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default InfoTiles;
