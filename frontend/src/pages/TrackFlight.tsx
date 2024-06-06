import React from "react";
import AppLayout from "../components/AppLayout";
import Map from "../components/Map";
import { Space } from "@mantine/core";



const Homepage: React.FC<{}> = ({}) => {
    
   return (
    <>
    <AppLayout/>
    <Space h={"4rem"}/>
      <Map/>
    </>
  );
};

export default Homepage;
