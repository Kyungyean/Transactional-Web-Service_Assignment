export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section--content">
          <p className="section--title">Hello, I am Kyungyean!</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title--color">Full Stack</span> <br /> Developer
          </h1>
          <p className="hero--section-description">
            Welcome! <br /> Bridge the gap between front-end creativity and back-end functionality, crafting dynamic and responsive digital solutions.
          </p>
          <a href="./img/CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '20px' }}>Download CV</a>
        </div>
      </div>
      <div className="hero--section--img">
        <img src="./img/hero_img.png" alt="Hero Section" />
      </div>
    </section>
  );
}