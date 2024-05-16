import AppLayout from "../components/AppLayout";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Space,
  Center,
} from "@mantine/core";

const ConfirmBooking: React.FC<{}> = ({}) => {
  return (
    <>
      <AppLayout />
      <Image
        h="25rem"
        w="100%"
        src="https://wallpaperbat.com/img/499522-excellent-hd-airport-wallpaper.jpg"
      />
      <Space h={"1rem"} />
      <Center>
        <Card w={"40rem"} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="http://www.recordrentacar.com/blog/wp-content/uploads/2013/08/shutterstock_268209080-1_1.jpg"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={700}>Mallorca</Text>
          </Group>

          <Text size="sm" c="dimmed">
              08-04-2024 | 14:20 - 18-04-2024 | 18:50
          </Text>

          <Button color="orange" variant="outline" fullWidth mt="md" radius="md">
            Confirm
          </Button>
        </Card>
      </Center>
    </>
  );
};

export default ConfirmBooking;
