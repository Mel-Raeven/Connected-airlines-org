import {
  Button,
  Center,
  Group,
  Input,
  NativeSelect,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { IconAt, IconCake, IconPhoneCall, IconUser } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

function BookingOverview() {
  const form = useForm({
    initialValues: {
      amountOfPassengers: 1,
      name: "",
      lastname: "",
      email: "",
      phone: "",
      birthday: "",
    },
  });

  const { amountOfPassengers } = form.values;

  function SendForm() {
    for (let i = 0; i < amountOfPassengers; i++) {
      const name = form.values[`name${i}` as keyof typeof form.values];
      const lastname = form.values[`lastname${i}` as keyof typeof form.values];
      const email = form.values[`email${i}` as keyof typeof form.values];
      const phone = form.values[`phone${i}` as keyof typeof form.values];
      const birthday = form.values[`birthday${i}` as keyof typeof form.values];
      console.log(`Passenger ${i + 1}:`);
      console.log("Name:", name);
      console.log("Last Name:", lastname);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Birthday:", birthday);
    }
  }

  const passengerForms = [];
  for (let i = 0; i < amountOfPassengers; i++) {
    passengerForms.push(
      <SimpleGrid key={i}>
        <Space h={"2rem"}/>
        {`Passenger ${i + 1}`}
        <Input
          {...form.getInputProps(`name${i}`)}
          placeholder={`Passenger ${i + 1} Name`}
          leftSection={<IconUser size={16} />}
        />
        <Input
          {...form.getInputProps(`lastname${i}`)}
          placeholder={`Passenger ${i + 1} Last Name`}
          leftSection={<IconUser size={16} />}
        />
        <Input
          {...form.getInputProps(`email${i}`)}
          placeholder={`Passenger ${i + 1} Email`}
          leftSection={<IconAt size={16} />}
        />
        <Input
          {...form.getInputProps(`phone${i}`)}
          placeholder={`Passenger ${i + 1} Phone number`}
          leftSection={<IconPhoneCall size={16} />}
        />
        <DatePickerInput
          {...form.getInputProps(`birthday${i}`)}
          placeholder={`Passenger ${i + 1} Birthday`}
          leftSection={<IconCake size={16} />}
        />
      </SimpleGrid>
    );
  }

  const groupedPassengerForms = [];
  for (let i = 0; i < passengerForms.length; i += 4) {
    groupedPassengerForms.push(
      <Group key={i}>
        {passengerForms.slice(i, i + 4)}
      </Group>
    );
  }

  return (
    <>
      <Center>
        <Space h="1rem" />
        <NativeSelect
          mt="md"
          label="Amount of passengers"
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          {...form.getInputProps("amountOfPassengers")}
        />
      </Center>
      <Center>
        {groupedPassengerForms}
      </Center>
      <Center>
        <Space h={"5rem"}/>
        <Button onClick={SendForm} color={"orange"} variant="outline">
          Book
        </Button>
      </Center>
    </>
  );
}

export default BookingOverview;
