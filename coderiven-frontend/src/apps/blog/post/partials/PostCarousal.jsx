import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CButton from "@/components/CButton";

const items = [
  {
    name: "Beautiful Landscape",
    description: "Experience the serene beauty of nature.",
    img: "https://via.placeholder.com/800x400",
  },
  {
    name: "Urban Adventure",
    description: "Explore the vibrant life of the city.",
    img: "https://via.placeholder.com/800x400",
  },
  {
    name: "Tropical Paradise",
    description: "Relax in the warmth of tropical beaches.",
    img: "https://via.placeholder.com/800x400",
  },
];

export default function MUICarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "800px",
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
            <img
              src={item.img}
              alt={item.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {item.name}
            </Typography>
            <Typography variant="body1">{item.description}</Typography>
          </Box>
        ))}
      </Box>
      {/* Navigation Buttons */}
      <CButton
        onClick={handlePrev}
        aria-label="Previous slide"
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        iconButton
        icon={<ArrowBack />}
      />
      <CButton
        onClick={handleNext}
        aria-label="Next slide"
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        iconButton
        icon={<ArrowForward />}
      />

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
