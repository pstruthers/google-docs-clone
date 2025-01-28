import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const LinkButton = () => {
	const { editor } = useEditorStore();

	const [value, setValue] = useState("");

	const onChange = (href: string) => {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	};

	return (
		<DropdownMenu onOpenChange={(open) => {
			if (open) {
				setValue(editor?.getAttributes("link").href || "");
			}
		}}>
      <DropdownMenuTrigger asChild>
        <button className="min-w-7 h-7 flex flex-col shrink-0 items-center justify-center text-sm rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center p-2.5 gap-x-2">
				<Input
					placeholder="https://example.com"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button onClick={() => onChange(value)}>
					Apply
				</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};