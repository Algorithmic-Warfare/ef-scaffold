import React from "react";
import { useWallet } from "../contexts/WalletContext";
import { ConnectWalletPanel } from "../components/wallet/ConnectWalletPanel";

// MUD-inspired landing page: full viewport center, branded panel prompting wallet connect.
const LandingPage: React.FC = () => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center px-4">
        <ConnectWalletPanel />
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="text-2xl m-4 font-semibold">Wallet Connected</h1>
      <p className="text-sm text-gray-400 m-4">Navigate to the dashboard to explore features.</p>
      <ConnectWalletPanel />
    </div>
  );
};

export default LandingPage;
