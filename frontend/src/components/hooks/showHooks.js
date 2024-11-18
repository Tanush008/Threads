import { useToast } from "@chakra-ui/react";
import React from "react";

export const showHooks = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isColsabe: true,
    });
    return showToast;
  };
};
