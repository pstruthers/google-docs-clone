import { useEditorStore } from "@/store/use-editor-store";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const AlignButton = () => {
	const { editor } = useEditorStore();
	
	const alignments = [
		{
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
	];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 flex flex-col shrink-0 items-center justify-center text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive({ textAlign: value}) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
