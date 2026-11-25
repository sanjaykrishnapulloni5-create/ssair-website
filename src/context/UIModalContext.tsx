"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { CatalogItem } from "@/data/catalog";

export interface StartProjectPrefill {
  title?: string;
  domain?: string;
  track?: string;
  projectCode?: string;
}

interface UIModalContextValue {
  blueprintItem: CatalogItem | null;
  openBlueprint: (item: CatalogItem) => void;
  closeBlueprint: () => void;

  startProjectOpen: boolean;
  startProjectPrefill: StartProjectPrefill;
  openStartProject: (prefill?: StartProjectPrefill) => void;
  closeStartProject: () => void;

  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const UIModalContext = createContext<UIModalContextValue | undefined>(undefined);

export function UIModalProvider({ children }: { children: React.ReactNode }) {
  const [blueprintItem, setBlueprintItem] = useState<CatalogItem | null>(null);
  const [startProjectOpen, setStartProjectOpen] = useState(false);
  const [startProjectPrefill, setStartProjectPrefill] = useState<StartProjectPrefill>({});
  const [searchOpen, setSearchOpen] = useState(false);

  const openBlueprint = useCallback((item: CatalogItem) => {
    setBlueprintItem(item);
  }, []);

  const closeBlueprint = useCallback(() => {
    setBlueprintItem(null);
  }, []);

  const openStartProject = useCallback((prefill?: StartProjectPrefill) => {
    setStartProjectPrefill(prefill || {});
    setStartProjectOpen(true);
  }, []);

  const closeStartProject = useCallback(() => {
    setStartProjectOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <UIModalContext.Provider
      value={{
        blueprintItem,
        openBlueprint,
        closeBlueprint,
        startProjectOpen,
        startProjectPrefill,
        openStartProject,
        closeStartProject,
        searchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </UIModalContext.Provider>
  );
}

export function useUIModals() {
  const ctx = useContext(UIModalContext);
  if (!ctx) {
    throw new Error("useUIModals must be used inside UIModalProvider");
  }
  return ctx;
}
