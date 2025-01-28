import { useEditorStore } from "@/store/use-editor-store";
import { SketchPicker, type ColorResult } from "react-color";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { HighlighterIcon } from "lucide-react";

export const HighlightColorButton = () => {
	const { editor } = useEditorStore();
	
	const value = editor?.getAttributes("highlight").color || "#FFFFFF";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex}).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 flex flex-col shrink-0 items-center justify-center text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {/* TODO: Maybe modify type of color picker/add additional colors */}
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
