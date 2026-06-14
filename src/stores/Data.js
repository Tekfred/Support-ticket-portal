export const INITIAL_TICKETS = [
  {
    id: 'APL-0003',
    company: 'Mosciski Inc.',
    category: 'Creative Design Agency',
    position: 'Intern UI Designer',
    type: 'FREELANCE',
    status: 'Pending',
    appliedDate: 'June 17, 2026, 08:22 AM',
    email: 'contact@mosciski.co',
    phone: '+1 (555) 438-2011',
    priority: 'medium',
    department: 'UI/UX Design',
    description:
      'We are looking for a creative UI design intern to help us with web layouts, wireframes, and prototyping mobile experiences. Must be proficient in Figma and understand basic design system principles.',
    acceptedBy: null,
    comments: [
      {
        id: 'c1',
        author: 'M Mike',
        text: 'I started looking into the site menu layout for this. Looks like they need immediate help with custom responsive web components.',
        date: 'June 17, 2026, 10:14 AM',
      },
    ],
  },
  {
    id: 'APL-0002',
    company: 'Funk Inc.',
    category: 'IT Department',
    position: 'Junior UI Designer',
    type: 'PART TIME',
    status: 'On-Hold',
    appliedDate: 'June 16, 2026, 09:15 AM',
    email: 'talent@funkinc.net',
    phone: '+1 (555) 883-9204',
    priority: 'low',
    department: 'Technical Operations',
    description:
      'Seeking a part-time Junior UI Designer to support internal dashboard redesigns and developer documentation layout formatting.',
    acceptedBy: null,
    comments: [],
  },
  {
    id: 'APL-0001',
    company: 'Highspeed Studios',
    category: 'Creative Design Agency',
    position: 'Senior UX Designer',
    type: 'FULLTIME',
    status: 'Candidate',
    appliedDate: 'June 15, 2026, 11:30 AM',
    email: 'career@highspeed.studio',
    phone: '+1 (555) 902-1234',
    priority: 'high',
    department: 'UX Research',
    description:
      'Looking for a seasoned Senior UX Designer to lead client discovery workshops, design end-to-end user journeys, and oversee visual system scalability across cloud platforms.',
    acceptedBy: 'ansahaudi86@gmail.com', // pre-assigned/accepted to demonstrate "Accepted tickets" filter
    comments: [
      {
        id: 'c2',
        author: 'Support Agent',
        text: 'Candidate scheduled for initial screen. Needs deep dive into cloud systems experience.',
        date: 'June 15, 2026, 02:00 PM',
      },
    ],
  },
  {
    id: 'APL-0004',
    company: 'Sauer Group',
    category: 'Security Team',
    position: 'Systems Support Engineer',
    type: 'FULLTIME',
    status: 'Pending',
    appliedDate: 'June 18, 2026, 07:10 AM',
    email: 'support@sauergroup.org',
    phone: '+1 (555) 124-9988',
    priority: 'critical',
    department: 'Security & Infrastructure',
    description:
      'Immediate opening for an Infrastructure Support expert. Must have experience with server-side proxy layers, firewall routing, and high-availability database orchestration.',
    acceptedBy: null,
    comments: [],
  },
  {
    id: 'APL-0005',
    company: 'Abshire LLC',
    category: 'Logistics Division',
    position: 'Customer Journey Analyst',
    type: 'PART TIME',
    status: 'Candidate',
    appliedDate: 'June 18, 2026, 10:45 AM',
    email: 'ops@abshire.io',
    phone: '+1 (555) 762-2290',
    priority: 'medium',
    department: 'Operations',
    description:
      'Looking for a part-time analyst to monitor agent responsiveness, ticket queuing performance, and customer satisfaction metrics for booking check-outs.',
    acceptedBy: null,
    comments: [],
  },
  {
    id: 'APL-0006',
    company: 'Kunde & Sons',
    category: 'Growth Division',
    position: 'Interactive Graphics Specialist',
    type: 'FREELANCE',
    status: 'On-Hold',
    appliedDate: 'June 14, 2026, 04:30 PM',
    email: 'creative@kunde.com',
    phone: '+1 (555) 304-4512',
    priority: 'low',
    department: 'Marketing Creative',
    description:
      'We need help crafting animated SVG visual graphics, custom landing pages with micro-interactions, and visual representations for real-time tracking dashboards.',
    acceptedBy: 'ansahaudi86@gmail.com', // accepted
    comments: [],
  },
]

