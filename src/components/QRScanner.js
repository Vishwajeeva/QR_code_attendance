import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

const QRCodeScanner = () => {
  const [error, setError] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true); // State to control camera activation
  const navigate = useNavigate();
  const [locationError, setLocationError] = useState('');

  // Handle QR code scanning result
  const handleScan = (result) => {
    if (result) {
      let data = result.text;
      data = data
        .replace(/([a-zA-Z]+):/g, '"$1":') // Wrap keys in double quotes
        .replace(/'/g, '"'); // Replace single quotes with double quotes

      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        setIsCameraActive(false); // Turn off the camera
        checkLocation(); // Check if the user is within the allowed location
      } catch (err) {
        console.error("Error parsing QR code data", err);
        setError('Invalid QR code format');
      }
    }
  };

  // Handle any error in scanning
  const handleError = (error) => {
    console.error("QR Code scanning error:", error);
    setError('Unable to access camera or scan QR code');
  };

  // Function to check if the user is within the specified location (50m radius)
  const checkLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`User's location - Latitude: ${latitude}, Longitude: ${longitude}`);

        // Institute's fixed location
        const instituteLatitude = 12.910788;
        const instituteLongitude = 77.5998971;

        const distance = calculateDistance(latitude, longitude, instituteLatitude, instituteLongitude);
        console.log(`Calculated distance to institute: ${distance} meters`);

        if (distance <= 500) {
          navigate('/attendance'); // Navigate to the attendance page if within the allowed radius
        } else {
          alert('You must be within 50m radius of the institute.');
        }
      }, (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location. Please allow location access.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Function to calculate distance using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distance in km
    const distanceInMetres = distanceInKm * 1000; // Convert to meters
    return distanceInMetres;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>QR Code Scanner</h2>
      {error ? <p>{error}</p> : (
        <div style={{ width: '300px', height: '300px', border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
          {isCameraActive && (
            <QrReader
              delay={300}
              onError={handleError}
              onResult={handleScan}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      )}
      {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
    </div>
  );
};

export default QRCodeScanner;
