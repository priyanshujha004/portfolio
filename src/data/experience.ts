import { profile } from "./profile";

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  employmentType?: string;
  location: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface EducationItem {
  institution: string;
  university?: string;
  qualification: string;
  fieldOfStudy: string;
  duration: string;
  location: string;
  collegeLocation: string;
  details: string[];
  link?: string;
}

export const linkedInUrl = `https://www.linkedin.com/in/${profile.linkedinUsername}/`;

export const educationList: EducationItem[] = [
  {
    institution: profile.college,
    university: profile.university,
    qualification: profile.degree,
    fieldOfStudy: profile.branch,
    duration: profile.collegeDuration,
    location: profile.location,
    collegeLocation: profile.collegeLocation,
    details: [
      "Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, and Full-Stack Architecture.",
      "470+ solved algorithmic problems across LeetCode, CodeChef, and HackerRank, maintaining steady coding knowledge and contest ratings.",
      "Hands-on development of production-grade systems in Node.js, ExpressJS, PostgreSQL, Prisma, Docker, and other cloud-native technologies.",
    ],
    link: linkedInUrl,
  },
];

export const experienceList: ExperienceItem[] = [
  {
    period: "Aug'26 — Present",
    role: "Software Engineer Intern",
    organization: "Jaypee Brothers Medical Publishers Pvt. Ltd.",
    employmentType: "Internship",
    location: "New Delhi",
    description: [
      "Contributing to the development and maintenance of digital medical publishing solutions via a learning platform.",
      "Developing and integrating a centralized backend and database architecture supporting three client interfaces.",
      "Working across backend services, database operations, admin dashboard, and web to implement features, maintain APIs, and ensure consistent data flow across platforms."
    ],
    technologies: ["NodeJS", "ExpressJS", "MongoDB", "EJS", "Redis", "BullMQ", "Docker"],
    link: `https://www.linkedin.com/in/${profile.linkedinUsername}/`,
  },
  {
    period: "June'25 - December'25",
    role: "Data Science Intern",
    organization: "The Developers Arena",
    employmentType: "Internship",
    location: "Remote",
    description: [
      "Standardized 6435 sales records across multiple stores by resolving malformed numeric fields and schema inconsistencies, producing a clean dataset for statistical testing.",
      "Proved that holiday weeks drive higher sales, with store identity accounting for 68% of sales variance concluding location overpowered macroeconomics factors.",
      "Evaluated multiple machine learning models and identified Random Forest as the strongest predictor, reducing forecast error by 4× relative to Linear Regression while achieving 95.3% accuracy in sales-week classification."
    ],
    technologies: ["Python", "Pandas", "Numpy", "Matplotlib"],
    link: `https://www.linkedin.com/in/${profile.linkedinUsername}/`,
  },
];
