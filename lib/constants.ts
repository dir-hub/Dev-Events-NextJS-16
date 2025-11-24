export interface EventItem {
  id: string;
  title: string;
  image: string;
  date: string; // ISO or human-friendly date
  location: string;
  time:string;
}

export const events: EventItem[] = [
  {
    id: "react-summit-2026",
    title: "React Summit 2026",
    image: "/images/event1.png",
    date: "2026-03-18",
    location: "Amsterdam, Netherlands",
    time: "10:00 AM",
  },
  {
    id: "jsconf-2026",
    title: "JSConf EU 2026",
    image: "/images/event2.png",
    date: "2026-05-12",
    location: "Berlin, Germany",
    time: "3:00 PM",
  },
  {
    id: "nodefest-2026",
    title: "NodeFest: Serverless & Edge",
    image: "/images/event3.png",
    date: "2026-06-04",
    location: "Remote / Online",
    time: "11:00 AM",
  },
  {
    id: "hackathon-city-2026",
    title: "Hackathon City 2026",
    image: "/images/event4.png",
    date: "2026-02-28",
    location: "Boston, MA, USA",
   time: "9:00 AM",
  },
  {
    id: "design-systems-meetup",
    title: "Design Systems Meetup",
    image: "/images/event5.png",
    date: "2026-01-20",
    location: "London, UK",
    time: "1:00 PM",
  },
  {
    id: "open-source-day-2026",
    title: "Open Source Day",
    image: "/images/event6.png",
    date: "2026-04-08",
    location: "San Francisco, CA, USA", time: "12:00 PM",
  },
];

export default events;
