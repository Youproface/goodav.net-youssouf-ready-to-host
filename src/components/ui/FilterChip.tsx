import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip = ({ label, onRemove }: FilterChipProps) => {
  return (
    <div className="inline-flex items-center bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-full">
      <span>{label}</span>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-1.5 rounded-full hover:bg-zinc-700 p-0.5"
        aria-label={`Remove filter: ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};
