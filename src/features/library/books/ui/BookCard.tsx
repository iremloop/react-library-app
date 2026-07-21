import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    IconButton,
    Tooltip,
    Typography,
  } from "@mui/material";
  import { useTranslation } from "react-i18next";
  
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
  import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
  
  import type { Book } from "../model/types";
  
  type BookCardProps = {
    book: Book;
    onViewDetails: (book: Book) => void;
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
  };
  
  const coverColors = [
    "#963c3c",
    "#345995",
    "#517664",
    "#785589",
    "#b5651d",
    "#3d5a80",
  ];
  
  function BookCard({
    book,
    onViewDetails,
    onEdit,
    onDelete,
  }: BookCardProps) {
    const { t } = useTranslation();
  
    const generatedCoverColor =
      coverColors[book.id % coverColors.length];
  
    return (
      <Card
        component="article"
        onClick={() => onViewDetails(book)}
        sx={{
            cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
          transition:
            "transform 180ms ease, box-shadow 180ms ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 14px 32px rgba(15, 23, 42, 0.14)",
          },
        }}
      >
        {book.coverUrl ? (
          <Box
            component="img"
            src={book.coverUrl}
            alt={`${book.title} ${t("books.coverAlt")}`}
            sx={{
              width: "100%",
              height: 280,
              objectFit: "cover",
              backgroundColor: "grey.200",
            }}
          />
        ) : (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: 280,
              padding: 3,
              color: "common.white",
              backgroundColor: generatedCoverColor,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -45,
                right: -45,
                width: 150,
                height: 150,
                borderRadius: "50%",
                border: "24px solid rgba(255,255,255,0.12)",
              }}
            />
  
            <Box
              sx={{
                position: "absolute",
                bottom: -55,
                left: -45,
                width: 170,
                height: 170,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            />
  
            <Typography
              variant="overline"
              sx={{
                position: "relative",
                zIndex: 1,
                letterSpacing: 2,
                opacity: 0.82,
              }}
            >
              {t(`books.genres.${book.genre}`, { defaultValue: book.genre })}
            </Typography>
  
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 27,
                  },
                  fontWeight: 800,
                  lineHeight: 1.12,
                  overflowWrap: "anywhere",
                }}
              >
                {book.title}
              </Typography>
  
              <Typography
                sx={{
                  marginTop: 2,
                  fontSize: 15,
                  opacity: 0.88,
                }}
              >
                {book.author}
              </Typography>
            </Box>
          </Box>
        )}
  
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: 1.25,
            paddingBottom: 1,
          }}
        >
          <Typography
  component="h3"
  variant="h6"
  sx={{
    fontWeight: 750,
    lineHeight: 1.25,
  }}
>
{book.title}
</Typography>
  
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {book.author}
          </Typography>
  
          <Box sx={{ marginTop: "auto", paddingTop: 1 }}>
            <Chip
             label={t(`books.genres.${book.genre}`, {
                defaultValue: book.genre,
              })}
              size="small"
              variant="outlined"
              sx={{
                borderRadius: 1.5,
                fontWeight: 600,
              }}
            />
          </Box>
        </CardContent>
  
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: 2,
            paddingBottom: 2,
            paddingTop: 0,
          }}
        >
          <Button
            size="small"
            startIcon={<VisibilityOutlinedIcon />}
            onClick={(event) => {
                event.stopPropagation();
                onViewDetails(book);
              }}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {t("books.viewDetails")}
          </Button>
  
          <Box>
            <Tooltip title={t("common.edit")}>
              <IconButton
                aria-label={`${book.title} ${t("common.edit")}`}
                onClick={(event) => {
                    event.stopPropagation();
                    onEdit(book);
                  }}
                color="primary"
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
  
            <Tooltip title={t("common.delete")}>
              <IconButton
                aria-label={`${book.title} ${t("common.delete")}`}
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete(book);
                  }}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    );
  }
  
  export default BookCard;