import { createContext } from "react";

interface AppContextType {
	mode: string;
	toggleTheme: (theme: "dark" | "light") => void;
	toggleSearchModal: () => void;
	isSearchModalOpened: boolean;
	fontSize: string;
	changeFontSize: (size: "small" | "normal" | "large") => void;
}

export const AppContext = createContext<AppContextType | null>(null);