// pages/index.js
import { useState } from 'react';
import { ethers } from 'ethers';
import tokenArtifact from '../artifacts/contracts/CustomToken.sol/CustomToken.json';
import Header from '../components/Header';
import DeployForm from '../components/DeployForm';
import { NativeTokenForm, ERC20TokenForm } from '../components/SendForm';

export default function Home() {
  // Wallet & contract states
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [txStatus, setTxStatus] = useState('');

  // Form states
  const [deployForm, setDeployForm] = useState({
    name: '',
    symbol: '',
    decimals: 18,
    totalSupply: ''
  });
  const [nativeForm, setNativeForm] = useState({
    recipient: '',
    amount: ''
  });
  const [ercForm, setErcForm] = useState({
    recipient: '',
    amount: ''
  });

  // Connection method: 'metamask' atau 'walletconnect'
  const [connectionMethod, setConnectionMethod] = useState('metamask');

  // Target network: Somnia Testnet (chainId 50312 => hex 0xC488)
  const targetChainId = '0xC488';

  async function ensureCorrectNetwork() {
    if (!provider) throw new Error("Provider is not initialized.");
    const network = await provider.getNetwork();
    if (network.chainId !== 50312) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: targetChainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: targetChainId,
                chainName: 'Somnia Testnet',
                rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL || 'https://your.rpc.url'],
                nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
                blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://your.explorer.url'],
              }],
            });
          } catch (addError) {
            console.error('Failed to add network', addError);
            throw new Error("Failed to add Somnia Testnet.");
          }
        } else {
          console.error('Failed to switch network', switchError);
          throw new Error("Failed to switch to Somnia Testnet.");
        }
      }
    }
  }

  // Fungsi koneksi menggunakan MetaMask
  async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        await web3Provider.send("eth_requestAccounts", []);
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: targetChainId,
                  chainName: 'Somnia Testnet',
                  rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL || 'https://your.rpc.url'],
                  nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
                  blockExplorerUrls: [process.env.NEXT_PUBLIC_EXPLORER_URL || 'https://your.explorer.url'],
                }],
              });
            } catch (addError) {
              console.error('Failed to add network', addError);
              alert("Failed to add Somnia Testnet.");
              return;
            }
          } else {
            console.error('Failed to switch network', switchError);
            alert("Failed to switch to Somnia Testnet.");
            return;
          }
        }
        const web3Signer = web3Provider.getSigner();
        const addr = await web3Signer.getAddress();
        setProvider(web3Provider);
        setSigner(web3Signer);
        setWalletAddress(addr);
      } catch (error) {
        console.error(error);
        alert("Failed to connect wallet.");
      }
    } else {
      alert("MetaMask is not installed!");
    }
  }

  // Fungsi koneksi menggunakan WalletConnect (impor dinamis agar hanya dieksekusi di client)
  async function connectWalletConnect() {
    try {
      if (typeof window === 'undefined') return; // pastikan hanya dieksekusi di client
      const WalletConnectProvider = (await import("@walletconnect/web3-provider")).default;
      const walletConnectProvider = new WalletConnectProvider({
        rpc: { 50312: process.env.NEXT_PUBLIC_RPC_URL || 'https://your.rpc.url' },
        chainId: 50312,
      });
      await walletConnectProvider.enable();
      const web3Provider = new ethers.providers.Web3Provider(walletConnectProvider);
      const web3Signer = web3Provider.getSigner();
      const addr = await web3Signer.getAddress();
      setProvider(web3Provider);
      setSigner(web3Signer);
      setWalletAddress(addr);
    } catch (error) {
      console.error(error);
      alert("Failed to connect using WalletConnect.");
    }
  }

  // Handler koneksi berdasarkan metode yang dipilih
  async function connectWalletHandler() {
    if (connectionMethod === 'metamask') {
      await connectMetaMask();
    } else if (connectionMethod === 'walletconnect') {
      await connectWalletConnect();
    }
  }

  function disconnectWallet() {
    setProvider(null);
    setSigner(null);
    setWalletAddress('');
  }

  async function deployContract() {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!deployForm.name || !deployForm.symbol || !deployForm.totalSupply) {
      alert("Please fill in the token name, symbol, and total supply.");
      return;
    }
    try {
      await ensureCorrectNetwork();
      setTxStatus('Deploying contract...');
      const factory = new ethers.ContractFactory(
        tokenArtifact.abi,
        tokenArtifact.bytecode,
        signer
      );
      const totalSupplyWei = ethers.utils.parseUnits(deployForm.totalSupply, deployForm.decimals);
      const contract = await factory.deploy(
        deployForm.name,
        deployForm.symbol,
        deployForm.decimals,
        totalSupplyWei
      );
      setTxStatus(
        <>
          Transaction sent:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${contract.deployTransaction.hash}`} target="_blank" rel="noopener noreferrer">
            {contract.deployTransaction.hash.substring(0, 10)}...
          </a>
        </>
      );
      await contract.deployed();
      setContractAddress(contract.address);
      setTxStatus(
        <>
          Contract deployed at:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${contract.address}`} target="_blank" rel="noopener noreferrer">
            {contract.address.substring(0, 10)}...
          </a>
          <br />
          <strong>Token Name:</strong> {deployForm.name} | <strong>Total Supply:</strong> {deployForm.totalSupply}
        </>
      );
    } catch (error) {
      console.error(error);
      setTxStatus(`Error: ${error.message}`);
    }
  }

  async function verifyContract() {
    if (!contractAddress) {
      alert("Please deploy the contract first.");
      return;
    }
    try {
      setTxStatus('Verifying contract...');
      const totalSupplyWei = ethers.utils.parseUnits(deployForm.totalSupply, deployForm.decimals).toString();
      const constructorArgs = [
        deployForm.name,
        deployForm.symbol,
        deployForm.decimals.toString(),
        totalSupplyWei,
      ];
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractAddress, constructorArgs }),
      });
      const data = await res.json();
      if (data.error) {
        setTxStatus(`Verification Error: ${data.error}`);
      } else {
        setTxStatus(
          <>
            Verification successful:&nbsp;
            <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/address/${contractAddress}#code`} target="_blank" rel="noopener noreferrer">
              View Contract
            </a>
          </>
        );
      }
    } catch (error) {
      setTxStatus(`Verification failed: ${error.message}`);
    }
  }

  async function sendNativeToken() {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      await ensureCorrectNetwork();
      if (!nativeForm.recipient || !nativeForm.amount) {
        alert("Please fill in the recipient address and amount.");
        return;
      }
      setTxStatus('Sending native token...');
      const tx = await signer.sendTransaction({
        to: nativeForm.recipient,
        value: ethers.utils.parseEther(nativeForm.amount)
      });
      setTxStatus(
        <>
          Transaction sent:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
            {tx.hash.substring(0, 10)}...
          </a>
        </>
      );
      await tx.wait();
      setTxStatus(
        <>
          Transaction confirmed:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
            {tx.hash.substring(0, 10)}...
          </a>
        </>
      );
    } catch (error) {
      console.error(error);
      setTxStatus(`Error: ${error.message}`);
    }
  }

  async function sendERC20Token() {
    if (!signer || !contractAddress) {
      alert("Please deploy the contract and connect your wallet first.");
      return;
    }
    try {
      await ensureCorrectNetwork();
      if (!ercForm.recipient || !ercForm.amount) {
        alert("Please fill in the recipient address and amount.");
        return;
      }
      setTxStatus('Sending ERC20 token...');
      const contract = new ethers.Contract(contractAddress, tokenArtifact.abi, signer);
      const amountUnits = ethers.utils.parseUnits(ercForm.amount, deployForm.decimals);
      const tx = await contract.sendToken(ercForm.recipient, amountUnits);
      setTxStatus(
        <>
          Transaction sent:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
            {tx.hash.substring(0, 10)}...
          </a>
        </>
      );
      await tx.wait();
      setTxStatus(
        <>
          Transaction confirmed:&nbsp;
          <a href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
            {tx.hash.substring(0, 10)}...
          </a>
        </>
      );
    } catch (error) {
      console.error(error);
      setTxStatus(`Error: ${error.message}`);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Header
        walletAddress={walletAddress}
        connectWallet={connectWalletHandler}
        disconnectWallet={disconnectWallet}
        connectionMethod={connectionMethod}
        setConnectionMethod={setConnectionMethod}
      />

      <DeployForm
        deployForm={deployForm}
        setDeployForm={setDeployForm}
        deployContract={deployContract}
        contractAddress={contractAddress}
        verifyContract={verifyContract}
      />

      <NativeTokenForm
        nativeForm={nativeForm}
        setNativeForm={setNativeForm}
        sendNativeToken={sendNativeToken}
      />

      <ERC20TokenForm
        ercForm={ercForm}
        setErcForm={setErcForm}
        sendERC20Token={sendERC20Token}
      />

      <div style={{ marginTop: '20px', background: '#f2f2f2', padding: '10px', borderRadius: '4px' }}>
        <p><strong>Status:</strong> {txStatus}</p>
      </div>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px', textAlign: 'center' }}>
        <p>Built with love ❤️ for Somnia Network.</p>
        <p>Designed by <strong>Endcore</strong></p>
        <p>
          <a href="https://github.com/Endijuan33" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            <img src="/github-icon.png" alt="GitHub" style={{ height: '20px', verticalAlign: 'middle' }} /> GitHub
          </a>
          <a href="https://t.me/e0303" target="_blank" rel="noopener noreferrer">
            <img src="/telegram-icon.png" alt="Telegram" style={{ height: '20px', verticalAlign: 'middle' }} /> Telegram
          </a>
        </p>
      </footer>
    </div>
  );
}
