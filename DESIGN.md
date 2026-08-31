---
name: Journeys
description: A refined travel-planning workspace for collecting, shaping, and sharing trips.
colors:
  canvas: "#F5F1E9"
  surface: "#FFFCF6"
  ink: "#20241F"
  muted-ink: "#6D7068"
  rule: "#DDD7CC"
  primary: "#B94D38"
  primary-deep: "#923A2A"
  secondary: "#1C6470"
  soft-accent: "#E8D8B9"
typography:
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.05
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
---

# Design System: Journeys

## Overview

**Creative North Star: "The considered travel desk"**

Journeys is a calm, editorial product surface. It uses a warm paper canvas, soft framed surfaces, and strong ink typography so the work of planning a trip feels collected and intentional.

The system rejects the visual language of neon travel apps and dark glass dashboards. Destination images, maps, and friends supply the color and personality; the UI stays composed.

## Colors

Warm neutrals provide the field, while vermilion marks the next meaningful action and deep coastal teal carries selected or navigational states.

### Primary
- **Vermilion** (#B94D38): Primary actions, unread indicators, and focused decisions.

### Secondary
- **Coastal Teal** (#1C6470): Active navigation, map-related controls, and secondary emphasis.

### Neutral
- **Paper Canvas** (#F5F1E9): Application background.
- **Milk Surface** (#FFFCF6): Panels and fields.
- **Ink** (#20241F): Primary text and iconography.
- **Soft Rule** (#DDD7CC): Dividers and resting borders.

**The One Signal Rule.** Vermilion is for actions and new information, not decoration.

## Typography

**Display Font:** Newsreader, Georgia, serif
**Body Font:** Inter, system-ui, sans-serif

Headlines feel editorial and grounded. Labels and operational details remain compact, highly legible, and familiar.

## Elevation

Depth comes from tonal separation and fine rules. Shadows are reserved for raised controls and overlays, never used to make every panel float.

## Components

### Buttons
- **Shape:** Soft rectangle (16px).
- **Primary:** Vermilion fill with cream text.
- **Hover / Focus:** Darken the fill slightly; show a visible ink or teal focus ring.

### Cards / Containers
- **Corner Style:** 16px for working panels, 24px for feature imagery.
- **Background:** Milk Surface with a single soft rule.
- **Internal Padding:** 16px or 24px, varied by hierarchy.

### Navigation

The bottom bar is a pale, solid dock. Active items use a restrained teal fill and label, never a glow.

## Do's and Don'ts

### Do:
- **Do** use Newsreader only for page and destination headings.
- **Do** use vermilion only where an action or new information needs attention.
- **Do** allow images and maps to provide the screen's richer color.

### Don't:
- **Don't** use dark mode with purple gradients, neon accents, or glassmorphism.
- **Don't** turn every list item into a raised card.
- **Don't** use colored side-stripe borders or gradient text.
