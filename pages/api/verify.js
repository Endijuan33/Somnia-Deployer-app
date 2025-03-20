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
    // Menjalankan perintah verifikasi dengan Hardhat
    const cmd = `npx hardhat verify --network somnia-testnet ${contractAddress} ${constructorArgs.join(' ')}`;
    const { stdout, stderr } = await execPromise(cmd);
    res.status(200).json({ stdout, stderr });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
