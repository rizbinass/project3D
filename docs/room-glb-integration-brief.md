# Room GLB Integration Brief

This document exports the current implementation request for another AI or engineer to continue inside the existing project.

## Project Context

- Existing project path: `D:\project3D`
- Framework: Next.js 15 App Router, React, TypeScript, TailwindCSS v4
- 3D stack: Three.js, React Three Fiber, Drei, postprocessing
- State: Zustand
- Animation: Framer Motion, GSAP
- Package manager: pnpm
- The app is already functional.
- Do not create a new project.
- Do not create a second scene.
- Do not redesign the architecture.
- Continue the existing codebase only.

## Asset To Integrate

Production room model:

```text
C:\Users\kibin\Downloads\room.glb
```

The asset should replace the previous procedural/placeholder room.

Important constraints:

- Never recreate the room manually.
- Never create duplicate meshes.
- Never duplicate components.
- Never duplicate scenes.
- Never rebuild the architecture.
- Never move objects inside the room.
- Reuse existing architecture and code as much as possible.

## Visual Direction

Treat all materials and colors inside `room.glb` as placeholders.

Replace materials programmatically with premium physically based materials.

Material mapping:

- Walls: warm matte white paint
- Floor: light oak wood
- Desk: dark walnut wood
- Door: dark oak
- Chair: black leather with brushed aluminum frame
- Monitor: matte black plastic with brushed aluminum stand
- PC: matte black metal
- Lamp: brushed brass
- Mirror: realistic reflective glass
- Window: clean transparent glass
- Plant pot: white ceramic
- Plant leaves: natural green
- Books: muted premium colors
- `Logo_RIZBINASS`: matte black acrylic with cyan emissive front face at night
- Action figures: keep original colors

## Mirror

The mirror must become a physically based reflective mirror.

## Window

The window must dynamically change by time mode.

Day:

- Blue sky
- Soft clouds

Night:

- Moon
- Stars

No fullscreen overlays. No browser modals. No replacing the 3D experience with HTML overlays.

## Interaction Rules

The room must remain visible during every interaction.

Every interaction must be camera-driven.

When an interactive object is clicked:

- Smoothly animate the camera toward that object using cinematic easing.
- Never teleport the camera.
- Save the previous camera transform.
- Restore the previous camera transform when exiting.
- Disable additional interactions while camera animation is running.

Interactive objects:

- Lamp
- Monitor
- PC
- Keyboard
- Mouse
- Photo_Frame
- Github_Icon
- Instagram_Icon
- LinkedIn_Icon

## Lamp Interaction

Clicking the lamp:

- Smoothly focuses the camera on the lamp.
- Plays a subtle switch animation.
- Toggles Day/Night mode.

Lighting transition:

- Animate every lighting transition smoothly in approximately one second.

Day mode:

- Bright sunlight
- Soft shadows
- Interior lights off
- Blue sky outside

Night mode:

- Dark ambient lighting
- Moonlight
- Stars outside
- Lamp emits light
- Monitor emits light
- Keyboard RGB emits light
- Mouse RGB emits light
- PC RGB emits light
- `Logo_RIZBINASS` emits cyan light

## Monitor / PC / Keyboard / Mouse Interaction

Monitor, PC, Keyboard, and Mouse all trigger exactly the same interaction.

Clicking any of them:

- Smoothly moves the camera toward the monitor.
- Monitor fills approximately 80% of the viewport.
- Monitor powers on with a short boot animation.
- Then shows a Windows 11 desktop.

The Windows interface:

- Must appear inside the monitor screen.
- Must not be an HTML overlay.
- Must not be a fullscreen browser modal.
- Only needs visual navigation for now.
- App functionality is not required yet.

Desktop icons/applications:

- Projects
- About Me
- Experience
- Contact
- Resume

Closing the desktop:

- Returns the monitor to powered-off state.
- Smoothly returns the camera to its original position.

## Photo Frame Interaction

Clicking `Photo_Frame`:

- Smoothly moves the camera toward the frame.
- Frame becomes the focus.
- Displays a larger version of the current image naturally as part of the scene.
- Do not open a browser modal.
- For now use random placeholder images that can easily be replaced later.

## Social Icon Interactions

`Github_Icon`, `Instagram_Icon`, and `LinkedIn_Icon` must be clickable.

Requirements:

- Use placeholder URLs.
- Open links in a new browser tab.
- Keep subtle hover animations.

## Quality Requirements

Improve overall visual quality while preserving the room layout.

Allowed:

- Improve materials
- Improve lighting
- Improve interactions

Not allowed:

- Change object placement
- Modify room layout
- Add new decorations
- Remove existing decorations
- Redesign the application

## Performance Requirements

Maintain:

- Lighthouse Performance above 90
- High FPS

Optimization requirements:

- Optimize draw calls
- Reuse materials
- Reuse geometries
- Use frustum culling
- Memoize expensive calculations
- Dispose resources correctly
- Avoid unnecessary rerenders
- Optimize shadows
- Optimize lighting
- Optimize postprocessing

## Verification Before Completion

Before finishing, verify:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Expected result:

- No TypeScript errors
- No ESLint errors
- No build errors
- No broken imports
- No duplicated scene or duplicate room implementation

## Existing Cleanup Already Done

Recent cleanup removed:

- Left standalone speaker
- Speaker interaction path
- Photography feature
- Photography 3D object
- Photography overlay/gallery/lightbox/data
- Unreachable Music panel/data because speaker was its only entry point
- Unused torus geometry from the speaker

Do not reintroduce those features unless explicitly requested.
