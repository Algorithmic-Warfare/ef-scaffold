import * as Accordion from "@radix-ui/react-accordion";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { default as LandingPage } from "./views/LandingPage";
import { useWallet, useDisplayAddress } from "./contexts/WalletContext";

// Dashboard content formerly Home; shown after wallet connection on landing page as well.
function Dashboard() {
  const { status, info, isConnected } = useWallet();
  const displayAddress = useDisplayAddress();
  return (
    <div className="m-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">EF Scaffold Dashboard</h1>
        <p className="text-sm text-gray-400">SUI integration playground.</p>
        {/* <Button variant="secondary">Example Action</Button> */}
        <div className="mt-4 space-y-2 rounded-md border border-gray-800 p-3 text-sm">
          <div className="text-xs text-gray-400">
            Status: <span className="text-gray-300">{status}</span>
            {isConnected && displayAddress && (
              <>
                {" "}
                • Address: <span className="text-gray-300">{displayAddress}</span> • Wallet:{" "}
                {info.walletName}
              </>
            )}
          </div>
        </div>
      </div>
      <Accordion.Root type="single" collapsible className="w-full space-y-2">
        <Accordion.Item
          value="item-1"
          className="overflow-hidden rounded-md border border-gray-800"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full bg-gray-900 px-4 py-2 text-left text-sm font-medium hover:bg-gray-800">
              What is this scaffold?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="bg-black px-4 py-3 text-sm text-gray-300">
            React + Tailwind + Radix + dapp-kit baseline for SUI dApps.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item
          value="item-2"
          className="overflow-hidden rounded-md border border-gray-800"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full bg-gray-900 px-4 py-2 text-left text-sm font-medium hover:bg-gray-800">
              Next steps?
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="bg-black px-4 py-3 text-sm text-gray-300">
            Implement queries, transaction helpers, and domain modules.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

function About() {
  return (
    <div className="page space-y-2">
      <h2 className="text-2xl">About</h2>
      <p className="text-sm text-gray-400">This is a minimal placeholder route.</p>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <nav className="nav m-4 space-4 space-x-2">
        <Link to="/">Landing</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
