import React from "react";
import AppLayout from "../components/AppLayout";
import { Center, Image, SimpleGrid } from '@mantine/core';
import BookingCard from "../components/BookingCard";

const Bookings: React.FC<{}> = ({}) => {
    
  const bookings = [
    {
      id: 1,
      title: 'Mallorca',
      imageUrl: '//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flonelyplanetimages.imgix.net%2Fmastheads%2FGettyImages-535651867_super.jpg&f=1&nofb=1&ipt=668b7ea783f4d1908ef8d9eb9ca95c57f89293a04f648a7185817042ccc065ca&ipo=images',
      badgeText: '9 Days',
      departureTime: '10:00 AM',
      arrivalTime: '12:00 PM',
      class: 'Business',
      departureAirport: 'Airport 1',
      departureDateTime: '13:00 1-1-2024',
      arrivalAirport: 'Airport 2',
      arrivalDateTime: '15:00 1-1-2024',
      passengers: 2,
      seatNumbers: '23B, 24B',
      airline: 'Transavia',
      airplane: 'Airbus A330-200',
      gate: 'Gate 1',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Tenerife',
      imageUrl: 'https://www.shoreexcursionsgroup.com/img/tour/EUTFBESTOF-2.jpg',
      badgeText: '14 days',
      departureTime: '8:00 AM',
      arrivalTime: '11:00 AM',
      class: 'Economy',
      departureAirport: 'Airport 3',
      departureDateTime: '14:00 1-1-2024',
      arrivalAirport: 'Airport 4',
      arrivalDateTime: '17:00 1-1-2024',
      passengers: 1,
      seatNumbers: '25A',
      airline: 'Some Airline',
      airplane: 'Boeing 737',
      gate: 'Gate 2',
      status: 'Confirmed',
    },
    {
      id: 3,
      title: 'Paris',
      imageUrl: 'https://media.cntraveler.com/photos/5cf96a9dd9fb41f17ed08435/3:2/w_1600%2Cc_limit/Eiffel%2520Tower_GettyImages-1005348968.jpg',
      badgeText: '28 Days',
      departureTime: '9:00 AM',
      arrivalTime: '2:00 PM',
      class: 'Business',
      departureAirport: 'Airport 5',
      departureDateTime: '10:00 1-1-2024',
      arrivalAirport: 'Airport 6',
      arrivalDateTime: '15:00 1-1-2024',
      passengers: 3,
      seatNumbers: '26C, 27C, 28C',
      airline: 'Air France',
      airplane: 'Airbus A380',
      gate: 'Gate 3',
      status: 'Confirmed',
    },
    {
      id: 4,
      title: 'London',
      imageUrl: 'http://www.thewowstyle.com/wp-content/uploads/2015/02/london-at-night-hd-zzx27hei-e1395682633110.jpg',
      badgeText: '10 Days',
      departureTime: '11:00 AM',
      arrivalTime: '1:00 PM',
      class: 'Economy',
      departureAirport: 'Airport 7',
      departureDateTime: '12:00 1-1-2024',
      arrivalAirport: 'Airport 8',
      arrivalDateTime: '14:00 1-1-2024',
      passengers: 1,
      seatNumbers: '29D',
      airline: 'British Airways',
      airplane: 'Boeing 777',
      gate: 'Gate 4',
      status: 'Confirmed',
    },
  ];
  

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
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default Bookings;
