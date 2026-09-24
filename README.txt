FunHub Epic Simulation Test Build

This is the live-site build for the main FunHub GitHub Pages repository.

New game architecture:
- World Conquest: single-player grand-strategy campaign with a world-style map, provinces, AI expansion, economy, morale, industry, research, diplomacy, army management, pan/zoom and a full-screen command mode.
- Pirate Empire: exploration/simulation game with an ocean map, ship movement, islands, discoveries, trading, crew, cargo, repairs, reputation and random events.
- Precision AI Lab: fictional non-weapon AI calibration simulation with moving virtual targets, adaptive waves, combo scoring, energy and focus pulse.
- Survival Outpost: defense simulation with a base, escalating creature waves, energy, scrap, repairs, barrier upgrades and perimeter interaction.

All four game pages are standalone HTML+JS experiences and include the required scripts in this package.

Mobile design:
- Game canvas occupies the available screen.
- Controls are overlaid on the map.
- Back and full-screen buttons are overlaid.
- Full-screen depends on the browser allowing the user-gesture requestFullscreen API; if unavailable, use the browser's own full-screen/page controls.

IMPORTANT:
- This package is prepared for the main FunHub site.
- Do NOT upload it to the live funhub repository until every game is tested.
- The test pages are intentionally independent of the old simple Stage B game engines.

PHASE 3 — MEASURE
This build adds analytics.js to all FunHub pages.

Custom GA4 events:
- funhub_page_loaded — FunHub page/game loaded
- funhub_engagement — visitor reached 30s, 60s, or 180s on a page
- funhub_game_start — visitor clicked into one of the four larger games
- funhub_tool_action — visitor clicked a tool/game button
- funhub_navigation — visitor used internal HTML navigation
- funhub_multi_page_session — visitor reached more than one FunHub page in the same tab session

No names, email addresses, passwords, free-text tool inputs, or other directly identifying values are sent by analytics.js.

GA4 reporting ideas:
1. Reports > Engagement > Events: compare funhub_game_start and funhub_tool_action.
2. Explore: compare funhub_page against event count and engagement milestones.
3. Use Page title/Page path to see which pages attract and retain visitors.
4. Use the game_name parameter to compare the four larger games.

The existing GA4 Measurement ID is G-S3H3K12WE5.
