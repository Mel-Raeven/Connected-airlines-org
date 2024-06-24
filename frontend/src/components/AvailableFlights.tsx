import cx from "clsx";
import { useState } from "react";
import {
  Table,
  ScrollArea,
  Center,
  Modal,
  Text,
  SimpleGrid,
  Divider,
  Button,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../components/css/TableScrollArea.module.css";
import { IconPlane } from "@tabler/icons-react";
import {Link} from "react-router-dom"

interface Flight {
  name: string;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
}

const airportData: { [key: string]: string } = {
  DE: "Berlin Airport",
  PMI: "Palma de Mallorca Airport",
  MIA: "Miami Airport",
  JFK: "John F. Kennedy International Airport",
  LAX: "Los Angeles International Airport",
  LHR: "London Heathrow Airport",
  CDG: "Charles de Gaulle Airport",
  ORD: "O'Hare International Airport",
  ATL: "Hartsfield-Jackson Atlanta International Airport",
  BKK: "Suvarnabhumi Airport",
  AMS: "Amsterdam Airport Schiphol",
  SIN: "Singapore Changi Airport",
  ICN: "Incheon International Airport",
  DXB: "Dubai International Airport",
  IST: "Istanbul Airport",
  FCO: "Leonardo da Vinci–Fiumicino Airport",
  MAD: "Adolfo Suárez Madrid–Barajas Airport",
  MUC: "Munich Airport",
  PEK: "Beijing Capital International Airport",
  HKG: "Hong Kong International Airport",
  DEL: "Indira Gandhi International Airport",
  PVG: "Shanghai Pudong International Airport",
  SYD: "Sydney Airport",
  MEL: "Melbourne Airport",
};

const data: Flight[] = [
  {
    name: "Round Trip",
    departureAirport: "MIA",
    departureTime: "08-04-2024 | 14:20",
    arrivalAirport: "AMS",
    arrivalTime: "08-04-2024 | 16:30",
  },
  {
    name: "One Way Ticket",
    departureAirport: "JFK",
    departureTime: "08-04-2024 | 12:00",
    arrivalAirport: "LAX",
    arrivalTime: "08-04-2024 | 15:00",
  },
  {
    name: "City Trip",
    departureAirport: "CDG",
    departureTime: "08-04-2024 | 09:30",
    arrivalAirport: "LHR",
    arrivalTime: "08-04-2024 | 11:45",
  },
  {
    name: "Round Trip",
    departureAirport: "LAX",
    departureTime: "09-04-2024 | 08:45",
    arrivalAirport: "MIA",
    arrivalTime: "09-04-2024 | 11:15",
  },
  {
    name: "One Way Ticket",
    departureAirport: "AMS",
    departureTime: "09-04-2024 | 13:20",
    arrivalAirport: "SIN",
    arrivalTime: "09-04-2024 | 05:30",
  },
  {
    name: "City Trip",
    departureAirport: "SYD",
    departureTime: "10-04-2024 | 10:00",
    arrivalAirport: "MEL",
    arrivalTime: "10-04-2024 | 11:00",
  },
  {
    name: "Round Trip",
    departureAirport: "LHR",
    departureTime: "10-04-2024 | 12:30",
    arrivalAirport: "CDG",
    arrivalTime: "10-04-2024 | 14:45",
  },
  {
    name: "One Way Ticket",
    departureAirport: "ORD",
    departureTime: "11-04-2024 | 08:00",
    arrivalAirport: "ATL",
    arrivalTime: "11-04-2024 | 10:00",
  },
  {
    name: "City Trip",
    departureAirport: "MUC",
    departureTime: "11-04-2024 | 13:30",
    arrivalAirport: "MAD",
    arrivalTime: "11-04-2024 | 15:45",
  },
  {
    name: "Round Trip",
    departureAirport: "SFO",
    departureTime: "12-04-2024 | 11:00",
    arrivalAirport: "LAX",
    arrivalTime: "12-04-2024 | 12:30",
  },
  {
    name: "One Way Ticket",
    departureAirport: "DXB",
    departureTime: "12-04-2024 | 16:00",
    arrivalAirport: "IST",
    arrivalTime: "12-04-2024 | 18:00",
  },
  {
    name: "Round Trip",
    departureAirport: "AMS",
    departureTime: "13-04-2024 | 08:00",
    arrivalAirport: "CDG",
    arrivalTime: "13-04-2024 | 09:30",
  },
  {
    name: "One Way Ticket",
    departureAirport: "MEL",
    departureTime: "13-04-2024 | 12:00",
    arrivalAirport: "LAX",
    arrivalTime: "13-04-2024 | 15:00",
  },
  {
    name: "City Trip",
    departureAirport: "ORD",
    departureTime: "14-04-2024 | 09:30",
    arrivalAirport: "ATL",
    arrivalTime: "14-04-2024 | 11:45",
  },
  {
    name: "Round Trip",
    departureAirport: "MIA",
    departureTime: "14-04-2024 | 07:45",
    arrivalAirport: "LAX",
    arrivalTime: "14-04-2024 | 10:15",
  },
  {
    name: "One Way Ticket",
    departureAirport: "LHR",
    departureTime: "15-04-2024 | 13:20",
    arrivalAirport: "SYD",
    arrivalTime: "15-04-2024 | 05:30",
  },
  {
    name: "City Trip",
    departureAirport: "CDG",
    departureTime: "15-04-2024 | 10:00",
    arrivalAirport: "MEL",
    arrivalTime: "15-04-2024 | 11:00",
  },
  {
    name: "Round Trip",
    departureAirport: "MUC",
    departureTime: "16-04-2024 | 12:30",
    arrivalAirport: "MAD",
    arrivalTime: "16-04-2024 | 14:45",
  },
  {
    name: "One Way Ticket",
    departureAirport: "SFO",
    departureTime: "16-04-2024 | 08:00",
    arrivalAirport: "DXB",
    arrivalTime: "16-04-2024 | 10:00",
  },
  {
    name: "City Trip",
    departureAirport: "DXB",
    departureTime: "17-04-2024 | 13:30",
    arrivalAirport: "IST",
    arrivalTime: "17-04-2024 | 15:45",
  },
  {
    name: "Round Trip",
    departureAirport: "AMS",
    departureTime: "17-04-2024 | 11:00",
    arrivalAirport: "SIN",
    arrivalTime: "17-04-2024 | 12:30",
  },
  {
    name: "One Way Ticket",
    departureAirport: "SYD",
    departureTime: "18-04-2024 | 16:00",
    arrivalAirport: "MEL",
    arrivalTime: "18-04-2024 | 18:00",
  },
];

const AvailableFlights = () => {
  const [scrolled, setScrolled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const handleFlightClick = (flight: Flight) => {
    setSelectedFlight(flight);
    open();
  };

  return (
    <Center>
      <ScrollArea
        h={400}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table striped highlightOnHover miw={1000}>
          <Table.Thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <Table.Tr>
              <Table.Th style={{ textAlign: "center" }}>Name</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>
                Departure/Arrival
              </Table.Th>
              <Table.Th style={{ textAlign: "center" }}>
                Departure Time
              </Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Arrival Time</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ textAlign: "center", cursor: "pointer" }}>
            {data.map((row, index) => (
              <Table.Tr key={index} onClick={() => handleFlightClick(row)}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{`${row.departureAirport} -> ${row.arrivalAirport}`}</Table.Td>
                <Table.Td>{row.departureTime}</Table.Td>
                <Table.Td>{row.arrivalTime}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Modal
        onClose={close}
        title="Flight Information"
        opened={opened}
        centered
      >
        <Divider h={"1rem"} />
        {selectedFlight && (
          <SimpleGrid>
            <Text>Name: {selectedFlight.name}</Text>
            <Text>
              Departure Airport: {airportData[selectedFlight.departureAirport]}
            </Text>
            <Text>Departure Time: {selectedFlight.departureTime}</Text>
            <Text>
              Arrival Airport: {airportData[selectedFlight.arrivalAirport]}
            </Text>
            <Text>Arrival Time: {selectedFlight.arrivalTime}</Text>
          </SimpleGrid>
        )}
        <Space h={"2rem"} />
        <Center>
          <Button
            component={Link}
            to="/createbooking"
            rightSection={<IconPlane size={14} />}
            variant="outline"
            color="green"
          >
            Book
          </Button>
        </Center>
      </Modal>
    </Center>
  );
};

export default AvailableFlights;
