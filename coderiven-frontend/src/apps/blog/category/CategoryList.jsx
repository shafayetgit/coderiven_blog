import { lazy, Suspense } from "react";
import { Typography, Grid2 } from "@mui/material";
import { useListQuery } from "./categorySlice";
import CSkeleton from "@/components/CSkeleton";

const CLinkCard = lazy(() => import("@/components/CLinkCard"));

export default function CategoryList() {
  const { data } = useListQuery();
  const categories = data?.data;
  return (
    <Suspense
      fallback={
        <Grid2 container spacing={2} justifyContent="center" aria-label="loading categories">
          {Array.from({ length: 15 }).map((_, index) => (
            <Grid2
              item="true"
              size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
              key={index}
            >
              <CSkeleton key={index} variant="rectangular" height={200} />
            </Grid2>
          ))}
        </Grid2>
      }
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Categories
      </Typography>

      <Grid2 container spacing={2} justifyContent="center" aria-label="category list">
        {categories?.map((item, index) => (
          <Grid2 item="true" size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={index}>
            <CLinkCard
              title={`${item.name} (${item.total_posts})`}
              to={`/blog/category/post-list/${item.id}`}
              aria-label={`category ${item.name}`}
            />
          </Grid2>
        ))}
      </Grid2>
    </Suspense>
  );
}
