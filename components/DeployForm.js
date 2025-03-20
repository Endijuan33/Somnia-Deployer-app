// components/DeployForm.js
export default function DeployForm({ deployForm, setDeployForm, deployContract, contractAddress, verifyContract }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Deploy Contract (ERC20 Token)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>
          Token Name:
          <input
            type="text"
            placeholder="e.g., MyToken"
            value={deployForm.name}
            onChange={(e) => setDeployForm({ ...deployForm, name: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Token Symbol:
          <input
            type="text"
            placeholder="e.g., MTK"
            value={deployForm.symbol}
            onChange={(e) => setDeployForm({ ...deployForm, symbol: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Decimals (default 18):
          <input
            type="number"
            placeholder="Decimals"
            value={deployForm.decimals}
            onChange={(e) => setDeployForm({ ...deployForm, decimals: Number(e.target.value) })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Total Supply:
          <input
            type="text"
            placeholder="e.g., 1000000"
            value={deployForm.totalSupply}
            onChange={(e) => setDeployForm({ ...deployForm, totalSupply: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <button onClick={deployContract} style={{ padding: '10px 20px' }}>
          Deploy Contract
        </button>
      </div>

      {contractAddress && (
        <div style={{ marginTop: '20px' }}>
          <p>
            <strong>Deployed Contract Address:</strong> <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${contractAddress}`} target="_blank" rel="noopener noreferrer">{contractAddress}</a>
          </p>
          <p>
            <strong>Token Name:</strong> {deployForm.name} | <strong>Total Supply:</strong> {deployForm.totalSupply}
          </p>
          <button onClick={verifyContract} style={{ padding: '10px 20px' }}>
            Verify Contract
          </button>
        </div>
      )}
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}
