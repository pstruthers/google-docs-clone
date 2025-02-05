"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();

  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_bAHZcP5kKEeSumk5O2pzy1ZBYzI7pXkrCg_a2vVkGt2iI6uLpbIQPFKYg5YmC7eR"
      }
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
