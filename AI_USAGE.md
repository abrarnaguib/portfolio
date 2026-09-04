# AI Tool Usage

## Tools used
- Claude Code (Anthropic) — planning, scaffolding, component implementation, copy drafts

## Prompt log

### 2026-09-02
- "ok i need to make a portfolio website and the given assignment is this [...]"
- "now i have half made a next.js website and there are some dependencies already
   set up in my hardware using docker and what not you can look at the cd ../sms
   directory for more details you dont necessarily have to use those
   now i was thinking of a high effort portfolio with very stylized aesthetic and
   feel like a game's menu the theme would be persona 5 theme the button and
   fields would be of that and have those animations
   now all details for now will be placeholder so do that
   now write a project document as a artifact on how to execute this"

### 2026-09-03
- "ok update the document per the following instructions: 1. p5 reference was
   given to give an idea for the looks but the naming of the components would
   be normal like project should be project not palaces. 2. [routing: multi
   route but at a minimum / hosting: localhost for now / placeholders:
   obviously placeholder / font: Bebas Neue / sound: none for now].
   3. this is a course assignment so you are allowed to go bonkers in terms
   of aesthetics, if needed more formal can be made at a later time"
- "do phase 0 now"
- "The style guide looks ugly; the panels are very plain."
- "For the panel, remove that red sidebar and instead do a red shadow box
   type thing. Also, for the top-right buttons in the nav bar, make the text
   bigger, and the box that comes up when hovered should get a light shaking
   animation on top of the appearing animation."
- "Why does the academic panel in the achievements page randomly have a
   bigger shadow box? Fix that."
- "Do phase 4, and although I have added some hover things already, add on
   top of that what you think is good."
- "Route wipe is too slow and repeated change between tabs make it annoying,
   so make it like boot sequence, only once per session. Also make 4-5
   different swipes from four different and tilt direction, and make it
   randomly assigned to tab changing, and the same swipe must repeat next to
   the same on one swipe gap while being random. Also add boot sequence to
   all the main pages. Plus, the boot sequence animation is just a simple
   fade and slide in and doesn't feel like a title slap animation, so look
   into that."
- "Nope, not satisfied with the animation, I won't feel the punch in it. It
   should be like a WHACK slap feeling, it should have impact, like high
   velocity, slight screen shake on impact. Analyse how these are done,
   don't take my words and do that — do how you understand it and then do
   it. Also, you didn't do the wipe only once per session, and for the boot
   sequence animation, on every page it should also be applied to the
   panels, not just the section tabs."
- "I asked you to do wipe for every single tab switch once, what currently
   is that? Only one happens, not for every section/subsection. But wipe
   should happen only for the first time entering that tab, before reset or
   something like that. Also, for the home page boot sequence animation,
   the shake should be applied to the nav bar and footer and every other
   area with same intensity. And the animation for the name is too
   springy — give it the same animation as the other pages' section tab,
   just more powerful. Also, if possible, then add a crack beneath the name
   after it hits the screen, which will fade in 3-4s. Also, add the image
   that I added in the images directory as the most background, then draw
   everything that is there currently — don't remove anything, just add."
- "You added the image on just the home page, but I wanted it on every
   page. Also, it doesn't fit the screen. Plus, remove the crack
   animation."

### 2026-09-04
- "Why is the footer at different height on different page? It should be on
   a fixed height at the bottom. By putting the image on whole screen, I
   meant the main part except the nav and footer. Also increase the
   opacity of red stripes that diagonally on the whole screen. Change the
   section tab animation slightly — white appears from right to left
   instead of left to right. And add this animation for the panel when
   hovered, in addition to the tilt that currently is present: add a white
   box that appears left to right and will be similar to red box offset +
   tilted, but x-axis & y-axis mirror. And the red box and white box will
   skew similar to the section tab animation, only difference is there the
   white box skews more, here the red box will skew less."
- "For the panel, the hover should be for ones that take to another page,
   but those who don't take to another page should not have a separate
   hover thing. Also, I asked for the panel — the red/white shadow boxes
   should sway. And for the navbar tabs, you never used the
   .tab-fill-reverse I asked for that."
- "https://www.gazijarin.com/ — look at this portfolio. Can you add the
   image portion with the same animation? But the style will be the theme,
   and a frame for that image similar to the panel."
- "Look how the cursor distorts it." (with a reference screenshot of the
   gazijarin.com hero's particle-cursor effect)
- "Do phase 6, and then for phase 7 prepare a markdown with all the fields
   created — I will just add info in the fields, and maybe write some
   lines as instruction on what to add for projects and achievements, in
   addition to some stuff if more categories are needed. And for the image
   part — it will be created with small stars, asterisks, exclamation
   marks, and dots. Colors will be red, cyan, and the panel's greyish
   background. I will provide the image later. Also, boot sequence
   animation on the landing page is bugged, I think it's not triggering
   after refresh, but shake does trigger."
- Filled in the prepared `CONTENT.md` template directly with real project,
  achievement, skills, and contact details — including GitHub repo links
  with notes to research each repo and fill in the remaining fields,
  certificate/ceremony photos for two achievements with a note to add them
  "with the proper frame," and a correction that the described
  stars/asterisks/exclamation-marks/dots pattern was for the hero's
  particle image, not a new background.
- "Do phase 8 — create a repo and then host. Before that, update
   AI_USAGE.md and fill it with my prompts with you. My prompts were super
   casual, make those grammatically and spelling accurate, but don't
   paraphrase. Not every prompt is necessary, just keep the actual design
   prompts."
