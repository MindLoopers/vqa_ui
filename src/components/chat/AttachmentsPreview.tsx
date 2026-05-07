import React from "react";
import { Button } from "@/components/ui/button";
import { X, ImageIcon } from "lucide-react";

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
    <div className="border-t border-border bg-card px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            <span>
              {attachments.length} image{attachments.length > 1 ? "s" : ""} attached
              <span className="text-muted-foreground font-normal ml-1">({attachments.length}/5)</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/5"
            onClick={onClearAll}
          >
            Clear all
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative group">
              <img
                src={attachment.previewUrl}
                alt={`Preview ${index + 1}`}
                className="h-16 w-16 object-cover rounded-xl border-2 border-border shadow-sm"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                onClick={() => onRemove(index)}
                title="Remove image"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttachmentsPreview;
