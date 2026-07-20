import {
    Box,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
  } from "@mui/material";
  import { useTranslation } from "react-i18next";
  
  import CloseIcon from "@mui/icons-material/Close";
  import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
  import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
  import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
  import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
  import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
  
  import type { Book } from "../model/types";
  
  type BookDetailsDialogProps = {
    book: Book | null;
    open: boolean;
    onClose: () => void;
  };
  
  function BookDetailsDialog({
    book,
    open,
    onClose,
  }: BookDetailsDialogProps) {
    const { t } = useTranslation();
  
    if (!book) {
      return null;
    }
  
    const detailItems = [
      {
        label: t("books.pageCount"),
        value: book.pageCount,
        icon: <MenuBookOutlinedIcon fontSize="small" />,
      },
      {
        label: t("books.publicationYear"),
        value: book.publicationYear,
        icon: <CalendarMonthOutlinedIcon fontSize="small" />,
      },
      {
        label: t("books.publisher"),
        value: t(`books.publishers.${book.publisher}`, {
            defaultValue: book.publisher,
          }),
        icon: <BusinessOutlinedIcon fontSize="small" />,
      },
      {
        label: t("books.language"),
        value: t(`books.languages.${book.language}`, {
            defaultValue: book.language,
          }),
        icon: <LanguageOutlinedIcon fontSize="small" />,
      },
      {
        label: t("books.isbn"),
        value: book.isbn,
        icon: <NumbersOutlinedIcon fontSize="small" />,
      },
    ];
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            paddingX: {
              xs: 2,
              sm: 3,
            },
            paddingY: 2,
          }}
        >
          <Typography
            component="span"
            variant="h6"
            sx={{
              fontWeight: 750,
            }}
          >
            {t("books.detailsTitle")}
          </Typography>
  
          <IconButton
            type="button"
            aria-label={t("common.close")}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <Divider />
  
        <DialogContent
          sx={{
            padding: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "220px minmax(0, 1fr)",
              },
              gap: {
                xs: 3,
                sm: 4,
              },
            }}
          >
            <Box>
              {book.coverUrl ? (
                <Box
                  component="img"
                  src={book.coverUrl}
                  alt={`${book.title} ${t("books.coverAlt")}`}
                  sx={{
                    display: "block",
                    width: "100%",
                    maxWidth: {
                      xs: 240,
                      sm: "100%",
                    },
                    height: {
                      xs: 340,
                      sm: 330,
                    },
                    marginX: {
                      xs: "auto",
                      sm: 0,
                    },
                    objectFit: "cover",
                    borderRadius: 3,
                    boxShadow:
                      "0 16px 36px rgba(15, 23, 42, 0.2)",
                    backgroundColor: "grey.200",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: {
                      xs: 240,
                      sm: "100%",
                    },
                    height: {
                      xs: 340,
                      sm: 330,
                    },
                    marginX: {
                      xs: "auto",
                      sm: 0,
                    },
                    padding: 3,
                    borderRadius: 3,
                    color: "common.white",
                    backgroundColor: "primary.main",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 750,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {book.title}
                  </Typography>
                </Box>
              )}
            </Box>
  
            <Box sx={{ minWidth: 0, }} >
             
              <Chip 
                label={t(`books.genres.${book.genre}`, {defaultValue: book.genre,})}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  marginBottom: 2,
                  borderRadius: 1.5,
                  fontWeight: 650,
                }}
              />
  
              <Typography
                component="h2"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.15,
                  overflowWrap: "anywhere",
                }}
              >
               {book.title}
              </Typography>
  
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  marginTop: 1,
                  fontWeight: 500,
                }}
              >
                {book.author}
              </Typography>
  
              <Box sx={{  marginTop: 3, }} >
                <Typography
                  component="h3"
                  variant="subtitle1"
                  sx={{
                    marginBottom: 1,
                    fontWeight: 750,
                  }}
                >
                  {t("books.summary")}
                </Typography>
  
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.75,
                  }}
                >
                  {t(`books.summaries.${book.summary}`, {
                    defaultValue: book.summary,
                    })}
                </Typography>
              </Box>
  
              <Divider sx={{ marginY: 3,  }}  />
  
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {detailItems.map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.25,
                      padding: 1.5,
                      borderRadius: 2,
                      backgroundColor: "action.hover",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: 0.25,
                        color: "primary.main",
                      }}
                    >
                      {item.icon}
                    </Box>
  
                    <Box sx={{ minWidth: 0,  }}  >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          marginBottom: 0.25,
                          fontWeight: 650,
                        }}
                      >
                        {item.label}
                      </Typography>
  
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default BookDetailsDialog;