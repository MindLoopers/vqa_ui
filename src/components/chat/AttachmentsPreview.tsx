import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Attachment {
  type: "image";
  file: File;
  previewUrl: string;
}

interface AttachmentsPreviewProps {
  attachments: Attachment[];
  onClearAll: () => void;
  onRemove: (index: number) => void;
}

const AttachmentsPreview: React.FC<AttachmentsPreviewProps> = ({
  attachments,
  onClearAll,
  onRemove,
}) => {
  if (attachments.length === 0) return null;

  return (
    <div className="border-t border-border p-2 bg-muted">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">
          Attached Images ({attachments.length}/5)
        </span>
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {attachments.map((attachment, index) => (
          <div key={index} className="relative">
            <img
              src={attachment.previewUrl}
              alt={`Preview ${index + 1}`}
              className="h-16 w-16 object-cover rounded"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentsPreview;
