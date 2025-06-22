export interface FlightOffer {
  id: string;
  total_currency: string;
  total_amount: string;
  slices: Slice[];
  passengers: Passenger[];
  updated_at: string;
  expires_at: string;
  partial: boolean;
  owner: Carrier;
}

export interface Slice {
  comparison_key: string;
  segments: Segment[];
  duration: string;
  origin: Airport;
  destination: Airport;
}

export interface Segment {
  departing_at: string;
  arriving_at: string;
  operating_carrier: Carrier;
  marketing_carrier: Carrier;
  operating_carrier_flight_number: string;
  marketing_carrier_flight_number: string;
  distance: string;
  duration: string;
  origin: Airport;
  destination: Airport;
  passengers: {
    cabin: {
      name: string;
    };
    baggages: {
      quantity: number;
      type: 'checked' | 'carry_on';
    }[];
    cabin_class: string;
    cabin_class_marketing_name: string;
    fare_basis_code: string;
  }[];
}

export interface Carrier {
  iata_code: string;
  conditions_of_carriage_url: string;
  logo_lockup_url: string;
  logo_symbol_url: string;
}

export interface Airport {
  id: string;
  name: string;
  type: 'airport';
  time_zone: string;
  iata_code: string;
  icao_code: string;
  iata_country_code: string;
  iata_city_code: string;
  city_name: string;
}

export interface Passenger {
  id: string;
  type: 'adult' | 'child' | 'infant';
  age: number | null;
  given_name: string | null;
  family_name: string | null;
}

