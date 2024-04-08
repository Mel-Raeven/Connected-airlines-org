import cx from "clsx";
import { useState } from "react";
import { Table, ScrollArea, Center } from "@mantine/core";
import classes from "../components/css/TableScrollArea.module.css";

const data = [
  {
    name: "Round Trip Flight 123",
    departureArrival: "DE -> PMI",
    dateTime: "08-04-2024 | 14:20",
  },
  {
    name: "One Way Flight ABC",
    departureArrival: "ABC -> XYZ",
    dateTime: "08-04-2024 | 16:30",
  },
  {
    name: "Domestic Flight XYZ",
    departureArrival: "XYZ -> DEF",
    dateTime: "09-04-2024 | 10:45",
  },
  // 20 random flights added
  {
    name: "Flight to Paris",
    departureArrival: "NYC -> CDG",
    dateTime: "10-04-2024 | 09:30",
  },
  {
    name: "Business Trip to London",
    departureArrival: "LAX -> LHR",
    dateTime: "11-04-2024 | 12:15",
  },
  {
    name: "Beach Vacation",
    departureArrival: "MIA -> HNL",
    dateTime: "12-04-2024 | 14:00",
  },
  {
    name: "City Hopping Tour",
    departureArrival: "SFO -> JFK",
    dateTime: "13-04-2024 | 16:45",
  },
  {
    name: "Mountain Adventure",
    departureArrival: "DEN -> SEA",
    dateTime: "14-04-2024 | 11:20",
  },
  {
    name: "Island Getaway",
    departureArrival: "ATL -> BDA",
    dateTime: "15-04-2024 | 10:00",
  },
  {
    name: "Historical Tour",
    departureArrival: "ORD -> DCA",
    dateTime: "16-04-2024 | 08:45",
  },
  {
    name: "Cultural Exploration",
    departureArrival: "MCO -> MEX",
    dateTime: "17-04-2024 | 15:10",
  },
  {
    name: "Wildlife Safari",
    departureArrival: "LAS -> NBO",
    dateTime: "18-04-2024 | 13:30",
  },
  {
    name: "Snowy Retreat",
    departureArrival: "JFK -> YYZ",
    dateTime: "19-04-2024 | 17:25",
  },
  {
    name: "Desert Expedition",
    departureArrival: "PHX -> DXB",
    dateTime: "20-04-2024 | 07:55",
  },
  {
    name: "Coastal Cruise",
    departureArrival: "SFO -> SYD",
    dateTime: "21-04-2024 | 19:40",
  },
  {
    name: "Rainforest Adventure",
    departureArrival: "IAH -> LIM",
    dateTime: "22-04-2024 | 10:35",
  },
  {
    name: "Wine Tasting Tour",
    departureArrival: "SEA -> CDG",
    dateTime: "23-04-2024 | 16:20",
  },
  {
    name: "Backpacking Trip",
    departureArrival: "DEN -> BKK",
    dateTime: "24-04-2024 | 14:50",
  },
  {
    name: "Road Trip Across Europe",
    departureArrival: "MIA -> AMS",
    dateTime: "25-04-2024 | 08:00",
  },
  {
    name: "Skiing Holiday",
    departureArrival: "ORD -> ZRH",
    dateTime: "26-04-2024 | 11:55",
  },
];

export function AvailableFlights() {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.departureArrival}</Table.Td>
      <Table.Td>{row.dateTime}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Center>
      <ScrollArea
        h={400}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table striped highlightOnHover miw={900}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th style={{textAlign:"center"}}>Name</Table.Th>
              <Table.Th style={{textAlign:"center"}}>Departure/Arrival</Table.Th>
              <Table.Th style={{textAlign:"center"}}>DateTime</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{textAlign:"center"}}>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Center>
  );
}

export default AvailableFlights;
