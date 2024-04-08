import { useLocation } from 'react-router-dom'; 
import { AppShell, Burger, Button, Group, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconUser } from '@tabler/icons-react';

export function AppLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const location = useLocation(); 

  
  const GetNavbarItems = () => {
    const { pathname } = location;
    switch (pathname) {
      case '/home':
        return [
          <Button key="Home" variant='transparent' color='orange'>Home</Button>,
          <Button key="Home" variant='transparent' color='orange'>Home</Button>,
          <Button key="Home" variant='transparent' color='orange'>Home</Button>
        ];
        case '/bookings':
          return[
            <Button key="Bookings" variant='transparent' color='orange'>Bookings</Button>,
            <Button key="Bookings" variant='transparent' color='orange'>Bookings</Button>,
            <Button key="Bookings" variant='transparent' color='orange'>Bookings</Button>
          ]
      default:
        return [];
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Button key="myTrip" variant='transparent' color='orange'>My Trip</Button>
          <Button key="checkIn" variant='transparent' color='orange'>Check In</Button>
          <Button key="information" variant='transparent' color='orange'>Information</Button>
          </Group>
          <Button leftSection={<IconUser size={14} />} variant='transparent' color='orange'>Login</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
      {GetNavbarItems()} 
      </AppShell.Navbar>
    </AppShell>
  );
}

export default AppLayout;
