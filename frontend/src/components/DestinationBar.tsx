import { Button, Center, Grid, Modal, NativeSelect } from "@mantine/core";
import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function DestinationBar() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Grid p={10} align="flex-end">
      <Grid.Col span="auto">
        <NativeSelect
          label="Kind of trip"
          mt="md"
          data={["Round trip", "One way ticket", "City trip"]}
        />
      </Grid.Col>
      <Grid.Col span="auto">
        <NativeSelect
          label="Departure"
          mt="md"
          data={[
            "Amsterdam, Amsterdam Schiphol Airport",
            "London, Heathrow Airport",
            "Paris, Charles de Gaulle Airport",
            "Tokyo, Haneda Airport",
            "Dubai, Dubai International Airport",
            "Los Angeles, Los Angeles International Airport",
            "Chicago, O'Hare International Airport",
            "Beijing, Beijing Capital International Airport",
            "Atlanta, Hartsfield-Jackson Atlanta International Airport",
            "New York City, John F. Kennedy International Airport",
            "Shanghai, Shanghai Pudong International Airport",
            "Dallas, Dallas/Fort Worth International Airport",
            "Frankfurt, Frankfurt Airport",
            "Istanbul, Istanbul Airport",
            "Denver, Denver International Airport",
            "Hong Kong, Hong Kong International Airport",
            "Bangkok, Suvarnabhumi Airport",
            "Singapore, Singapore Changi Airport",
            "Madrid, Adolfo Suárez Madrid–Barajas Airport",
            "Toronto, Toronto Pearson International Airport",
            "Munich, Munich Airport",
          ]}
        />
      </Grid.Col>
      <Grid.Col span="auto">
        <NativeSelect
          label="Departure"
          mt="md"
          data={[
            "Amsterdam, Amsterdam Schiphol Airport",
            "London, Heathrow Airport",
            "Paris, Charles de Gaulle Airport",
            "Tokyo, Haneda Airport",
            "Dubai, Dubai International Airport",
            "Los Angeles, Los Angeles International Airport",
            "Chicago, O'Hare International Airport",
            "Beijing, Beijing Capital International Airport",
            "Atlanta, Hartsfield-Jackson Atlanta International Airport",
            "New York City, John F. Kennedy International Airport",
            "Shanghai, Shanghai Pudong International Airport",
            "Dallas, Dallas/Fort Worth International Airport",
            "Frankfurt, Frankfurt Airport",
            "Istanbul, Istanbul Airport",
            "Denver, Denver International Airport",
            "Hong Kong, Hong Kong International Airport",
            "Bangkok, Suvarnabhumi Airport",
            "Singapore, Singapore Changi Airport",
            "Madrid, Adolfo Suárez Madrid–Barajas Airport",
            "Toronto, Toronto Pearson International Airport",
            "Munich, Munich Airport",
          ]}
        />
      </Grid.Col>
      <Grid.Col span="auto">
        <Button color="orange" variant="outline" size="md" onClick={open}>
          Choose dates
        </Button>
      </Grid.Col>
      <Grid.Col span="auto">
        <Button color="orange" variant="outline" size="md">
          Continue
        </Button>
      </Grid.Col>
      <Modal
        size="smlst"
        opened={opened}
        centered
        withCloseButton={false}
        onClose={close}
      >
        <DatePicker type="range" value={value} onChange={setValue} />
        <Center>
          <Button
            component={Link}
            to="/flights"
            rightSection={<IconCheck size={14} />}
            color="orange"
            variant="outline"
          >
            Select
          </Button>
        </Center>
      </Modal>
    </Grid>
  );
}

export default DestinationBar;
