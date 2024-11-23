import { useToast } from "@chakra-ui/react";
import React, { useCallback } from "react";

export const showHooks = () => {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        duration: 3000,
        isColsabe: true,
      });
    },
    [toast]
  );
  return showToast;
};
