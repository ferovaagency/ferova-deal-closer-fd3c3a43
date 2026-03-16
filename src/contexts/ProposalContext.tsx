import { createContext, useContext } from "react";
import type { ProposalData } from "@/hooks/useProposal";

const ProposalContext = createContext<ProposalData | null>(null);

export function ProposalProvider({
  value,
  children,
}: {
  value: ProposalData;
  children: React.ReactNode;
}) {
  return (
    <ProposalContext.Provider value={value}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposalContext(): ProposalData {
  const ctx = useContext(ProposalContext);
  if (!ctx) throw new Error("useProposalContext must be used within ProposalProvider");
  return ctx;
}
