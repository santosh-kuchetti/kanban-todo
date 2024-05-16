import Drawer from "./Components/Drawer";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {  useState } from "react";
import NavOptions from "./Components/NavIOptions";
import NavButton from "./Components/NavButton";
import kanbanLogo from "../../assets/SVG/kanbanlogoicon.svg";
import expandIcon from "../../assets/SVG/expandicon.svg";
import closeIcon from "../../assets/SVG/closeicon.svg";

const Navigation = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const handleToggle = (val: boolean) => {
    setOpen(val);
  };

  return (
    <Box
      sx={{ display: "flex" }}
    >
      <Drawer variant="permanent">
        <Stack
          sx={{
            backgroundColor: theme.palette.background,
            mx: "24px",
            my: 2,
          }}
          justifyContent="space-between"
          height="100%"
        >
          <Stack sx={{ gap: 1 }}>
            <Stack
              sx={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                py: 2,
              }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 1,
                  py: 2,
                  px: 1,
                }}
              >
                <img src={kanbanLogo} height="24px" width="24px" />
                <Typography variant="s16w7c800">Company</Typography>
              </Stack>
              <IconButton
                onClick={() => handleToggle(!open)}
                style={{ border: "none", outline: "none", boxShadow: "none" }}
              >
                <img
                  src={open ? expandIcon : closeIcon}
                  height="12px"
                  width="12px"
                />
              </IconButton>
            </Stack>
            <Stack sx={{ display: !open ? "none" : "block" }}>
              {NavOptions.slice(0, NavOptions.length - 1).map((item) => (
                <NavButton key={item.value} Item={item} />
              ))}
            </Stack>
          </Stack>
          <Stack>
            {NavOptions.slice(-1).map((item) => (
              <NavButton key={item.value} Item={item} />
            ))}
          </Stack>
        </Stack>
      </Drawer>
      <Box
        component="main"
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Navigation;
