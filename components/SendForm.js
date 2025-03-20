// components/SendForm.js
export function NativeTokenForm({ nativeForm, setNativeForm, sendNativeToken }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Send Native Token</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>
          Recipient Address:
          <input
            type="text"
            placeholder="Recipient Address"
            value={nativeForm.recipient}
            onChange={(e) => setNativeForm({ ...nativeForm, recipient: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Amount (in STT):
          <input
            type="text"
            placeholder="Amount (e.g., in STT)"
            value={nativeForm.amount}
            onChange={(e) => setNativeForm({ ...nativeForm, amount: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <button onClick={sendNativeToken} style={{ padding: '10px 20px' }}>
          Send Native Token
        </button>
      </div>
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}

export function ERC20TokenForm({ ercForm, setErcForm, sendERC20Token }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Send ERC20 Token</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <label>
          Recipient Address:
          <input
            type="text"
            placeholder="Recipient Address"
            value={ercForm.recipient}
            onChange={(e) => setErcForm({ ...ercForm, recipient: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            placeholder="Amount"
            value={ercForm.amount}
            onChange={(e) => setErcForm({ ...ercForm, amount: e.target.value })}
            style={{ padding: '8px', width: '100%' }}
          />
        </label>
        <button onClick={sendERC20Token} style={{ padding: '10px 20px' }}>
          Send ERC20 Token
        </button>
      </div>
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}
