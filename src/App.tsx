import { useState } from "react";
import { useTranslation } from "react-i18next";

import BooksPage from "./features/library/books/pages/BooksPage";
import LoansPage from "./features/library/loans/pages/LoansPage";

type Page = "books" | "loans";

function App() {
  const { t, i18n } = useTranslation();
  const [activePage, setActivePage] = useState<Page>("books");

  function changeLanguage() {
    const newLanguage = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(newLanguage);
  }

  return (
    <div>
      <nav className="main-navigation">
        <button
          className={
            activePage === "books"
              ? "navigation-button navigation-button-active"
              : "navigation-button"
          }
          onClick={() => setActivePage("books")}
        >
          {t("navigation.books")}
        </button>

        <button
          className={
            activePage === "loans"
              ? "navigation-button navigation-button-active"
              : "navigation-button"
          }
          onClick={() => setActivePage("loans")}
        >
          {t("navigation.loans")}
        </button>

        <button
          className="language-button"
          onClick={changeLanguage}
        >
          {i18n.language === "tr" ? "EN" : "TR"}
        </button>
      </nav>

      {activePage === "books" ? <BooksPage /> : <LoansPage />}
    </div>
  );
}

export default App;