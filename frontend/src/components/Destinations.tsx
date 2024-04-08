import { List, Text, Image, Divider, Grid, Center } from "@mantine/core";

const destinationsData = [
  {
    name: "Mallorca",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp6429308.jpg&f=1&nofb=1&ipt=21738d4c011bd701e1041512985cef433e192b9e908114d6339bb90a4636c784&ipo=images",
    price: "From EUR 843",
    tripType: "Round Trip"
  },
  {
    name: "Paris",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwallpapercave.com%2Fwp%2FFAX9Jf5.jpg&f=1&nofb=1&ipt=d76b1d11daf60ffc4e3a378d82550b7df0514771651908944d4370e136b0bb2d&ipo=images",
    price: "From EUR 553",
    tripType: "Round Trip"
  },
  {
    name: "Amsterdam",
    imageUrl: "https://www.vandervalkamsterdam.com/inc/upload/opengraph/RoosAldershof-1.jpg",
    price: "From EUR 234",
    tripType: "Round Trip"
  }
];

export function Destinations() {
  return (
    <Center>
      <List w={"40rem"} withPadding spacing="xl">
        {destinationsData.map((destination, index) => (
          <>
            <List.Item style={{ display: "flex", justifyContent: "center", paddingBottom: "2rem" }} key={index}>
              <Grid gutter={"xl"} justify="space-between" align="center">
                <Grid.Col span={1} style={{ marginRight: "1rem" }}>
                  <Image
                    w={80}
                    h={80}
                    radius={5}
                    src={destination.imageUrl}
                  />
                </Grid.Col>
                <Grid.Col span={2} style={{ width: "9.375rem" }}> 
                  <Text>{destination.name}</Text>
                </Grid.Col>
                <Grid.Col span={1.5} style={{ marginRight: "1rem" }}>
                  <Text>{destination.price}</Text>
                </Grid.Col>
                <Grid.Col span={1.5}>
                  <Text>{destination.tripType}</Text>
                </Grid.Col>
              </Grid>
            </List.Item>
            <Divider />
          </>
        ))}
      </List>
    </Center>
  );
}

export default Destinations;
