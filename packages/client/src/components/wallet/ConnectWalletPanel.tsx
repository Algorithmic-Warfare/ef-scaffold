import React, { useEffect } from "react";
import { useWallet, WalletStatus } from "../../contexts/WalletContext";
import { LoadingAnimation } from "../creative";
import { Button } from "../ui/Button";
import { PrimaryLogo } from "../../assets";
import { WalletWithRequiredFeatures } from "@mysten/wallet-standard";

// Optional dedicated panel component (not yet wired) mirroring MUD ConnectWallet layout.
export const ConnectWalletPanel: React.FC = () => {
  const { wallets, isConnected, connectWallet, status } = useWallet();

  // Auto-connect if exactly one wallet available and not connected yet (MUD-like frontier auto-connect).

  const deriveBtnText = (
    status: WalletStatus,
    isConnected: boolean,
    wallets: WalletWithRequiredFeatures[]
  ): { buttonText: string; buttonDisabled: boolean } => {
    if (wallets.length === 0) {
      return { buttonText: "Please install a SUI Wallet", buttonDisabled: true };
    }
    switch (`${status}-${isConnected}`) {
      case "connecting-false":
        return { buttonText: "Connecting...", buttonDisabled: true };
      case "idle-false":
        return { buttonText: "Connect with SUI wallet", buttonDisabled: false };
      case "connected-true":
        return { buttonText: "Connected", buttonDisabled: true };
      default:
        return { buttonText: "Connect Wallet", buttonDisabled: false };
    }
  };
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center">
      <>
        {" "}
        <div className="relative mx-auto flex h-screen max-w-[560px] flex-col items-center justify-center">
          <LoadingAnimation position="diagonal">
            <div>
              <div className="flex h-full w-full items-center justify-center p-4">
                <PrimaryLogo />
              </div>{" "}
              <div className="absolute -bottom-4 flex w-full items-center justify-center">
                <Button
                  className="mx-auto uppercase"
                  id="connect-sui-wallet"
                  variant="secondary"
                  onClick={() => connectWallet(wallets[0])}
                  disabled={deriveBtnText(status, isConnected, wallets).buttonDisabled}
                >
                  {deriveBtnText(status, isConnected, wallets).buttonText}
                </Button>
              </div>
            </div>{" "}
          </LoadingAnimation>

          {/* <div className="mb-10" />
          <Button
            className="mx-auto"
            onClick={() => window.open("https://symplectic.link/Algorithmic+Warfare/INDEX")}
          >
            Documentation
          </Button> */}
          
        </div>
      </>
      {/* <div className="group relative h-64 w-64">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-teal-500/40 via-purple-600/40 to-indigo-600/40 opacity-75 blur-sm transition group-hover:opacity-100" />
        <LoadingAnimation position={"horizontal"}>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg border border-teal-400/40 bg-black/80 p-4">
            <span className="mb-2 text-xs tracking-widest text-gray-400 uppercase">
              EF Scaffold
            </span>
            {!isConnected && wallets.length > 1 && (
              <div className="flex w-full flex-col gap-2">
                {wallets.map((w) => (
                  <Button
                    key={w.name}
                    variant="secondary"
                    className="w-full text-xs"
                    onClick={() => connectWallet(w)}
                  >
                    Connect {w.name}
                  </Button>
                ))}
              </div>
            )}
            {isConnected && <span className="text-[10px] text-teal-400">Connected</span>}
          </div>
        </LoadingAnimation>
        {!isConnected && wallets.length <= 1 && (
          <div className="absolute right-0 -bottom-6 left-0 flex justify-center">
            <ConnectWalletButton />
          </div>
        )}
      </div> */}
      {/* <div className="mt-10 space-y-2 text-center">
        {!wallets.length && (
          <p className="text-xs text-orange-400">Install a SUI wallet extension to begin.</p>
        )}
        <p className="text-[10px] text-gray-500">Need help? See wallet setup docs (coming soon).</p>
      </div> */}
    </div>
  );
};
