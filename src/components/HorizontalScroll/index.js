import React, { useEffect, useRef, useState } from 'react';
import './HorizontalScroll.css'; // Assuming CSS is defined in this file

const HorizontalScroll = ({ images, left }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const imageWidth = 200; // Width of each image
  const imageMargin = 10; // Margin between images

  useEffect(() => {
    // Initialize positions with margins
    setPositions(images.map((_, index) => left ? index * (imageWidth + imageMargin) : -index * (imageWidth + imageMargin)));

    const updatePositions = () => {
      setPositions(prevPositions => {
        return prevPositions.map(pos => {
          // Determine direction based on 'left' prop
          let newPos = left ? pos - 0.2 : pos + 0.2;
          // Reset position based on direction
          if (left && newPos < -(imageWidth + imageMargin)) {
            newPos += images.length * (imageWidth + imageMargin);
          } else if (!left && newPos > (images.length - 1) * (imageWidth + imageMargin)) {
            newPos -= images.length * (imageWidth + imageMargin);
          }
          return newPos;
        });
      });

      requestAnimationFrame(updatePositions);
    };

    requestAnimationFrame(updatePositions);
  }, [images, left]);

  return (
    <div ref={containerRef} className="horizontal-scroll-container">
      {images.map((image, index) => (
        <img 
          key={index} 
          src={image} 
          alt={`img-${index}`} 
          style={{ left: `${positions[index]}px`}} 
        />
      ))}
    </div>
  );
};

export default HorizontalScroll;
