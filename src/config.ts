import type { SocialObjects } from "@/lib/types";

export const SITE = {
  website: "https://pipelinevision-project.com", // replace this with your deployed domain
  author: "Theodore Zipoy",
  desc: "Pipeline Vision - AI-Powered Threat Detection for Pipeline Safety",
  title: "Pipeline Vision",
  ogImage: "og-image.jpg",
  repo: "https://github.com/TheodorusMaximus/pipelinevision",
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const menu_items: { title: string; href: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Overview",
    href: "/project-overview",
  },
  {
    title: "Planning",
    href: "/project-planning",
  },


];

// Navigation structure with static section headers and clickable items
export const navigation_structure = [
  {
    type: 'section',
    title: 'Overview',
    items: [
      'project-overview',
      'project-overview/core-hypotheses', 
      'project-overview/technical-data'
    ]
  },
  {
    type: 'section', 
    title: 'Planning',
    items: [
      'project-planning',
      'project-planning/rfp-response'
    ]
  },
  {
    type: 'section',
    title: 'Resources', 
    items: [
      'library',
      'library/competitor-analysis'
    ]
  }
];

// Legacy support - keeping for backward compatibility
export const side_nav_menu_order: string[] = [
  "project-overview",
  "project-overview/core-hypotheses",
  "project-overview/technical-data",
  "project-planning", 
  "project-planning/rfp-response",
  "library",
  "library/competitor-analysis"
];

// Don't delete anything. You can use 'true' or 'false'.
// These are global settings
export const docconfig = {
  hide_table_of_contents: false,
  hide_breadcrumbs: false,
  hide_side_navigations: false,
  hide_datetime: false,
  hide_time: true,
  hide_search: false,
  hide_repo_button: false,
  hide_author: true,
};

// Set your social. It will appear in footer. Don't change the `name` value.
export const Socials: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/TheodorusMaximus/pipelinevision",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: "Instagram",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: false,
  },
  {
    name: "Mail",
    href: "mailto:theodore.zipoy@example.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "Twitch",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://discord.gg/tWZRBhaPhd",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/HYP3R00T/",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@theodorezipoy",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
