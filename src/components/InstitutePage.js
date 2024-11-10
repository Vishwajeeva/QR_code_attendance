// src/pages/InstitutePage.js
import React, { useState } from 'react';

function InstitutePage() {
  const [qrCodeUrl, setQrCodeUrl] = useState(null); // State to store the generated QR code URL

  const handleGenerateQRCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/generate_qr_code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setQrCodeUrl(data.qrCodeUrl); // Update state with the generated QR code URL
        alert('QR Code Generated!');
      } else {
        alert('Error generating QR Code');
      }
    } catch (error) {
      alert('Error generating QR Code');
    }
  };

  return (
    <div>
      <h2>Institute Dashboard</h2>
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>

      {qrCodeUrl && (
        <div>
          <h3>Generated QR Code:</h3>
          <img src={qrCodeUrl} alt="Generated QR Code" />
        </div>
      )}
    </div>
  );
}

export default InstitutePage;
