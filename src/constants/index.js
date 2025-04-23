import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
  course,
  batch,
  test,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
  {
    id: "clients",
    title: "Clients",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: course,
    title: "Courses",
    content:
      "At present DIPLOMA, MBA, MCA, BTECH, BCA are only eligible for this scholarship.",
  },
  {
    id: "feature-2",
    icon: batch,
    title: "Batch",
    content:
      "Candidate must be enrolled in new academic session only 2025-26 batch.",
  },
  {
    id: "feature-3",
    icon: test,
    title: "Scholarship Test",
    content:
      "To get the scholarship candidate need to score at least 60% in the scholarship test.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Counseling",
        link: "/counseling",
      },
      {
        name: "Scholarship apply",
        link: "/scholarship",
      },
      {
        name: "Become a Counselor",
        link: "/counselor",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Contact Us",
        link: "http://localhost:5173/contactUs",
      },
      {
        name: "Whatsapp community",
        link: "https://chat.whatsapp.com/your-community-link",
      },
      {
        name: "Telegram channel",
        link: "https://t.me/your-channel-link",
      },
    ],
  },
  {
    title: "Others",
    links: [
      {
        name: "Become a Partner",
        link: "/partner",
      },
      {
        name: "Terms & Services",
        link: "/termsConditions",
      },
      {
        name: "Privacy Policy",
        link: "/privacyPolicy",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: twitter,
    link: "https://www.twitter.com/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];
