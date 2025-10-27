import React from "react";

export default function WalletButton({ account, onConnect, loading }) {
  return account ? (
    <div className="text-sm font-medium px-3 py-1 rounded-full border">
      {account.slice(0,6)}...{account.slice(-4)}
    </div>
  ) : (
    <button
      onClick={onConnect}
      className="px-4 py-2 rounded-full font-semibold shadow"
      style={{ background: 'linear-gradient(90deg,#ff9ccf,#95ffd1)' }}
    >
      {loading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
