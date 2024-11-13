"use client";

import { useState } from "react";

const useTest = () => {
  const [appName] = useState("docs");

  return {
    appName,
  };
};

export default useTest;
