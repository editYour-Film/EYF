import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const InstanciatedQueryClientProvider: React.FC<any> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default InstanciatedQueryClientProvider;
