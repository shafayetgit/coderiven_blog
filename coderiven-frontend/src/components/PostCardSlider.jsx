import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Link } from "react-router"; // Use Link from react-router-dom

export default function Carousel({
  items,
  autoplay = true,
  autoplaySpeed = 3000,
  width = "100%",
}) {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from first item
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = items.length;

  // Function to handle next and previous navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, autoplay, autoplaySpeed]);

  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <Box
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      sx={{
        position: "relative",
        width,
        mx: "auto",
        mt: 4,
        overflow: "hidden",
      }}
    >
      {/* Slider Content */}
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "100%",
              textAlign: "center",
            }}
          >
            {/* Clickable Card */}
            <Link
              to={`/blog/post/detail/${item.slug}`}
              onClick={scrollToTop} // Scroll to the top when the card is clicked
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  height: { lg: '200px', sm: "200px", xs: "250px" }, // Make card height flexible
                  boxShadow: "none",
                  borderRadius: 2,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  "@media (max-width: 600px)": {
                    padding: 1,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1">{item.description}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>

      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          "@media (max-width: 600px)": {
            left: "5px",
          },
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          "@media (max-width: 600px)": {
            right: "5px",
          },
        }}
      >
        <ArrowForward />
      </IconButton>

      {/* Dots Indicator */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {items.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor:
                currentIndex === index ? "primary.main" : "grey.400",
              mx: 0.5,
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

// PropTypes for the Carousel component
Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired, // The link to navigate to when the card is clicked
    })
  ).isRequired,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  width: PropTypes.string,
};
