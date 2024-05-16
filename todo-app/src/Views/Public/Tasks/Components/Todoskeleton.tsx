import { Box, Stack, Skeleton, useTheme } from "@mui/material";

export const Todoskeleton = () => {
    const theme = useTheme()
  return (
    <Box
      sx={{
        height: "auto",
        width: "320px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 2,
        px: "20px",
        py: "20px",
        my: 1,
        gap: 1,
      }}
    >
      <Stack>
        <Skeleton width="40%" height={30} sx={{ width: "100%" }} />
      </Stack>
      <Stack>
        <Skeleton width="40%" height={30} sx={{ width: "100%" }} />
      </Stack>
      <Stack direction="row" gap={2}>
        <Skeleton width="40%" height={30} sx={{ width: "100%" }} />
        <Skeleton width="40%" height={30} sx={{ width: "100%" }} />
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Skeleton width="20%" height={30} sx={{ width: "100%" }} />
        <Skeleton width="20%" height={30} sx={{ width: "100%" }} />
      </Stack>
    </Box>
  );
};

export default Todoskeleton;
