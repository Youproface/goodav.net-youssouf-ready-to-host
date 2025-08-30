// components/LegalModal.tsx
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | JSX.Element;
}

export default function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[80vw] max-h-[90vh] rounded-lg p-10 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] 
      shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] 
      backdrop-blur-xl p-0 
      data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl text-orange-500 font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 bg-orange-500 hover:bg-grey-500 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="prose prose-sm text-white-700 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content as string}</ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
