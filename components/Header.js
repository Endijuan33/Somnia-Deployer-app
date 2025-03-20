// components/Header.js
import { useState } from 'react';
import WalletModal from './WalletModal';

export default function Header({
  walletAddress,
  connectWalletHandler,
  disconnectWallet,
  connectionMethod,
  setConnectionMethod,
  isProcessing,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConnectClick = () => {
    if (!isProcessing) {
      setModalOpen(true);
    }
  };

  const handleWalletSelect = async (walletMethod) => {
    setModalOpen(false);
    await connectWalletHandler(walletMethod);
  };

  return (
    <header
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/somnia-logo.png"
          alt="Somnia Network"
          style={{ height: '50px', marginRight: '10px' }}
        />
        <h1 style={{ margin: 0 }}>Somnia Deployer Tools</h1>
      </div>
      <div>
        {walletAddress ? (
          <>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
              {walletAddress}
            </span>
            <button
              onClick={disconnectWallet}
              disabled={isProcessing}
              style={{ padding: '8px 16px' }}
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={handleConnectClick}
            disabled={isProcessing}
            style={{ padding: '8px 16px' }}
          >
            Connect Wallet
          </button>
        )}
      </div>
      <WalletModal
        isOpen={modalOpen}
        onSelect={handleWalletSelect}
        onClose={() => setModalOpen(false)}
      />
    </header>
  );
}
