"use client";

import React, { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import LightRays from "./LightRays";

type Props = React.ComponentProps<typeof LightRays>;

export default function LightRaysClient(props: Props) {
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    const container = document.getElementById("light-rays-root");
    if (!container) return;

    // Create a React root inside the existing server-rendered container
    rootRef.current = createRoot(container);
    rootRef.current.render(<LightRays {...props} />);

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This client wrapper doesn't render DOM itself; it mounts into the
  // server-rendered `#light-rays-root` container to keep SSR markup stable.
  return null;
}
