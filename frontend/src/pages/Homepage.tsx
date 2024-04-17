import React from "react";
import AppLayout from "../components/AppLayout";
import { Divider, Image, Text } from '@mantine/core';
import DestinationBar from "../components/DestinationBar";
import Destinations from "../components/Destinations";

const Homepage: React.FC<{}> = ({}) => {
    
   return (
    <>
    <AppLayout/>
      <Image h="30rem" w="100%" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.alphacoders.com%2F728%2Fthumb-1920-728259.jpg&f=1&nofb=1&ipt=6a3026d9b58213c9c3fd335dd82ff65ed1df2f8c9593bce634288b554584306d&ipo=images"/>
      <DestinationBar/> 
      <Divider color="none" h={"1rem"}/>
      <Text size="xl">Destinations</Text>
      <Divider color="none" h={"1rem"}/>
      <Destinations/>
    </>
  );
};

export default Homepage;
