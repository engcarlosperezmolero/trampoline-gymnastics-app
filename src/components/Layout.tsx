
import { Outlet, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { Sun, Moon, Calculator, ListChecks, MessageCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("appName")}</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-muted"
              aria-label="Toggle Language"
            >
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {!isMobile ? (
        <nav className="bg-muted py-2 px-6 border-b">
          <div className="flex space-x-1 max-w-4xl mx-auto">
            <NavLink
              to="/difficulty"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`
              }
            >
              {t("difficultyCalculator")}
            </NavLink>
            <NavLink
              to="/pass"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`
              }
            >
              {t("passCalculator")}
            </NavLink>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`
              }
            >
              {t("feedback")}
            </NavLink>
          </div>
        </nav>
      ) : null}

      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <Outlet />
      </main>

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex justify-around items-center h-16">
            <NavLink
              to="/difficulty"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              <Calculator className="h-5 w-5" />
              <span className="text-xs mt-1">{t("difficultyCalculator")}</span>
            </NavLink>
            <NavLink
              to="/pass"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              <ListChecks className="h-5 w-5" />
              <span className="text-xs mt-1">{t("passCalculator")}</span>
            </NavLink>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs mt-1">{t("feedback")}</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
