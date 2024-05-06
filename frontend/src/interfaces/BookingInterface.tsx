export interface Booking {
  bookingid: number;
  userId: number;
  flight: string;
  imageUrl: string;
  badgeText: string;
  departureAirport: string;
  departureDateTime: string;
  arrivalAirport: string;
  arrivalDateTime: string;
  passengers: number;
  seatNumbers: string;
  airline: string;
  airplane: string;
  gate: string;
  class: string;
  status: string;
}

  
  export interface Props {
    booking: Booking;
  }
  