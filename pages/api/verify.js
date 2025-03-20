// pages/api/verify.js
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { contractAddress, constructorArgs } = req.body;
  if (!contractAddress || !constructorArgs) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }
  try {
    const quotedArgs = constructorArgs.map(arg =>
      isNaN(Number(arg)) ? `"${arg}"` : arg
    );
    const cmd = `npx hardhat verify --network somnia-testnet ${contractAddress} ${quotedArgs.join(' ')}`;
    console.log("Executing verification command:", cmd);
    const { stdout, stderr } = await execPromise(cmd);
    if (stderr && stderr.trim() !== "") {
      return res.status(500).json({ error: stderr.trim() });
    }
    res.status(200).json({ stdout });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: error.message });
  }
}
