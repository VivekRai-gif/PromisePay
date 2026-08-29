import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Database } from 'lucide-react';

interface OnChainInfoAccordionProps {
  txHash?: string;
  contractAddress?: string;
  networkName?: string;
}

export const OnChainInfoAccordion: React.FC<OnChainInfoAccordionProps> = ({
  txHash = '0x829f4b1a7d832e91af203102948219048291a91af',
  contractAddress = '0x829F4B1A7D832E91AF203102948219048291A91C',
  networkName = 'Monad Testnet (Chain ID 10143)',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="rounded-3xl glass-lime-primary border border-white/10 overflow-hidden">
      {/* Accordion Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-[#CFFF00]" />
          <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
            On-Chain Information
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#CFFF00]/10 text-[#CFFF00] border border-[#CFFF00]/30">
            Monad Contract
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#64748B]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#64748B]" />
        )}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 pt-0 border-t border-white/10 space-y-3.5 animate-fadeIn">
          {/* Contract Address */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider block mb-0.5">
                Smart Contract
              </span>
              <span className="text-xs font-mono text-[#9AA4B2] font-bold block truncate">
                {contractAddress}
              </span>
            </div>
            <a
              href={`https://testnet.monadexplorer.com/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#CFFF00] hover:text-white font-semibold"
            >
              <span>Verified Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Network */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider block mb-0.5">
                Network Target
              </span>
              <span className="text-xs font-semibold text-[#9AA4B2] block">
                {networkName}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#19D98B]/15 text-[#19D98B] border border-[#19D98B]/30">
              ● Active RPC
            </span>
          </div>

          {/* Transaction Hash */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-[#64748B] font-semibold uppercase tracking-wider block mb-0.5">
                Creation Tx Hash
              </span>
              <span className="text-xs font-mono text-[#CFFF00] font-bold block truncate">
                {txHash}
              </span>
            </div>
            <a
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#CFFF00] hover:text-white font-semibold"
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
