import { List, Text, Image, Divider, Grid } from "@mantine/core";

export function Destinations() {
  return (
    <List withPadding spacing="xs" size="sm" center>
      <List.Item style={{ display: "flex", justifyContent: "center", paddingBottom: "2rem" }}>
        <Grid gutter={"xl"} justify="space-between" align="center">
          <Grid.Col span={1} style={{ marginRight: "1rem" }}>
            <Image
              w={80}
              h={80}
              radius={5}
              src="https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg"
            />
          </Grid.Col>
          <Grid.Col span={2} style={{ marginRight: "10rem" }}>
            <Text>San Francisco</Text>
          </Grid.Col>
          <Grid.Col span={2} style={{ marginRight: "10rem" }}>
            <Text>From EUR 603</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text>Round Trip</Text>
          </Grid.Col>
        </Grid>
      </List.Item>
      <Divider />
    </List>
  );
}

export default Destinations;
