import "./Hero.css";
import { profilePicture } from "../assets/index";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
            
        {/* Left Side: Text Content */}
        <div className="hero-text">
          <div className="hero-rating">
            <span className="stars">★★★★★</span> 4.8 Star (128 Reviews)
          </div>
          
          <h1>Because Email Is <br /> Complicated <br /> Enough.</h1>
          
          <p className="hero-subtext">
            Try Email Finder. Build your leads database faster with less effort. 
            Email Finder. Start using for free.
          </p>
          
          <div className="hero-buttons">
            <button className="app-btn"> App Store</button>
            <button className="app-btn">▶️ Google Play</button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h3>20M+</h3>
              <p>Downloads</p>
            </div>
            <div className="stat-item">
              <h3>120+</h3>
              <p>Countries</p>
            </div>
            <div className="stat-item">
              <h3>80+</h3>
              <p>Languages</p>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hero-image-wrapper">
          <img 
            src={profilePicture}
            alt="Hero Portrait" 
            className="hero-img"
          />
                  </div>

      </div>
    </section>
  )
}
