const bloodDonationCenters = [
    {
      name: "Canadian Blood Services - Toronto",
      lat: 43.6541,
      long: -79.3802,
      address: "67 College St, Toronto, ON M5G 2M1, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - North York",
      lat: 43.7797,
      long: -79.4156,
      address: "4800 Leslie St, North York, ON M2J 2K9, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Scarborough",
      lat: 43.7751,
      long: -79.2323,
      address: "3050 Lawrence Ave E, Scarborough, ON M1P 2V5, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Etobicoke",
      lat: 43.6534,
      long: -79.5675,
      address: "4250 Dundas St W, Etobicoke, ON M8X 1Y6, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Mississauga",
      lat: 43.5913,
      long: -79.6487,
      address: "100 Queensway W, Mississauga, ON L5B 1B8, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Brampton",
      lat: 43.7315,
      long: -79.7624,
      address: "5 Quarry Edge Dr, Brampton, ON L6V 4K2, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Hamilton",
      lat: 43.2557,
      long: -79.8711,
      address: "35 Stone Church Rd E, Hamilton, ON L9B 1A1, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Ottawa",
      lat: 45.4215,
      long: -75.6972,
      address: "1575 Carling Ave, Ottawa, ON K1Z 7M3, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Kitchener",
      lat: 43.4516,
      long: -80.4925,
      address: "94 Bridgeport Rd E, Waterloo, ON N2J 2J9, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - London",
      lat: 42.9834,
      long: -81.233,
      address: "820 Wharncliffe Rd S, London, ON N6J 2N4, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Canadian Blood Services - Windsor",
      lat: 42.3149,
      long: -83.0364,
      address: "3909 Grand Marais Rd E, Windsor, ON N8W 1W9, Canada",
      phone: "+1 888-236-6283",
      hours: {
        monday: "8:00 AM - 7:00 PM",
        tuesday: "8:00 AM - 7:00 PM",
        wednesday: "8:00 AM - 7:00 PM",
        thursday: "8:00 AM - 7:00 PM",
        friday: "8:00 AM - 7:00 PM",
        saturday: "9:00 AM - 3:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "Sunnybrook Health Sciences Centre",
      lat: 43.7266,
      long: -79.3772,
      address: "2075 Bayview Ave, Toronto, ON M4N 3M5, Canada",
      phone: "+1 416-480-6100",
      hours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    {
      name: "Mount Sinai Hospital",
      lat: 43.6547,
      long: -79.3884,
      address: "600 University Ave, Toronto, ON M5G 1X5, Canada",
      phone: "+1 416-586-4800",
      hours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 1:00 PM",
        sunday: "Closed"
      }
    },
    {
      name: "St. Michael's Hospital",
      lat: 43.6536,
      long: -79.3783,
      address: "30 Bond St, Toronto, ON M5B 1W8, Canada",
      phone: "+1 416-360-4000",
      hours: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    {
      name: "The Hospital for Sick Children",
      lat: 43.6571,
      long: -79.3884,
      address: "555 University Ave, Toronto, ON M5G 1X8, Canada",
      phone: "+1 416-813-1500",
      hours: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "8:00 AM - 4:00 PM",
        friday: "8:00 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    {
      name: "Trillium Health Partners - Mississauga Hospital",
      lat: 43.5883,
      long: -79.6494,
      address: "100 Queensway W, Mississauga, ON L5B 1B8, Canada",
      phone: "+1 905-848-7100",
      hours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    },
    {
      name: "Grand River Hospital",
      lat: 43.4578,
      long: -80.5037,
      address: "835 King St W, Kitchener, ON N2G 1G3, Canada",
      phone: "+1 519-742-3611",
      hours: {
        monday: "8:00 AM - 5:00 PM",
        tuesday: "8:00 AM - 5:00 PM",
        wednesday: "8:00 AM - 5:00 PM",
        thursday: "8:00 AM - 5:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      }
    }
  ];
  
  export default bloodDonationCenters;
  