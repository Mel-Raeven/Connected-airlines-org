import { Button, Grid, NativeSelect } from "@mantine/core";

export function DestinationBar() {
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
        <Button size="md">Continue</Button>
      </Grid.Col>
    </Grid>
  );
}

export default DestinationBar;
