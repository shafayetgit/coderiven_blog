import { Box, Typography, Stack, Card, CardContent } from "@mui/material";

import avatar from "@/assets/images/avatar.jpeg"

export default function AboutMePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 6,
      }}
      aria-label="About Me Section"
    >
      <Card
        sx={{
          backgroundColor: "transparent",
          borderRadius: 2,
          boxShadow: 10,
          width: "100%",
          maxWidth: 600,
          overflow: "hidden",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        aria-label="About Me Card"
      >
        <CardContent sx={{ p: 4 }}>
          {/* Profile Image Section */}
          <Stack alignItems="center" mb={4} aria-label="Profile Image">
            <Box
              component="img"
              height={250} // Adjust image size based on screen size
              src={avatar}
              alt="About Me"
              sx={{
                borderRadius: "50%",
                boxShadow: 4,
                width: 200, // Circular image size
                objectFit: "cover",
              }}
            />
          </Stack>

          {/* About Me Text Section */}
          <Stack spacing={3} aria-label="About Me Text">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "text.primary",
              }}
            >
              About Me
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
            >
              Hi, I'm Shafayet Haydar. I’ve been building web applications since
              2018, using a range of powerful tools like Django, Laravel, React,
              and more. With extensive experience in Python and JavaScript, I
              specialize in creating robust, scalable solutions.
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
            >
              I have expertise in working with relational databases, including
              PostgreSQL and MySQL, to ensure efficient data management and
              performance.
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
            >
              In 2022, I earned a Master’s Degree in English, which has helped
              me develop strong communication skills alongside my technical
              expertise.
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.7, color: "text.primary" }}
            >
              I'm passionate about continuous learning in technology, writing
              articles, and developing high-quality applications that meet my
              clients' needs.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