export const INITIAL_BOOKINGS = [
  {
    id: 'BOX-302',
    customerName: 'Eleanor Pena',
    storeCode: 'BOX-302',
    checkInDate: 'Sat 17 June, 2026',
    checkOutDate: 'Sat 17 June, 2026 - Same day',
    timeString: '12:00 PM - 4:00 PM',
    hoursString: '4 hours',
    bagsCount: 2,
    earnings: 6.0,
    status: 'Active',
    email: 'eleanor.pena@example.com',
    phone: '+1 (555) 234-9012',
    notes:
      'Needs heavy luggage tags. Left 1 backpack and 1 large hard case shell spinner suitcase.',
  },
  {
    id: 'LAX-211',
    customerName: 'Jenny Wilson',
    storeCode: 'LAX-211',
    checkInDate: 'Mon 19 June, 2026',
    checkOutDate: 'Mon 19 June, 2026 - Same day',
    timeString: '10:00 AM - 3:30 PM',
    hoursString: '5.5 hours',
    bagsCount: 3,
    earnings: 9.0,
    status: 'Checked in',
    email: 'jenny.wilson@example.com',
    phone: '+1 (555) 871-3344',
    notes:
      '2 carry-on rollers, 1 camera gear shoulder bag. Fragile glass inside gear bag, placed on top rack.',
  },
  {
    id: 'BML-224',
    customerName: 'Leslie Alexander',
    storeCode: 'BML-224',
    checkInDate: 'Tue 20 June, 2026',
    checkOutDate: 'Thu 22 June, 2026',
    timeString: '8:00 PM - 9:00 PM',
    hoursString: '49 hours',
    bagsCount: 2,
    earnings: 6.0,
    status: 'Booked',
    email: 'leslie.alexander@example.com',
    phone: '+1 (555) 678-1920',
    notes: 'Scheduled multi-day storage. Requested dust covers for both luggage bags.',
  },
  {
    id: 'AMS-607',
    customerName: 'Annette Black',
    storeCode: 'AMS-607',
    checkInDate: 'Fri 23 June, 2026',
    checkOutDate: 'Sat 24 June, 2026',
    timeString: '12:00 PM - 4:00 PM',
    hoursString: '28 hours',
    bagsCount: 1,
    earnings: 3.0,
    status: 'Active',
    email: 'annette.black@example.com',
    phone: '+1 (555) 901-4433',
    notes: 'Left a single green duffel bag. Scheduled to collect early morning.',
  },
  {
    id: 'AFC-107',
    customerName: 'Bessie Cooper',
    storeCode: 'AFC-107',
    checkInDate: 'Mon 19 June, 2026',
    checkOutDate: 'Mon 19 June, 2026 - Same day',
    timeString: '1:00 PM - 6:00 PM',
    hoursString: '5 hours',
    bagsCount: 3,
    earnings: 9.0,
    status: 'Active',
    email: 'bessie.cooper@example.com',
    phone: '+1 (555) 438-9921',
    notes:
      '3 blue roller spinner suitcases. Paid extra premium guarantee for item monitoring protection.',
  },
  {
    id: 'BOX-302-2',
    customerName: 'Albert Flores',
    storeCode: 'BOX-302',
    checkInDate: 'Mon 19 June, 2026',
    checkOutDate: 'Mon 19 June, 2026 - Same day',
    timeString: '4:00 PM - 8:00 PM',
    hoursString: '4 hours',
    bagsCount: 4,
    earnings: 12.0,
    status: 'Checked in',
    email: 'albert.flores@example.com',
    phone: '+1 (555) 123-4567',
    notes: 'Family booking. Checked in heavy suitcases. Needs prompt checkout service.',
  },
]

export function loadTickets() {
  try {
    const data = localStorage.getItem('booking_support_tickets')
    if (data) return JSON.parse(data)
  } catch (e) {
    console.error('Error reading tickets from local storage', e)
  }
  return INITIAL_TICKETS
}

export function saveTickets(tickets) {
  try {
    localStorage.setItem('booking_support_tickets', JSON.stringify(tickets))
  } catch (e) {
    console.error('Error saving tickets to local storage', e)
  }
}

export function loadBookings() {
  try {
    const data = localStorage.getItem('booking_support_bookings')
    if (data) return JSON.parse(data)
  } catch (e) {
    console.error('Error reading bookings from local storage', e)
  }
  return INITIAL_BOOKINGS
}

export function saveBookings(bookings) {
  try {
    localStorage.setItem('booking_support_bookings', JSON.stringify(bookings))
  } catch (e) {
    console.error('Error saving bookings to local storage', e)
  }
}
