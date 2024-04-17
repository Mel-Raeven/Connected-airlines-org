import React from "react";
import { Card, Image, Text, Badge, Button, Group, Divider, Modal } from "@mantine/core";
import { IconZoom } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Props } from "../interfaces/BookingInterface";

const BookingCard: React.FC<Props> = ({ booking }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Card
        w={"20rem"}
        h={"24rem"}
        shadow="sm"
        padding="md"
        radius="md"
        withBorder
      >
        <Card.Section>
          <Image src={booking.imageUrl} height={160} alt="Booking" />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text size="xl" fw={500}>
            {booking.title}
          </Text>
          <Badge variant="outline" color="orange">
            {booking.badgeText}
          </Badge>
        </Group>
        <Divider />

        <Text c={"dimmed"} size="sm" mt="sm">
          Departure: {booking.departureDateTime}
        </Text>
        <Text c={"dimmed"} size="sm" mt="sm">
          Arrival: {booking.arrivalDateTime}
        </Text>
        <Text c={"dimmed"} size="sm" mt="sm">
          Class: {booking.class}
        </Text>

        <Button
          onClick={open}
          variant="outline"
          color="orange"
          fullWidth
          mt="md"
          radius="md"
          rightSection={<IconZoom size={14} />}
        >
          See Details
        </Button>
      </Card>
      <Modal opened={opened} onClose={close} title="Booking information">
        <Text style={{ display: "inline" }}>Status: </Text>
        <Text c="green" style={{ display: "inline" }}>
          {booking.status}
        </Text>

        <Divider />
        <Text>Departure Airport: {booking.departureAirport}</Text>
        <Text>Departure: {booking.departureDateTime}</Text>
        <Text>Arrival Airport: {booking.arrivalAirport}</Text>
        <Text>Arrival: {booking.arrivalDateTime}</Text>
        <Divider />
        <Text>Passengers: {booking.passengers}</Text>
        <Text>Class: {booking.class}</Text>
        <Text>Seat Numbers: {booking.seatNumbers}</Text>
        <Divider />
        <Text>Airline: {booking.airline}</Text>
        <Text>Airplane: {booking.airplane}</Text>
        <Text>Gate: {booking.gate}</Text>
      </Modal>
    </div>
  );
};

export default BookingCard;
