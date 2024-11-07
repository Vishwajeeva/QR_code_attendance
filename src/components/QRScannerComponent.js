// src/components/QRScannerComponent.js

import React, { useEffect, useRef } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import axios from 'axios';

function QRScannerComponent() {
    const videoRef = useRef(null);
    const codeReader = new BrowserQRCodeReader();

    useEffect(() => {
        const startScanner = async () => {
            const videoInputDevices = await codeReader.listVideoInputDevices();
            const firstDeviceId = videoInputDevices[0].deviceId;
            codeReader.decodeFromVideoDevice(firstDeviceId, videoRef.current, (result, err) => {
                if (result) {
                    console.log('QR Code Result:', result);
                    markAttendance(result.text);  // Mark attendance with the QR code data
                }
            });
        };

        startScanner();

        return () => {
            codeReader.reset();
        };
    }, []);

    const markAttendance = async (qrCode) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/attendance/mark/',
                { qr_code: qrCode },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );
            alert('Attendance marked successfully');
        } catch (error) {
            alert('Error marking attendance');
        }
    };

    return (
        <div>
            <h2>Scan QR Code to Mark Attendance</h2>
            <video ref={videoRef} width="300" height="300" />
        </div>
    );
}

export default QRScannerComponent;
