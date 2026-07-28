import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ChangeEvent } from "react";
import {
  Controller,
  useForm,
  useWatch,
} from "react-hook-form";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import Stack from "@mui/material/Stack";

import type { Book } from "../model/types";

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

  type BookFormData =
  z.infer<typeof bookFormSchema>;
  
  const {
    register,
    handleSubmit,
    control,
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

  const selectedLanguage = useWatch({
    control,
    name: "language",
  });
  
  const selectedPublisher = useWatch({
    control,
    name: "publisher",
  });
  
  const coverUrl = useWatch({
    control,
    name: "coverUrl",
  });


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
    event: ChangeEvent<HTMLInputElement>
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
    <Box
      component="form"
      onSubmit={handleSubmit(submitForm)}
      noValidate
    >
      <Stack spacing={2}>
        <TextField
          label={t("books.titleLabel")}
          placeholder={t("books.titlePlaceholder")}
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          fullWidth
          {...register("title")}
        />
  
        <TextField
          label={t("books.authorLabel")}
          placeholder={t("books.authorPlaceholder")}
          error={Boolean(errors.author)}
          helperText={errors.author?.message}
          fullWidth
          {...register("author")}
        />
  
        <Controller
          name="genre"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t("books.genreLabel")}
              error={Boolean(errors.genre)}
              helperText={errors.genre?.message}
              fullWidth
            >
              <MenuItem value="">
                {t("books.genrePlaceholder")}
              </MenuItem>
  
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {t(`books.genres.${genre}`)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
  
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t("books.languageLabel")}
              error={Boolean(errors.language)}
              helperText={errors.language?.message}
              fullWidth
            >
              <MenuItem value="">
                {t("books.languagePlaceholder")}
              </MenuItem>
  
              {languages.map((language) => (
                <MenuItem key={language} value={language}>
                  {t(`books.languages.${language}`)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
  
        {selectedLanguage === "other" && (
          <TextField
            label={t("books.customLanguageLabel")}
            placeholder={t("books.customLanguagePlaceholder")}
            fullWidth
            {...register("customLanguage")}
          />
        )}
  
        <Controller
          name="publisher"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t("books.publisherLabel")}
              error={Boolean(errors.publisher)}
              helperText={errors.publisher?.message}
              fullWidth
            >
              <MenuItem value="">
                {t("books.publisherPlaceholder")}
              </MenuItem>
  
              {publishers.map((publisher) => (
                <MenuItem key={publisher} value={publisher}>
                  {t(`books.publishers.${publisher}`)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
  
        {selectedPublisher === "other" && (
          <TextField
            label={t("books.customPublisherLabel")}
            placeholder={t("books.customPublisherPlaceholder")}
            fullWidth
            {...register("customPublisher")}
          />
        )}
  
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("books.coverLabel")}
          </Typography>
  
          <Button component="label" variant="outlined">
            {coverUrl
              ? t("books.changeCover")
              : t("books.chooseCover")}
  
            <Box
              component="input"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              sx={{ display: "none" }}
            />
          </Button>
        </Box>
  
        {coverUrl && (
          <Box
            component="img"
            src={coverUrl}
            alt={t("books.coverPreviewAlt")}
            sx={{
              width: 140,
              height: 190,
              objectFit: "cover",
              borderRadius: 1,
            }}
          />
        )}
  
          <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
            gap: 1.5,
            justifyContent: "flex-end",
            pt: 1,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
          >
            {t("common.close")}
          </Button>
  
          <Button
            type="submit"
            variant="contained"
          >
            {initialBook
              ? t("books.saveChanges")
              : t("books.addButton")}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default BookForm;