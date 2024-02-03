import { useState, createContext } from "react";
export const ImageSelectContext = createContext();

const DisplayImage = ({ children }) => {
  const [displayImage, setDisplayImage] = useState("");
  return (
    <ImageSelectContext.Provider value={{ displayImage, setDisplayImage }}>
      {children}
    </ImageSelectContext.Provider>
  );
};

export default DisplayImage;