import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ShieldCheck, Database, Cpu } from 'lucide-react';

interface OnChainInfoAccordionProps {
  txHash?: string;
  contractAddress?: string;
  networkName?: string;
}

export const OnChainInfoAccordion: React.FC<OnChainInfoAccordionProps> = ({
  txHash = '0x829f4b1a7d832e91af203102948219048291a91af',
  contractAddress = '0x1234567890ABCDEF1234567890ABCDEF1234ABCD',
  networkName = 'Monad Testnet (Chain ID 10143)',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden">
      {/* Accordion Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-purple-400" />
          <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            On-Chain Information
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 text-purple-300 border border-purple-500/20">
            Demo Network Data
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 pt-0 border-t border-white/5 space-y-3.5 animate-fadeIn">
          {/* Contract Address */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                Smart Contract
              </span>
              <span className="text-xs font-mono text-slate-200 font-bold block truncate">
                {contractAddress}
              </span>
            </div>
            <a
              href="https://testnet.monadexplorer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              <span>Verified Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Network */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                Network Target
              </span>
              <span className="text-xs font-semibold text-slate-200 block">
                {networkName}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              ● Active RPC
            </span>
          </div>

          {/* Transaction Hash */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                Creation Tx Hash
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold block truncate">
                {txHash}
              </span>
            </div>
            <a
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 font-semibold"
            >
              <span>View Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
