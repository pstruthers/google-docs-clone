import { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
	const [leftMargin, setLeftMargin] = useState(56);
	const [rightMargin, setRightMargin] = useState(56);

	const [isDraggingLeft, setIsDraggingLeft] = useState(false);
	const [isDraggingRight, setIsDraggingRight] = useState(false);

	const rulerRef = useRef<HTMLDivElement>(null);

	const handleLeftMouseDown = () => {
		setIsDraggingLeft(true);
	};

	const handleRightMouseDown = () => {
		setIsDraggingRight(true);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		const PAGE_WIDTH = 816;
		const MIN_SPACE = 100;

		if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
			const container = rulerRef.current.querySelector("#ruler-container");
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const relativeX = e.clientX - containerRect.left;
				const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

				if (isDraggingLeft) {
					const maxLeftPosition = PAGE_WIDTH - rightMargin - MIN_SPACE;
					const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
					setLeftMargin(newLeftPosition); // TODO: Make collaborative
				} else if (isDraggingRight) {
					const maxRightPosition = PAGE_WIDTH - (leftMargin + MIN_SPACE);
					const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
					const constrainedRightPosition = Math.min(newRightPosition, maxRightPosition);
					setRightMargin(constrainedRightPosition);
				}
			}
		}
	};

	const handleMouseUp = () => {
		setIsDraggingLeft(false);
		setIsDraggingRight(false);
	};

	const handleLeftDoubleClick = () => {
		setLeftMargin(56);
	};

	const handleRightDoubleClick = () => {
		setRightMargin(56);
	};

	return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="flex items-end relative select-none h-6 border-b border-gray-300 print:hidden"
    >
      <div
        id="ruler-container"
        className="max-w-[816px] w-full h-full mx-auto relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="h-full absolute inset-x-0 bottom-0">
          <div className="w-[816px] h-full relative">
            {markers.map((marker) => {
              const position = (marker * 816) / 82;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="w-[1px] h-2 absolute bottom-0 bg-neutral-500" />
                      <span className="absolute bottom-2 transform -translate-x-1/2 text-[10px] text-neutral-500">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="w-[1px] h-1.5 absolute bottom-0 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="w-[1px] h-1 absolute bottom-0 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
	position: number;
	isLeft: boolean;
	isDragging: boolean;
	onMouseDown: () => void;
	onDoubleClick: () => void;
};

const Marker = ({
	position,
	isLeft,
	isDragging,
	onMouseDown,
	onDoubleClick
}: MarkerProps) => {
	return (
		<div
			className="w-4 h-full absolute top-0 cursor-ew-resize z-[5] group -ml-2"
			style={{ [isLeft ? "left" : "right"]: `${position}px` }}
			onMouseDown={onMouseDown}
			onDoubleClick={onDoubleClick}
		>
			<FaCaretDown className="absolute top-0 left-1/2 h-full fill-blue-500 transform -translate-x-1/2" />
			<div
				className="absolute top-4 left-1/2 transform -translate-x-1/2"
				style={{
					height: "100vh",
					width: "1px",
					transform: "scaleX(0.5)",
					backgroundColor: "#3B72F6",
					display: isDragging ? "block" : "none"
				}}
			/>
		</div>
	);
};