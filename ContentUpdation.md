# Content Management & Portfolio Maintenance Guide

This document outlines how to manage, update, and configure content on your developer portfolio. All content, projects, blogs, professional records, and platform integrations are centralized in declarative files without requiring any database or CMS.

---

## Architecture Overview

```
src/
├── content/
│   ├── projects/                  # Project case studies (MDX format)
│   │   ├── medora.mdx
│   │   ├── upiq.mdx
│   │   ├── synccare.mdx
│   │   └── parsex.mdx
│   └── blog/                      # Technical blog articles (MDX format)
│       └── get-unlimited-claude-code-for-3.mdx
├── data/
│   ├── profile.ts                 # Personal information, usernames, bio
│   ├── experience.ts              # Work experience & education list
│   ├── social.ts                  # Social links & profile links
│   └── navigation.ts              # Header & footer routes
└── public/
    ├── me2.jpeg                 # Profile photograph (Photo Booth widget)
    ├── resume.pdf                 # Active resume document
    └── images/
        ├── projects/              # Project card preview images (16:9 ratio)
        └── blogs/                 # Blog post cover images (16:9 ratio)
```

---

## 1. How to Add a Project

1. Create a new `.mdx` file inside `src/content/projects/`, e.g., `src/content/projects/my-project.mdx`.
2. Add frontmatter metadata at the top:
   ```yaml
   ---
   title: "My Project Title"
   order: 5
   summary: "Short one-sentence summary for project card"
   description: "More detailed 2-3 sentence overview for case study"
   category: "Full Stack"
   stack: ["Next.js", "TypeScript", "PostgreSQL", "Docker"]
   metrics:
     - label: "Throughput"
       value: "10,000 req/s"
     - label: "Latency"
       value: "< 45ms"
   image: "/images/projects/my-project.jpg"
   liveUrl: "https://myproject.com" # Leave empty or omit if not deployed live
   repoUrl: "https://github.com/priyanshujha004/my-project"
   featured: true # Set to true to display on landing page, false for /projects only
   ---

   ### Project Overview
   Your detailed case study in Markdown...

   ### Architecture & Engineering Decisions
   Technical breakdown...
   ```
3. Place your preview screenshot (16:9 ratio, e.g. 1280x720) in `public/images/projects/my-project.jpg`.
4. **Project Status Badges:**
   - If `liveUrl` is provided with a valid URL, the project card automatically displays the **Live** badge.
   - If `liveUrl` is omitted or empty, the project card automatically displays the **In Development** badge and omits the Live Demo button (preventing broken links).

---

## 2. How to Add a Blog

1. Create a new `.mdx` file inside `src/content/blog/`, e.g., `src/content/blog/building-distributed-systems.mdx`.
2. Add frontmatter metadata:
   ```yaml
   ---
   title: "Building Distributed Systems in Practice"
   excerpt: "A practical guide to event sourcing, consensus algorithms, and ledger reliability."
   date: "2026-10-22"
   tags: ["Distributed Systems", "Backend", "Architecture"]
   image: "/images/blogs/distributed-systems.jpg"
   ---

   ### Introduction
   Your blog article in Markdown...
   ```
3. Place your cover image in `public/images/blogs/distributed-systems.jpg`.
4. The post will automatically appear on `/blogs` and `/blogs/building-distributed-systems`, complete with estimated reading time, calendar date, and tag metadata.

---

## 3. How to Update Experience & Education

Open `src/data/experience.ts`:
- **To update education:** Edit `educationList` (institution, degree, graduation year, coursework, location).
- **To add/update work experience:** Edit `experienceList`. Each item supports:
  - `role`: Position title
  - `organization`: Company or team name
  - `employmentType`: "Full-time", "Internship", "Independent", etc.
  - `period`: Date range (e.g. `2024 — Present`)
  - `location`: Office location or remote
  - `description`: Array of bullet points
  - `technologies`: Array of tech stack tags
  - `link`: Optional external project or company URL

---

## 4. How to Replace Your Resume PDF

1. Name your actual PDF file `resume.pdf`.
2. Copy it into the root public folder:
   `/public/resume.pdf`
3. Visiting `/resume` will automatically render your document in the integrated viewer and provide direct download and open-in-new-tab links.

---

## 5. How to Configure Developer Platform Integrations

Configuration is centralized in `src/data/profile.ts` and `.env.local`:

### Usernames & Profiles (`src/data/profile.ts`)
```ts
export const profile = {
  name: "Priyanshu Jha",
  role: "Software Engineer",
  githubUsername: "priyanshujha004",
  linkedinUsername: "priyanshu971",
  leetcodeUsername: "priyanshujha07",
  codechefUsername: "priyanshu971",
  hackerrankUsername: "priyanshujha971",
  email: "priyanshujha19.work@gmail.com",
  ...
};
```

### Environment Variables (`.env.local`)
```env
# GitHub API (Used to fetch real commits & contributions)
GITHUB_TOKEN="your_personal_access_token"
GITHUB_USERNAME="priyanshujha004"

# Contact Form Email Delivery (Resend API)
RESEND_API_KEY="re_xxxxxxxxxxxxxx"
CONTACT_TO_EMAIL="priyanshujha19.work@gmail.com"
CONTACT_FROM_EMAIL="onboarding@resend.dev"
```

---

## 6. Do Content Changes Require Redeployment?

- **Local Development (`npm run dev`):** Any edit to MDX files, `profile.ts`, or `experience.ts` updates immediately via Hot Module Replacement without restarting.
- **Production Deployment (e.g. Vercel):**
  - Project and blog pages use Next.js Incremental Static Regeneration (ISR with `revalidate = 3600`), meaning new commits pushed to your Git repository trigger an automatic production build.
  - Live data from GitHub and LeetCode revalidates periodically in the background.
