import Skeleton from "@mui/material/Skeleton";

export default function CSkeleton({ height = 200, width = "100%" }) {
  return <Skeleton variant="rectangular" width={width} height={height} />;
}
