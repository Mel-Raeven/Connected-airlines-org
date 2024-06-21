import { useState } from "react";
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
import { useHistory } from "react-router-dom";

function BookingOverview() {
  const history = useHistory();
  const form = useForm({
    initialValues: {
      amountOfPassengers: 1,
      passengers: [
        {
          name: "",
          lastname: "",
          email: "",
          phone: "",
          birthday: "",
        },
      ],
    },
    validate: {
      passengers: {
        name: (value) => (value ? null : "Name is required"),
        lastname: (value) => (value ? null : "Last name is required"),
        email: (value) =>
          /^\S+@\S+$/.test(value) ? null : "Invalid email address",
        phone: (value) => (value ? null : "Phone number is required"),
        birthday: (value) => (value ? null : "Birthday is required"),
      },
    },
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const { values } = form;

  function isAtLeastOneAdult(passengers:any) {
    const today = new Date();
    for (let i = 0; i < passengers.length; i++) {
      const birthday = new Date(passengers[i].birthday);
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
        age--;
      }
      if (age >= 18) {
        return true;
      }
    }
    return false;
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    
   
      if (isAtLeastOneAdult(values.passengers)) {
        console.log("Form is valid:", values.passengers);
        history.push("/ConfirmBooking");
      }
       else {
        setFormErrors(["At least one passenger must be 18 years or older"]);
      }
  }

  const passengerForms = [];
  for (let i = 0; i < values.amountOfPassengers; i++) {
    passengerForms.push(
      <SimpleGrid key={i}>
        <Space h={"2rem"} />
        {`Passenger ${i + 1}`}
        <Input
          {...form.getInputProps(`passengers.${i}.name`)}
          placeholder={`Passenger ${i + 1} Name`}
          leftSection={<IconUser size={16} />}
          required
        />
        <Input
          {...form.getInputProps(`passengers.${i}.lastname`)}
          placeholder={`Passenger ${i + 1} Last Name`}
          leftSection={<IconUser size={16} />}
          required
        />
        <Input
          {...form.getInputProps(`passengers.${i}.email`)}
          placeholder={`Passenger ${i + 1} Email`}
          leftSection={<IconAt size={16} />}
          required
        />
        <Input
          {...form.getInputProps(`passengers.${i}.phone`)}
          placeholder={`Passenger ${i + 1} Phone number`}
          leftSection={<IconPhoneCall size={16} />}
          required
        />
        <DatePickerInput
          {...form.getInputProps(`passengers.${i}.birthday`)}
          placeholder={`Passenger ${i + 1} Birthday`}
          leftSection={<IconCake size={16} />}
          required
        />
      </SimpleGrid>
    );
  }

  const groupedPassengerForms = [];
  for (let i = 0; i < passengerForms.length; i += 4) {
    groupedPassengerForms.push(
      <Group key={i}>{passengerForms.slice(i, i + 4)}</Group>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Center>
        <Space h="1rem" />
        <NativeSelect
          mt="md"
          label="Amount of passengers"
          data={["1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          {...form.getInputProps("amountOfPassengers")}
          required
        />
      </Center>
      <Center>{groupedPassengerForms}</Center>
      <Center>
        <Space h={"5rem"} />
        <Button type="submit" color={"orange"} variant="outline">
          Book
        </Button>
      </Center>
      {formErrors.length > 0 && (
        <Center style={{ color: "red", marginTop: "1rem" }}>
          {formErrors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Center>
      )}
    </form>
  );
}

export default BookingOverview;
