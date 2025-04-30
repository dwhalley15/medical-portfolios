/**
 * @file Section update context provider.
 * @description This file defines the context provider for triggering updates in sections.
 */

"use client"

import { useState, useContext, createContext } from "react";

const SectionUpdateContext = createContext<() => void>(() => {});

/**
 * This function is the context provider for triggering updates in sections.
 * @param {React.ReactNode} children - The children components to be wrapped by the provider.
 * @returns {JSX.Element} The context provider component.
 */
export function SectionUpdateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [, setTrigger] = useState(0);

  const triggerUpdate = () => setTrigger((prev) => prev + 1);
  

  return (
    <SectionUpdateContext.Provider value={triggerUpdate}>
      {children}
    </SectionUpdateContext.Provider>
  );
}

export const useSectionUpdate = () => useContext(SectionUpdateContext);