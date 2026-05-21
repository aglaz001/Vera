import React from 'react';

type StatusVariant = 'complete' | 'partial' | 'missing' | 'pending' | 'overdue' | 'in-progress' | 'not-started' | 'critical' | 'high' | 'medium' | 'low' | 'approved' | 'under-review' | 'draft' | 'active' | 'planned' | 'completed';

const VARIANT_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  complete:     { dot: 'bg-[#2d6a3f]', badge: 'text-[#2d6a3f] bg-[#2d6a3f]/12 border-[#2d6a3f]/20', label: 'Complete' },
  completed:    { dot: 'bg-[#2d6a3f]', badge: 'text-[#2d6a3f] bg-[#2d6a3f]/12 border-[#2d6a3f]/20', label: 'Completed' },
  approved:     { dot: 'bg-[#2d6a3f]', badge: 'text-[#2d6a3f] bg-[#2d6a3f]/12 border-[#2d6a3f]/20', label: 'Approved' },
  active:       { dot: 'bg-[#2d6a3f]', badge: 'text-[#2d6a3f] bg-[#2d6a3f]/12 border-[#2d6a3f]/20', label: 'Active' },
  partial:      { dot: 'bg-[#e8a200] animate-pulse', badge: 'text-[#9c6200] bg-[#fca311]/15 border-[#fca311]/25', label: 'Partial' },
  'in-progress': { dot: 'bg-[#e8a200] animate-pulse', badge: 'text-[#9c6200] bg-[#fca311]/15 border-[#fca311]/25', label: 'In Progress' },
  'under-review': { dot: 'bg-[#e8a200] animate-pulse', badge: 'text-[#9c6200] bg-[#fca311]/15 border-[#fca311]/25', label: 'Under Review' },
  planned:      { dot: 'bg-[#5b7fde]', badge: 'text-[#3d5cb8] bg-[#5b7fde]/12 border-[#5b7fde]/20', label: 'Planned' },
  missing:      { dot: 'bg-[#ba1a1a]', badge: 'text-[#ba1a1a] bg-[#ba1a1a]/12 border-[#ba1a1a]/20', label: 'Missing' },
  'not-started': { dot: 'bg-[#ba1a1a]', badge: 'text-[#ba1a1a] bg-[#ba1a1a]/12 border-[#ba1a1a]/20', label: 'Not Started' },
  draft:        { dot: 'bg-[#8a9a8e]', badge: 'text-[#4a5449] bg-[#8a9a8e]/12 border-[#8a9a8e]/20', label: 'Draft' },
  pending:      { dot: 'bg-[#8a9a8e] animate-pulse', badge: 'text-[#4a5449] bg-[#8a9a8e]/12 border-[#8a9a8e]/20', label: 'Pending' },
  overdue:      { dot: 'bg-[#ba1a1a] animate-pulse', badge: 'text-[#ba1a1a] bg-[#ba1a1a]/12 border-[#ba1a1a]/20', label: 'Overdue' },
  critical:     { dot: 'bg-[#ba1a1a]', badge: 'text-[#ba1a1a] bg-[#ba1a1a]/12 border-[#ba1a1a]/20', label: 'Critical' },
  high:         { dot: 'bg-[#e8a200]', badge: 'text-[#9c6200] bg-[#fca311]/15 border-[#fca311]/25', label: 'High' },
  medium:       { dot: 'bg-[#5b7fde]', badge: 'text-[#3d5cb8] bg-[#5b7fde]/12 border-[#5b7fde]/20', label: 'Medium' },
  low:          { dot: 'bg-[#2d6a3f]', badge: 'text-[#2d6a3f] bg-[#2d6a3f]/12 border-[#2d6a3f]/20', label: 'Low' },
};

interface StatusBadgeProps {
  status: StatusVariant;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const style = VARIANT_STYLES[status] || VARIANT_STYLES['pending'];
  const displayLabel = label || style.label;

  return (
    <span className={`
      inline-flex items-center gap-1.5 border rounded-full font-bold uppercase tracking-widest
      ${style.badge}
      ${size === 'sm' ? 'text-[8px] px-2.5 py-0.5' : 'text-[10px] px-3.5 py-1'}
    `}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
      {displayLabel}
    </span>
  );
};
