import { useEditorStore } from "@/store/use-editor-store";
import { type ColorResult, SketchPicker } from "react-color";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const TextColorButton = () => {
	const { editor } = useEditorStore();

	const value = editor?.getAttributes("textStyle").color || "#000000";

	const onChange = (color: ColorResult) => {
		editor?.chain().focus().setColor(color.hex).run();
	};

	return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
				<button className="min-w-7 h-7 flex flex-col shrink-0 items-center justify-center text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
					<span className="text-xs">A</span>
					<div className="w-full h-0.5" style={{ backgroundColor: value }} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-0">
				{/* TODO: Maybe modify type of color picker/add additional colors */}
				<SketchPicker
					color={value}
					onChange={onChange}
				/>
			</DropdownMenuContent>
    </DropdownMenu>
  );
};