# The Gaza Dilemma

An interactive, browser based educational game for StandWithUs UK's Explore programme.

## Use

Open `index.html` in a modern browser. It works without an internet connection, apart from links to historical source material.

Choose between Quick mission (6 chapters) and Full briefing (10 chapters). Students select an option, lock it in, discuss the dilemma, and then reveal the historical outcome. A final cabinet debrief can be exported as a text file or printed.

## Deploy to GitHub Pages

1. Extract the contents of the ZIP file.
2. Upload `index.html`, `style.css`, `scenarios.js`, `app.js`, the `assets` folder and `reference_cards` folder to the root of your GitHub repository.
3. Open Settings, then Pages, and publish from the main branch root folder.
4. Open the published Pages URL after deployment completes.

Suggested GitHub commit message:

`Add Gaza Dilemma interactive historical decision game`

If using Git from your local repository:

```bash
git add index.html style.css scenarios.js app.js assets reference_cards README.md
git commit -m "Add Gaza Dilemma interactive historical decision game"
git push origin main
```

## Historical scope

The experience opens with Israel's withdrawal from Gaza in 2005 and ends with Operation Shield and Arrow in May 2023. It deliberately does not cover the October 2023 attacks or the subsequent war.

Chapters: 2005 disengagement and rocket fire, 2006 Summer Rains, 2007 Hamas takeover of Gaza, 2008 to 2009 Cast Lead, 2011 Shalit prisoner exchange, 2012 Pillar of Defence, 2014 Protective Edge, 2021 Guardian of the Walls, 2022 Breaking Dawn and 2023 Shield and Arrow.

The simulation is from the perspective of an Israeli decision maker. Student decisions are hypothetical and do not change the historical narrative. No real casualty or military effectiveness numbers are derived from student choices. The original slides are preserved as reference artwork; corrections to their casualty categories are recorded in the educator guide.

## Teaching notes

The educator guide and source library are accessible from the top menu of the game. The game uses images extracted from the four teaching cards supplied for this project. Original credits are shown underneath each photograph.

Sources include Israel's Ministry of Foreign Affairs, Ministry of Defence and IDF, the Congressional Research Service, UN OCHA, and the ICRC. See the Sources panel for links.

## Technical

Plain HTML, CSS and JavaScript, with no build tools, server, external scripts, fonts, analytics, accounts or dependencies. All student choices stay in the browser unless the student explicitly exports the debrief. Works on computers and phones. Printable debrief supported.
