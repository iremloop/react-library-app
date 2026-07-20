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
};

type BookFormProps = {
  initialBook?: Book;
  onSubmit: (title: string, author: string,  genre: string) => void;
  onClose: () => void;
};

function BookForm({
  initialBook,
  onSubmit,
  onClose,
}: BookFormProps) {
  const { t } = useTranslation();

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
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: initialBook?.title ?? "",
      author: initialBook?.author ?? "",
      genre: initialBook?.genre ?? "",
    },
  });

  useEffect(() => {
    reset({
      title: initialBook?.title ?? "",
      author: initialBook?.author ?? "",
      genre: initialBook?.genre ?? "",
    });
  }, [initialBook, reset]);

  function submitForm(data: BookFormData) {
    onSubmit(data.title, data.author,data.genre);
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

<input
  id="genre"
  type="text"
  placeholder={t("books.genrePlaceholder")}
  {...register("genre")}
/>

{errors.genre && (
  <span className="form-error">
    {errors.genre.message}
  </span>
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