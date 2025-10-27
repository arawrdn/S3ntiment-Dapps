// src/App.jsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletButton from "./components/WalletButton";
import VoteCard from "./components/VoteCard";
import abi from "./S3ntimentABI.json";

// import S3ntiment.png dari root repo langsung
const logo = new URL("../S3ntiment.png", import.meta.url).href;

const CONTRACT_ADDRESS = "0x58B869dFED326e6Fc7fEe96a2CDa79216Eea80E2";

export default function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [question, setQuestion] = useState("");
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    if (!provider || !contract) return;
    loadQuestion();
  }, [provider, contract]);

  async function connectWallet() {
    if (window.ethereum) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      await _provider.send("eth_requestAccounts", []);
      const _signer = await _provider.getSigner();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, abi, _signer);
      setProvider(_provider);
      setSigner(_signer);
      setContract(_contract);
      setWallet(await _signer.getAddress());
    } else {
      alert("Please install a Celo-compatible wallet like MetaMask or Valora.");
    }
  }

  async function loadQuestion() {
    try {
      const [id, q, yes, no] = await contract.getCurrentQuestion();
      setQuestion(q);
      setYesCount(Number(yes));
      setNoCount(Number(no));

      const voted = await contract.votedOnCurrent(wallet);
      setHasVoted(voted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  async function vote(choice) {
    try {
      const tx = choice ? await contract.voteYes() : await contract.voteNo();
      await tx.wait();
      await loadQuestion();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-pink-50 to-green-100 backdrop-blur-lg text-gray-800 p-6">
      <div className="max-w-md w-full bg-white/50 rounded-2xl shadow-lg p-8 backdrop-blur-md border border-white/30">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="S3ntiment Logo" className="w-40 mb-4" />
          <WalletButton connectWallet={connectWallet} wallet={wallet} />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading current question...</p>
        ) : (
          <VoteCard
            question={question}
            yesCount={yesCount}
            noCount={noCount}
            hasVoted={hasVoted}
            onVote={vote}
          />
        )}
      </div>

      <footer className="mt-6 text-sm text-gray-500">
        Powered by <span className="font-semibold text-pink-400">Celo</span> • S3ntiment © 2025
      </footer>
    </div>
  );
}
