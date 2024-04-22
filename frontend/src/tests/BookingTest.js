const { Given, When, Then } = require('@cucumber/cucumber');
const { render, screen, waitFor } = require('@testing-library/react');
const Bookings = require('../pages/Bookings'); 

let bookingsData = [
  // Mock data to simulate the API response
  { id: 1, name: 'Test Booking 1', userId: 2 },
  { id: 2, name: 'Test Booking 2', userId: 2 },
];

Given('I visit the bookings page', async () => {
  // Render the Bookings component
  render(<Bookings />);
});

When('the bookings are loaded', async () => {
  // Wait for the bookings to be loaded (assuming useEffect has completed)
  await waitFor(() => screen.getByTestId('booking-card'));
});

Then('I should see the booking cards displayed', async () => {
  // Ensure that booking cards are displayed
  const bookingCards = screen.getAllByTestId('booking-card');
  expect(bookingCards.length).toBeGreaterThan(0);
});

Then('the number of booking cards should match the number of bookings returned from the API', async () => {
  // Ensure the correct number of booking cards are displayed
  const bookingCards = screen.getAllByTestId('booking-card');
  expect(bookingCards.length).toBe(bookingsData.length);
});

Then('each booking card should display the correct information', async () => {
  // Check if each booking card displays the correct information
  bookingsData.forEach((booking, index) => {
    const bookingCard = screen.getByTestId(`booking-card-${index}`);
    expect(bookingCard).toHaveTextContent(booking.name);
    expect(bookingCard).toHaveTextContent(`User ID: ${booking.userId}`);
  });
});
