import React, { useState, useEffect } from "react";
import ColorThief from "colorthief";

interface Props {
  imageUrl: string;
  onDominantColorChange: (num: any) => void;
  onFirstRGBChange: (num: any) => void;
}

function Colorthief({
  imageUrl,
  onDominantColorChange,
  onFirstRGBChange,
}: Props) {
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Ensure CORS is handled
    img.src = `https://image.tmdb.org/t/p/w500/${imageUrl}`;

    // Wait for image to load, then get the color
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);

      const newColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      onDominantColorChange(newColor);

      const newRgb = color[0];
      onFirstRGBChange(newRgb);
    };
  }, [imageUrl, onDominantColorChange, onFirstRGBChange]);
  return <div></div>;
}

export default Colorthief;
