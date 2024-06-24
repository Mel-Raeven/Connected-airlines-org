import React, { useEffect, useState } from "react";
import axios from 'axios';
import AppLayout from "../components/AppLayout";
import { Center, Image, SimpleGrid } from '@mantine/core';
import BookingCard from "../components/BookingCard";

const Bookings: React.FC<{}> = ({}) => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    axios.post('https://wyruuznlj2.execute-api.eu-central-1.amazonaws.com/dev/getBookings', {
      name: 'test',
      userId: 2
    })
    .then(response => {
      try {
        const parsedData = JSON.parse(response.data.body);
        if (Array.isArray(parsedData)) {
          setBookings(parsedData);
        } else {
          console.error('Data is not an array:', parsedData);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []); 

  return (
    <>
      <AppLayout />
      <Image
        h="25rem"
        w="100%"
        src="https://wallpaperaccess.com/full/1307415.png"
      />
      <Center>
        <SimpleGrid spacing={"xl"} cols={3} style={{ paddingTop: "2rem" }}>
          {bookings.map((booking, index) => (
            <BookingCard key={booking.bookingid} booking={booking} data-testid={`booking-card-${index}`}/>
          ))}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default Bookings;
