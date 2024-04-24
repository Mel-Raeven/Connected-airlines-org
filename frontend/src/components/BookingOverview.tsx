import {
  Button,
  Center,
  Divider,
  Input,
  NativeSelect,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { IconAt, IconCake, IconPhoneCall, IconUser } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import React from "react";

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
  
  const passengerInputs = [];
  for (let i = 0; i < amountOfPassengers; i++) {
    passengerInputs.push(
      <React.Fragment key={i}>
        <Divider />
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
      </React.Fragment>
    );
  }

  return (
    <>
      <Center>
        <SimpleGrid w={"20rem"}>
          <Space h={"1rem"} />
          <NativeSelect
            mt="md"
            label="Amount of passengers"
            data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
            {...form.getInputProps("amountOfPassengers")}
          />
          {passengerInputs}
          <Button onClick={SendForm} color={"orange"} variant="outline">
            Book
          </Button>
        </SimpleGrid>
      </Center>
    </>
  );
}

export default BookingOverview;
