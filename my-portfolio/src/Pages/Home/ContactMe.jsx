import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';
import { RiSunLine, RiCloudy2Line, RiRainyLine, RiSnowyLine } from 'react-icons/ri';

function ContactMe() {
  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  return (
    <Container id="Contact" className="contact--section">
      <Header>
        <p className="sub--title" style={{ marginBottom: '18px' }}>
          Contact Me
        </p>
        <h2 style={{ marginBottom: '25px' }}>Get In Touch</h2>
      </Header>
      <ContactInfo>
        <p style={{ marginBottom: '10px' }}>
          <PhoneIcon className="contact-icon" /> +1 438-863-5139
        </p>
        <p style={{ marginBottom: '10px' }}>
          <EnvelopeIcon className="contact-icon" />{' '}
          <a href="mailto:son.kyungyean@gmail.com">son.kyungyean@gmail.com</a>
        </p>
        <p style={{ marginBottom: '10px' }}>
          <MapMarkerIcon className="contact-icon" /> Laval, QC H7P 3P2, Canada
        </p>
      </ContactInfo>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <GoogleMapComponent apiKey={googleMapApiKey} />
        <WeatherComponent apiKey={weatherApiKey} />
      </div>
    </Container>
  );
}

export default ContactMe;

const GoogleMapComponent = ({ apiKey }) => {
  const mapRef = useRef(null);

  const initMap = () => {
    const google = window.google;

    const mapOptions = {
      center: { lat: 45.583, lng: -73.740 },
      zoom: 14,
    };

    const map = new google.maps.Map(mapRef.current, mapOptions);

    new google.maps.Marker({
      position: {
        lat: 45.583,
        lng: -73.740,
      },
      map: map,
      title: '549 Rue Henri, Laval, QC, H7P 3P2, Canada',
    });
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error('Error loading Google Maps script.');
      };
      document.head.appendChild(script);
    };

    if (window.google) {
      initMap();
    } else {
      loadGoogleMapsScript();
    }
  }, [apiKey]);

  return (
    <div ref={mapRef} style={{ width: '500px', height: '330px', marginTop: '10px', marginRight: '40px'}}></div>
  );
};

const WeatherComponent = ({ apiKey }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Laval&appid=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [apiKey]);

  return (
<WeatherContainer>
  {weatherData.main && (
    <>
<WeatherInfo>
  <div className="city">{weatherData.name}</div>
  <div className="temperature">
    {Math.round((weatherData.main.temp - 273.15) * 10) / 10}°C
  </div>
  <div className="sky">
    <WeatherIcon condition={weatherData.weather[0].main} size={66} />
  </div>
  <div className="humidity">
    Humidity: {weatherData.main.humidity}%
  </div>
</WeatherInfo>
    </>
  )}
</WeatherContainer>

  );
};

const WeatherIcon = ({ condition, size }) => {
  let icon = null;
 
  switch (condition) {
    case 'Clear':
      icon = <RiSunLine size={size} />;
      break;
    case 'Clouds':
      icon = <RiCloudy2Line size={size} />;
      break;
    case 'Rain':
      icon = <RiRainyLine size={size} />;
      break;
    case 'Snow':
      icon = <RiSnowyLine size={size} />;
      break;
    default:
      icon = null;
  }

  return icon;
};

const PhoneIcon = styled(FaPhone)`
  color: purple; 
`;

const EnvelopeIcon = styled(FaEnvelope)`
  color: blue; 
`;

const MapMarkerIcon = styled(FaMapMarker)`
  color: rgb(2, 127, 10); 
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 25px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const WeatherContainer = styled.div`
  background-color: #3498db;
  border-radius: 80px;
  padding: 37px;
  color: #fff;
  margin-top: 17px;
`;

const WeatherInfo = styled.div`
  .city {
    margin-top: 5px;
    font-size: 37px;
  }
  .temperature {
    font-size: 70px;
    margin-top: 18px;
    margin-bottom: 20px;
  }

  .humidity {
    font-size: 22px;
    text-align: center;
    marginTop: '5px'
    margin-bottom: 5px;
  }
`;
