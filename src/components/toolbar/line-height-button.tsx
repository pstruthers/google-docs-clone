import { ListCollapseIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";

export const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
		{
			label: "Default",
			value: "normal"
		},
		{
			label: "Single",
			value: "1"
		},
		{
			label: "1.15",
			value: "1.15"
		},
		{
			label: "1.5",
			value: "1.5"
		},
		{
			label: "Double",
			value: "2"
		},
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 flex flex-col shrink-0 items-center justify-center text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <ListCollapseIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {lineHeights.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
