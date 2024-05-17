import { Stack, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../../../context";

type NavButtonProps = {
  Item: {
    title: string;
    value: string;
    Icon?: string;
  };
};

const NavButton: React.FC<NavButtonProps> = ({ Item }) => {
  const location = useLocation();
  const theme = useTheme();

  const { taskCount } = useContext(AppContext);
  const navigate = useNavigate();
  const currentRoute = location.pathname.split("/")[1];
  function handleNavigate(value: string) {
    navigate(`/${value}`);
  }
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderRadius: 2,
        alignItems: "center",
        backgroundColor:
          currentRoute == Item.value ? theme.palette.info.main : "#fff",
        cursor: "pointer",
        py: 2,
        px: 1,
      }}
      onClick={() => handleNavigate(Item.value)}
    >
      <Stack
        sx={{
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <img
          src={Item.Icon}
          height="18px"
          width="16px"
          alt={`${Item.title}-icon`}
        />
        <Typography
          variant={currentRoute == Item.value ? "s16w7c800" : "s16w7c500"}
        >
          {Item.title}
        </Typography>
      </Stack>
      {Item.title == "Tasks" && (
        <Typography
          variant={currentRoute == Item.value ? "s12w5cw" : "s12w5cb"}
          sx={{
            backgroundColor: currentRoute == Item.value ? "black" : "#F2F4F7",
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {taskCount}
        </Typography>
      )}
    </Stack>
  );
};

export default NavButton;
