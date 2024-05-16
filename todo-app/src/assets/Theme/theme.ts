import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const token = {
  primary: {
    25: "#FFFAF5",
    50: "#FFF6ED",
    100: "#FFEAD5",
    200: "#FDDCAB",
    300: "#FEB273",
    400: "#FD853A",
    500: "#FB6514",
    600: "#EC4A0A",
    700: "#C4320A",
    800: "#53389E",
    900: "#42307D",
  },
  warning: {
    25: "#FFFCF5",
    50: "#FFFAEB",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#9C2A10",
    900: "#7E2410",
  },
  success: {
    25: "#F6FEF9",
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31",
  },
  grey: {
    25: "#FCFCFD",
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#EAECF0",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },
  neutral: {
    25: "#FAF7F2",
    50: "#F9F4EC",
    100: "#F9F1E4",
    200: "#F4E7D2",
    300: "#EAD6B6",
    400: "#DDC49B",
    500: "#CFB488",
    600: "#C5A26A",
    700: "#C5A26A",
    800: "#856634",
    900: "#714A0D",
  },
  error: {
    25: "#FFFBFA",
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
    800: "#912018",
    900: "#7A271A",
  },
};

declare module "@mui/material/styles" {
  interface TypographyVariantsOptions {
    s16w7c800?: React.CSSProperties;
    s16w7c500?: React.CSSProperties;
    s20w7c800?: React.CSSProperties;
    s14w7c400?: React.CSSProperties;
    s14w7c500?: React.CSSProperties;
    s15w5c400?: React.CSSProperties;
    s15w7c500?: React.CSSProperties;
    s14w7cs500?: React.CSSProperties;
    s12w5cw?: React.CSSProperties;
    s12w5cb?: React.CSSProperties;
  }
}

export const Karla = "'Karla', sans-serif";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      htmlFontSize: 10,
      fontSize: 16,
      fontFamily: Karla,

      s16w7c800: {
        fontSize: 16,
        fontWeight: 700,
        color: token.grey[800],
      },
      s16w7c500: {
        fontSize: 16,
        fontWeight: 700,
        color: token.grey[500],
      },
      s20w7c800: {
        fontSize: 20,
        fontWeight: 700,
        color: token.grey[800],
      },
      s14w7c400: {
        fontSize: 14,
        fontWeight: 700,
        color: token.grey[400],
      },
      s14w7c500: {
        fontSize: 14,
        fontWeight: 700,
        color: token.grey[500],
      },
      s15w5c400: {
        fontSize: 15,
        fontWeight: 500,
        color: token.grey[400],
      },
      s15w7c500: {
        fontSize: 15,
        fontWeight: 700,
        color: token.grey[500],
      },
      s14w7cs500: {
        fontSize: 14,
        fontWeight: 700,
        color: token.success[500],
      },
      s12w5cw: {
        fontSize: 12,
        fontWeight: 500,
        color: '#fff',
      },
      s12w5cb: {
        fontSize: 12,
        fontWeight: 500,
        color: '#000',
      },
    },

    palette: {
      text: {
        primary: token.grey[900],
        secondary: token.grey[700],
        disabled: token.grey[500],
        ...token.grey,
      },

      primary: {
        main: "#FFFFFF",
      },
      secondary: {
        main: token.grey[25],
      },
      info: {
        main: token.grey[100],
      },
    },
  })
);

export default theme;
