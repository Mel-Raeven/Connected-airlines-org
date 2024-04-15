import React from "react";
import AppLayout from "../components/AppLayout";
import { Image, Space } from '@mantine/core';
import AvailableFlights from "../components/AvailableFlights";
import DestinationBar from "../components/DestinationBar";

const Flights: React.FC<{}> = ({}) => {
  return (
    <>
      <AppLayout />
      <Image
        h="25rem"
        w="100%"
        src="https://wallpaperaccess.com/full/2248375.jpg"
      />
      <Space h={"2rem"}/>
      <DestinationBar/>
      <AvailableFlights/>
    </>);
};

export default Flights;
