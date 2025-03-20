// components/SendForm.js
export function NativeTokenForm({
  nativeForm,
  setNativeForm,
  sendNativeToken,
  isProcessing,
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Send Native Token</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
        }}
      >
        <label>
          Recipient Address:
          <input
            type="text"
            placeholder="Recipient Address"
            value={nativeForm.recipient}
            onChange={(e) =>
              setNativeForm({ ...nativeForm, recipient: e.target.value })
            }
            style={{ padding: '8px', width: '100%' }}
            disabled={isProcessing}
          />
        </label>
        <label>
          Amount (in STT):
          <input
            type="text"
            placeholder="Amount (e.g. 0.01, in STT)"
            value={nativeForm.amount}
            onChange={(e) =>
              setNativeForm({ ...nativeForm, amount: e.target.value })
            }
            style={{ padding: '8px', width: '100%' }}
            disabled={isProcessing}
          />
        </label>
        <button
          onClick={sendNativeToken}
          disabled={isProcessing}
          style={{ padding: '10px 20px' }}
        >
          {isProcessing ? 'Processing...' : 'Send Native Token'}
        </button>
      </div>
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}

export function ERC20TokenForm({
  ercForm,
  setErcForm,
  sendERC20Token,
  isProcessing,
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Send ERC20 Token</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '400px',
        }}
      >
        <label>
          Recipient Address:
          <input
            type="text"
            placeholder="Recipient Address"
            value={ercForm.recipient}
            onChange={(e) =>
              setErcForm({ ...ercForm, recipient: e.target.value })
            }
            style={{ padding: '8px', width: '100%' }}
            disabled={isProcessing}
          />
        </label>
        <label>
          Amount:
          <input
            type="text"
            placeholder="Amount"
            value={ercForm.amount}
            onChange={(e) =>
              setErcForm({ ...ercForm, amount: e.target.value })
            }
            style={{ padding: '8px', width: '100%' }}
            disabled={isProcessing}
          />
        </label>
        <button
          onClick={sendERC20Token}
          disabled={isProcessing}
          style={{ padding: '10px 20px' }}
        >
          {isProcessing ? 'Processing...' : 'Send ERC20 Token'}
        </button>
      </div>
      <hr style={{ marginTop: '20px' }} />
    </div>
  );
}
