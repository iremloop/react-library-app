import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { Book } from "../model/types";

type BookFormData = {
  title: string;
  author: string;
  genre: string;
  language: string;
  customLanguage?: string;
  publisher: string;
  customPublisher?: string;
  coverUrl?: string;
};

type BookFormProps = {
  initialBook?: Book;
  onSubmit: (title: string, author: string,  genre: string, language: string, publisher: string, coverUrl: string) => void;
  onClose: () => void;
};

const publishers = [
  "yapiKredi",
  "isBankasi",
  "can",
  "iletisim",
  "kirmiziKedi",
  "pegasus",
  "epsilon",
  "other",
];

function BookForm({
  initialBook,
  onSubmit,
  onClose,
}: BookFormProps) {
  const { t } = useTranslation();
  const genres = [
    "novel",
    "classic",
    "fantasy",
    "scienceFiction",
    "mystery",
    "history",
    "psychology",
    "biography",
    "dystopia"
  ];

  const languages = [
    "turkish",
    "english",
    "german",
    "french",
    "spanish",
    "russian",
    "japanese",
    "other",
  ];



  const bookFormSchema = z.object({
    title: z
      .string()
      .trim()
      .min(1, t("books.titleRequired")),
    author: z
      .string()
      .trim()
      .min(1, t("books.authorRequired")),
    genre: z
        .string()
        .trim()
        .min(1, t("books.genreRequired")),
   language: z
      .string()
      .trim()
      .min(1, t("books.languageRequired")),
    publisher: z
      .string()
      .trim()
      .min(1, t("books.publisherRequired")),
  customLanguage: z.string().optional(),
  customPublisher: z.string().optional(),
  coverUrl: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author:  "",
      genre:  "",
      language:  "",
      customLanguage: "",
      publisher: "",
      customPublisher: "",
      coverUrl: "",

    },
  });

  const selectedLanguage = watch("language");
  const selectedPublisher = watch("publisher");
  const coverUrl = watch("coverUrl"); 


  useEffect(() => {
    const savedPublisher = initialBook?.publisher ?? "";
  
    const publisherIsCustom =
      savedPublisher !== "" &&
      !publishers.includes(savedPublisher);
  
    reset({
      title: initialBook?.title ?? "",
      author: initialBook?.author ?? "",
      genre: initialBook?.genre ?? "",
      language: initialBook?.language ?? "",
      customLanguage: "",
  
      publisher: publisherIsCustom
        ? "other"
        : savedPublisher,
  
      customPublisher: publisherIsCustom
        ? savedPublisher
        : "",
        coverUrl: initialBook?.coverUrl ?? "",
    });
  }, [initialBook, reset]);


  function handleCoverChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
  
    if (!file) {
      return;
    }
  
    if (!file.type.startsWith("image/")) {
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setValue("coverUrl", reader.result);
      }
    };
  
    reader.readAsDataURL(file);
  }

  function submitForm(data: BookFormData) {
    const language =
    data.language === "other"
      ? data.customLanguage?.trim() ?? ""
      : data.language;

    const publisher =
    data.publisher === "other"
    ? data.customPublisher?.trim() ?? ""
    : data.publisher;

    onSubmit(data.title, data.author,data.genre, language, publisher,data.coverUrl ?? "");
    reset();
  }

  return (
    <form
      className="book-form"
      onSubmit={handleSubmit(submitForm)}
    >
      <label htmlFor="title">
        {t("books.titleLabel")}
      </label>

      <input
        id="title"
        type="text"
        placeholder={t("books.titlePlaceholder")}
        {...register("title")}
      />

      {errors.title && (
        <span className="form-error">
          {errors.title.message}
        </span>
      )}

      <label htmlFor="author">
        {t("books.authorLabel")}
      </label>

      <input
        id="author"
        type="text"
        placeholder={t("books.authorPlaceholder")}
        {...register("author")}
      />

      {errors.author && (
        <span className="form-error">
          {errors.author.message}
        </span>
      )}

        <label htmlFor="genre">
          {t("books.genreLabel")}
        </label>

        <select id="genre" {...register("genre")}>
          <option value="">
            {t("books.genrePlaceholder")}
          </option>

          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {t(`books.genres.${genre}`)}
            </option>
          ))}
    </select>

        {errors.genre && (
          <span className="form-error">
            {errors.genre.message}
          </span>
        )}


        <label htmlFor="language">
          {t("books.languageLabel")}
        </label>

        <select id="language" {...register("language")}>
          <option value="">
            {t("books.languagePlaceholder")}
          </option>

          {languages.map((language) => (
            <option key={language} value={language}>
              {t(`books.languages.${language}`)}
            </option>
          ))}
        </select>

        <label htmlFor="publisher">
  {t("books.publisherLabel")}
</label>

<select
  id="publisher"
  {...register("publisher")}
>
  <option value="">
    {t("books.publisherPlaceholder")}
  </option>

  {publishers.map((publisher) => (
    <option
      key={publisher}
      value={publisher}
    >
      {t(`books.publishers.${publisher}`)}
    </option>
  ))}
</select>


{errors.publisher && (
  <span className="form-error">
    {errors.publisher.message}
  </span>
)}

{selectedPublisher === "other" && (
  <>
    <label htmlFor="customPublisher">
      {t("books.customPublisherLabel")}
    </label>

    <input
      id="customPublisher"
      type="text"
      placeholder={t("books.customPublisherPlaceholder")}
      {...register("customPublisher")}
    />
  </>
)}

        

{selectedLanguage === "other" && (
  <>
    <label htmlFor="customLanguage">
      {t("books.customLanguageLabel")}
    </label>

    <input
      id="customLanguage"
      type="text"
      placeholder={t("books.customLanguagePlaceholder")}
      {...register("customLanguage")}
    />
  </>
)}

<label htmlFor="cover">
  {t("books.coverLabel")}
</label>

<input
  id="cover"
  type="file"
  accept="image/*"
  onChange={handleCoverChange}
  style={{ display: "none" }}
  />
  
  <label
    htmlFor="cover"
    className="secondary-button"
    style={{
      display: "inline-flex",
      width: "fit-content",
      cursor: "pointer",
    }}
  >
    {coverUrl
      ? t("books.changeCover")
      : t("books.chooseCover")}
  </label>

{coverUrl && (
  <img
    src={coverUrl}
    alt={t("books.coverPreviewAlt")}
    style={{
      width: "140px",
      height: "190px",
      objectFit: "cover",
      borderRadius: "8px",
    }}
  />
)}


      <div className="form-actions">
        <button
          className="primary-button"
          type="submit"
        >
          {initialBook
            ? t("books.saveChanges")
            : t("books.addButton")}
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={onClose}
        >
          {t("common.close")}
        </button>
      </div>

    </form>
  );
}

export default BookForm;