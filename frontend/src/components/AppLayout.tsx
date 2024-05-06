import { useLocation } from "react-router-dom";
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function AppLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const location = useLocation();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const GetNavbarItems = () => {
    const { pathname } = location;
    switch (pathname) {
      case "/home":
        return [
          <Button key="Home" variant="transparent" color="orange">
            Home
          </Button>,
          <Button key="Home" variant="transparent" color="orange">
            Home
          </Button>,
          <Button key="Home" variant="transparent" color="orange">
            Home
          </Button>,
        ];
      case "/bookings":
        return [
          <Button key="Bookings" variant="transparent" color="orange">
            Bookings
          </Button>,
          <Button key="Bookings" variant="transparent" color="orange">
            Bookings
          </Button>,
          <Button key="Bookings" variant="transparent" color="orange">
            Bookings
          </Button>,
        ];
      case "/flights":
        return [
          <Button key="flights" variant="transparent" color="orange">
            Destination
          </Button>,
          <Button key="flights" variant="transparent" color="orange">
            Departure
          </Button>,
          <Button key="flights" variant="transparent" color="orange">
            Date
          </Button>,
          <Button key="flights" variant="transparent" color="orange">
            Time
          </Button>,
        ];
      default:
        return [];
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Button
              component={Link}
              to="/home"
              variant="transparent"
              color="orange"
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/bookings"
              variant="transparent"
              color="orange"
            >
              My Trips
            </Button>
            <Button
              component={Link}
              to="/flights"
              key="checkIn"
              variant="transparent"
              color="orange"
            >
              Flights
            </Button>
            <Button key="information" variant="transparent" color="orange">
              Information
            </Button>
          </Group>
          <Group>
            <ActionIcon
              onClick={() =>
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                )
              }
              variant="default"
              size="xl"
              aria-label="Toggle color scheme"
            >
              <IconMoon stroke={1.5} />
            </ActionIcon>
            <Button
              leftSection={<IconUser size={14} />}
              variant="transparent"
              color="orange"
            >
              Login
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">{GetNavbarItems()}</AppShell.Navbar>
    </AppShell>
  );
}

export default AppLayout;
