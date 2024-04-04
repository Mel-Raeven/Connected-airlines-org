import React from "react";
import AppLayout from "../components/AppLayout";
import { Divider, Image, Text } from '@mantine/core';
import DestinationBar from "../components/DestinationBar";
import Destinations from "../components/Destinations";

const Homepage: React.FC<{}> = ({}) => {
    
   return (
    <>
    <AppLayout/>
      <Image w="100%" src="https://img.static-kl.com/transform/1c4e3d47-b78c-444e-af81-f8850d321648/?io=transform:fill,width:1440,height:480"/>
      <DestinationBar/> 
      <Divider color="none" h={"1rem"}/>
      <Text size="xl">Destinations</Text>
      <Divider color="none" h={"1rem"}/>
      <Destinations/>
    </>
  );
};

export default Homepage;
