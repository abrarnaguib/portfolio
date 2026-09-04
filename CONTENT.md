# Content — Phase 7 fill-in

Every field the site currently shows as a bracketed placeholder, in one
place. Fill in what you have — leave anything blank you don't have yet,
and note it (`[skip]` or similar) so it's obvious what's still open rather
than silently missing. Once this comes back, the actual code swap
(`content/*.ts`, the About/Hero/Contact copy) happens in one pass from
this file — you shouldn't need to touch any component or route yourself.

Each section says exactly which file the field lives in, so if you'd
rather edit the TypeScript directly instead of this doc, that works too —
this is a convenience, not a requirement.

---

## 1. Site-wide

Lives in `app/layout.tsx` (metadata), `components/layout/Nav.tsx` (logo),
`components/layout/Footer.tsx` (copyright line).

- **Your name** (used as the nav logo, the footer copyright, and the
  browser-tab title suffix — one field, several places): Abrar Naguib

- **Site description** (the one-line `<meta name="description">` search
  engines and link previews show — a single sentence, e.g. "Portfolio of
  [name], [what you do / study]."): Computer Science & Engineering Undergraduate

---

## 2. Home page (Hero)

Lives in `components/home/Hero.tsx`.

- **Tagline / codename** (small line above your name — a short phrase,
  not a sentence; this is the one place a Persona-5-flavored codename or
  a plain title like "Software Engineer" both work equally well): Winner takes it all

- **Your name** (large title — same value as §1 unless you want a
  stylized variant here specifically): ABRAR NAGUIB

- **One-line bio** (1–2 sentences under your name — who you are, what
  you're studying/into; this is the *short* version, the About page
  below gets the longer one): 4th semester computer science undergradute student on a journey to become an irreplaceable assest to the programming community.

*(The two CTA buttons — "View Projects" / "Get In Touch" — are fixed
labels, not placeholders; say if you want them reworded.)*

---

## 3. About page

Lives in `app/about/page.tsx`.

- **Short headline** (currently "[Placeholder bio]" — a few words, e.g.
  your name + one-line identity, or a short statement):CSE Undergrad-4th Semester

- **Bio paragraph** (a real paragraph — what you're studying, which
  semester, what you're into, whatever you want a reader to know before
  they look at your projects): Hi, I'm a 4th semester computer science undergradute student; a passionate problem solver and computer graphics, game programming & ML/AI enthusiast; solving problems, building games and interactive applications; on a mission to become a skilled developer & a cherished figure in the programming community.

---

## 4. Projects

Lives in `content/projects.ts`. **One block per project** — copy the
block below for each one. The three placeholder entries currently in the
file (`project-alpha`, `project-beta`, `project-gamma`) get replaced by
whatever you fill in here; add more blocks for more projects, delete
blocks you don't need.

```
slug:      (URL-safe id, e.g. "portfolio-site" — becomes /projects/portfolio-site)
title:
status:    shipped | in-progress | archived   (pick one)
summary:   (one line — shows on the card in the grid)
role:      (e.g. "Solo", "Backend + infra on a 3-person team")
stack:     (comma-separated, e.g. "Next.js, TypeScript, Postgres")
timeframe: (e.g. "Spring 2026")
links:     (label: URL pairs, e.g. "GitHub: https://github.com/...", "Live: https://...")
featured:  yes | no   (yes = shows in the larger top row on /projects; no = still listed, just further down)
body:      (optional — a longer case-study writeup: the problem, your approach, the outcome.
            Leave blank to skip; the detail page just won't show a write-up section.)
```

**Project 1**
```
slug: https://github.com/Neuromancer3301/Dynamics-Engine 
title: 
status: ongoing
summary:
role: Programmer, UI/UX designer
stack: 
timeframe: 4th Semester
links:
featured:
body:
**sidenote for you claude** the fields i didnt fill out go to repo and figure out yourself ad fill those; highlight the responsive design, game engine style viewport and understanding of physics add some extra panel for those
```

**Project 2**
```
slug: https://github.com/abrarnaguib/Project-AMTA 
title: 
status: archived
summary:
role: Programmer, UI/UX Programmer
stack: 
timeframe: 3rd Semester
links:
featured:
body:
**sidenote for you claude** the fields i didnt fill out go to repo and figure out yourself ad fill those; highlight the search engine and manual database add some extra panel for those
```

**Project 3**
```
slug: https://github.com/abrarnaguib/AnotherTSAPP_TEST
title: 
status: archived
summary:
role: Programmer, Level Designer
stack: 
timeframe: 2nd Semester
links:
featured:
body:
**sidenote for you claude** the fields i didnt fill out go to repo and figure out yourself ad fill those; highlight the raycaster and 3d board on this one add some extra panel for those
```

*(Duplicate the block above for each additional project.)*

---

## 5. Achievements

Lives in `content/achievements.ts`. One block per achievement — same
deal, copy/duplicate/delete as needed.

```
id:          (short unique id, e.g. "dean-list-2026" — not shown anywhere, just an internal key)
title:
category:    academic | research | competition | publication   (pick one — see note below for adding more)
timeframe:   (e.g. "Fall 2025")
description: (1–2 lines)
link:        (optional — label + URL if there's something to point to, e.g. "Details: https://...")
```

**Achievement 1**
```
id: 
title: University Physics Competition
category: Silver
timeframe: 3rd semester
description:
link: 
**sidenote for you claude** will add a image in the /public/images titled "University Physics Competition" add that image with the proper frame and fill in the non filled in details for me 
```

**Achievement 2**
```
id: 
title: Compettitive Programming
category: Pupil in Codeforces
timeframe: 
description:
link: https://codeforces.com/profile/ans0041 https://leetcode.com/u/ans0041/
**sidenote for you claude** say that total of 650+ problem solved across different platforms and fill in the non filled in details for me 
```

**Achievement 3**
```
id: 
title: IUT Excellence Award
category: 
timeframe: 2026
description:
link: 
**sidenote for you claude** will add a image in the /public/images titled "IUT excellence award" add that image with the proper frame and fill in the non filled in details for me 
*(Duplicate for each additional achievement.)*

**Need a category that isn't academic/research/competition/publication**
(e.g. "leadership", "volunteer", "award")? Just say what you want it
called — adding one is a one-line change to the type in
`content/achievements.ts`, not a restructure.

---

## 6. Skills

Lives in `content/skills.ts`. The site groups skills into labeled
categories (currently Languages / Frameworks & Libraries / Tools &
Platforms) rather than one flat list.

**Languages** — items: C, C++, Java, Python, PostgreSQL

**Frameworks & Libraries** — items: Cmake, Raylib, ImGUI, OpenGL, JavaFX

**Tools & Platforms** — items: VScode, Godot

**Want a different grouping, or an extra group** (e.g. "Cloud & DevOps",
"Design"): just list the group name and its items — adding a group is
appending one object to an array, no type changes needed at all (unlike
achievement categories above).

---

## 7. Contact

Lives in `content/contact.ts` (the channels) and `app/contact/page.tsx`
(the intro line).

- **Intro line** (currently "[Placeholder intro line]" — one sentence
  above the contact links, e.g. "Best way to reach me is email."):

- **Email:**abrarnaguib@gmail.com
- **GitHub URL:**https://github.com/abrarnaguib
- **LinkedIn URL:**https://www.linkedin.com/in/abrar-naguib-192a84265/
- **Anything else** (resume link, personal site, X/Twitter, Discord,
  etc. — label + URL, add as many as you want):

---

## 8. Optional: a "Now" / hobbies section

The build plan leaves this section optional on purpose — per its own
rule, an empty hobbies section reads worse than no section, so it's not
built at all yet. If you want one (writing, art, music, whatever), say so
and give me the content; if there's nothing here, skip it and nothing
changes.

---

## 9. Background image

You mentioned you'll provide this separately: a pattern of small stars,
asterisks, exclamation marks, and dots, in red / cyan / the panel's
greyish background color. Once you hand me the file, it drops in at
`public/images/` and replaces the current placeholder
(`hobekicity.jpg`, referenced from `app/layout.tsx`) — no need to do
anything with it yourself beyond sending the file; just flag the
filename/format when you send it (PNG with transparency vs. JPG, roughly
what dimensions) if it matters for how it should tile or scale.

**note for you I am clarifying the miss understanding** By pattern of small stars,
asterisks, exclamation marks, and dots, in red / cyan / the panel's
greyish background color i meant it should the thing that will make my portfolio image and not the background. the background hobekineko will stay unchange and also i have add the porfolio pic in the /public/images directory so add that with my desired pattern