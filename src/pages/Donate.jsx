import React from 'react';

export default function Donate() {
  return (
    <div className="text-center">
      <h2>Support the Temple</h2>
      <p>Your donation helps us maintain the temple and organize spiritual events.</p>
      <img src="https://i.ibb.co/s6qG5C2/upi-qr.png" alt="UPI QR" className="img-fluid my-3" style={{ maxWidth: '250px' }} />
      <p><strong>Bank Name:</strong> SBI<br />
         <strong>Account No:</strong> 1234567890<br />
         <strong>IFSC:</strong> SBIN0000001</p>
    </div>
  );
}