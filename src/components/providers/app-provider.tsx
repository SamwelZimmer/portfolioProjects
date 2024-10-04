"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMounted } from "@/hooks/use-mounted";
import ServerLoadingPage from "@/components/misc/ServerLoadingPage";

interface AppContextProps {
  isListView: boolean;
  setIsListView: (_isListView: boolean) => void;
  activeCategories: string[];
  setActiveCategories: (_activeCategories: string[]) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const mounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isListView, setIsListView] = useState(true);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  useEffect(() => {
    if (activeCategories && activeCategories.length > 0) {
      router.push(`/?categories=${activeCategories.join(",")}`);
    } else {
      router.push(`/`);
    }
  }, [activeCategories]);

  useEffect(() => {
    const categories = searchParams.get("categories");
    if (categories) {
      setActiveCategories(categories.split(","));
    }
  }, []);

  if (mounted) {
    return (
      <AppContext.Provider
        value={{
          isListView,
          setIsListView,
          activeCategories,
          setActiveCategories,
        }}
      >
        <div className="relative h-full">{children}</div>
      </AppContext.Provider>
    );
  }

  return <ServerLoadingPage />;
};
