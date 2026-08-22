import React from "react";
import { Outlet } from "react-router";

import { Box, Container } from "@mui/material";

import CLinearProgress from "@/components/CLinearProgress";
import TopBar from "@/parts/TopBar";
import useScrollToHash from "../hooks/useScrollToHash";

export default function BaseLayout() {
  useScrollToHash()

  return (
    <>
      <TopBar />
      <Container sx={{ my: 2 }}>
        <React.Suspense
          fallback={<CLinearProgress />}
        >
          <Box component="main">
            <Outlet />
          </Box>
        </React.Suspense>
      </Container>
    </>
  );
}
