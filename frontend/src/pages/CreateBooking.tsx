import React from "react";
import AppLayout from "../components/AppLayout";
import {Center, Image, SegmentedControl, Space} from '@mantine/core';
import { IconMoneybag, IconShoppingBag } from "@tabler/icons-react";
import BookingOverview from "../components/BookingOverview";

const CreateBooking: React.FC<{}> = ({}) => {
  return (
    <>
      <AppLayout />
      <Image
        h="25rem"
        w="100%"
        src="https://wallpaperset.com/w/full/1/1/b/217574.jpg"
      />
      <Space h={"md"}/>
      <SegmentedControl data={[
        {
          value: 'Economy',
          label: (
            <Center style={{ gap: 10 }}>
              <IconMoneybag />
              <span>Economy</span>
            </Center>
          ),
        },
        {
          value: 'Business',
          label: (
            <Center style={{ gap: 10 }}>
              <IconShoppingBag />
              <span>Business</span>
            </Center>
          ),
        }]}/>
        <BookingOverview/>
    </>
  );
};

export default CreateBooking;
