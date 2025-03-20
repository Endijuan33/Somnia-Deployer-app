// components/WalletModal.js
import React from 'react';

export default function WalletModal({ isOpen, onSelect, onClose }) {
  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      logo: '/metamask-logo.png'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      logo: '/walletconnect-logo.png'
    },

  ];

  return (
    <div style={{
      position: 'absolute',
      top: '60px',
      right: '20px',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      padding: '10px'
    }}>
      <button onClick={onClose} style={{ float: 'right', border: 'none', background: 'transparent', fontSize: '16px', cursor: 'pointer' }}>×</button>
      <h3 style={{ marginTop: 0 }}>Select Wallet</h3>
      {walletOptions.map(option => (
        <div key={option.id} onClick={() => onSelect(option.id)} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px 0',
          cursor: 'pointer'
        }}>
          <img src={option.logo} alt={option.name} style={{ height: '24px', marginRight: '10px' }} />
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  );
}
