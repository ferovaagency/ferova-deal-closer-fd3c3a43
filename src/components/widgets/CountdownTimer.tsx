import { useCountdown } from "@/hooks/useCountdown";
import { useProposalContext } from "@/contexts/ProposalContext";

interface CountdownTimerProps {
  compact?: boolean;
}

const CountdownTimer = ({ compact = false }: CountdownTimerProps) => {
  const proposal = useProposalContext();
  const { days, hours, minutes, seconds, isExpired, isUrgent } = useCountdown(proposal.deadline_iso);

  if (isExpired) {
    return (
      <span className="text-red-500 font-body font-600 animate-urgent-pulse">
        Esta propuesta ha vencido
      </span>
    );
  }

  const urgentClass = isUrgent ? "text-red-500 animate-urgent-pulse" : "text-primary-foreground";

  if (compact) {
    return (
      <span className={`font-body font-medium text-sm ${urgentClass}`}>
        Vence en: {days}d {hours}h {minutes}m {seconds}s
      </span>
    );
  }

  return (
    <div className={`font-body font-semibold text-lg ${urgentClass}`}>
      <span>Vence en: {days}d {hours}h {minutes}m {seconds}s</span>
    </div>
  );
};

export default CountdownTimer;
