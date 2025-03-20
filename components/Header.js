// components/Header.js
export default function Header({ walletAddress, connectWallet, disconnectWallet, connectionMethod, setConnectionMethod }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Ganti "/somnia-logo.png" dengan URL atau path logo Somnia Network yang Anda miliki */}
        <img src="/somnia-logo.png" alt="Somnia Network" style={{ height: '50px', marginRight: '10px' }} />
        <h1>Somnia Deployer Tools</h1>
      </div>
      
      {/* Pilihan metode koneksi */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="connectionMethod"
            value="metamask"
            checked={connectionMethod === 'metamask'}
            onChange={() => setConnectionMethod('metamask')}
          /> MetaMask
        </label>
        <label>
          <input
            type="radio"
            name="connectionMethod"
            value="walletconnect"
            checked={connectionMethod === 'walletconnect'}
            onChange={() => setConnectionMethod('walletconnect')}
          /> WalletConnect
        </label>
      </div>
      
      {walletAddress ? (
        <div>
          <p><strong>Wallet Connected:</strong> {walletAddress}</p>
          <button onClick={disconnectWallet} style={{ padding: '8px 16px' }}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet} style={{ padding: '8px 16px' }}>Connect Wallet</button>
      )}
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}
