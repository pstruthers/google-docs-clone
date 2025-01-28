import { useEditorStore } from "@/store/use-editor-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[120px] h-7 flex shrink-0 items-center justify-between text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="size-4 ml-2 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col p-1 gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center px-2 py-1 gap-x-2 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
