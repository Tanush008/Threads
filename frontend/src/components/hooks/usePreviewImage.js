import React, { useState } from "react";
import { showHooks } from "./showHooks";

const usePreviewImage = () => {
  const toast = showHooks();
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast("Invalid file type", "Please select an image field", "error");
    }
  };
//   console.log(imageUrl);
  
  return {
    handleImageChange,
    imageUrl,
  };
};

export default usePreviewImage;
