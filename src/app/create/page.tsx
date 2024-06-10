import Providers from '@/components/Providers';
import React from "react";
import CreatePage from "@/components/CreatePage";

const Page: React.FC = () => {
  return (
    <Providers>
        <CreatePage/>
    </Providers>
  );
};

export default Page;
