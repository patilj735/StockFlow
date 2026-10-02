# Design Direction

## Style Keywords

- Clean
- Functional
- Professional
- Soft contrast
- Low visual fatigue
- Data-focused

## Primary Palette

### Core Theme

| Purpose        | Color     | Tailwind    |
| -------------- | --------- | ----------- |
| Background     | `#F8FAFC` | `slate-50`  |
| Surface/Card   | `#FFFFFF` | `white`     |
| Border         | `#E2E8F0` | `slate-200` |
| Primary        | `#2563EB` | `blue-600`  |
| Primary Hover  | `#1D4ED8` | `blue-700`  |
| Text Primary   | `#0F172A` | `slate-900` |
| Text Secondary | `#475569` | `slate-600` |
| Success        | `#16A34A` | `green-600` |
| Warning        | `#D97706` | `amber-600` |
| Danger         | `#DC2626` | `red-600`   |

This palette:

- looks modern without screaming “template”
- works extremely well for tables/forms
- is easy on eyes
- keeps data readable
- looks believable as real business software

## Dashboard Feel

The app should visually feel like:

```txt id="pal1"
Warehouse software
Retail admin panel
POS backoffice
Internal company system
```

not:

```txt id="pal2"
Crypto dashboard
AI startup landing page
Gaming UI
```

## Sidebar

| Element     | Color     |
| ----------- | --------- |
| Sidebar BG  | `#0F172A` |
| Active Item | `#1E293B` |
| Hover       | `#334155` |
| Text        | `#CBD5E1` |
| Active Text | `#FFFFFF` |

Tailwind:

```txt id="pal3"
bg-slate-900
bg-slate-800
hover:bg-slate-700
text-slate-300
```

This creates:

- strong navigation hierarchy
- professional enterprise feel

---

## Table Design

Inventory systems are table-heavy.

Use:

- zebra rows
- soft borders
- subtle hover

Example:

| Element   | Tailwind            |
| --------- | ------------------- |
| Header    | `bg-slate-100`      |
| Row Hover | `hover:bg-slate-50` |
| Border    | `border-slate-200`  |

## Button Philosophy

Avoid:

- giant rounded buttons
- glowing effects
- gradients

Use:

- medium radius
- strong contrast
- subtle hover

Example:

```txt id="pal4"
rounded-lg
px-4 py-2
font-medium
transition-colors
```

## Typography

### Best Choice

Use:

[Inter Font](https://fonts.google.com/specimen/Inter?utm_source=chatgpt.com)

Why:

- industry standard
- admin dashboard friendly
- excellent readability

> But I love Nunito! It’s a great font. But Inter is just more common in this type of software. That's why I used it in this project.

## Dark Mode

- prioritize light mode first
- optionally add dark mode later

Most inventory software is still primarily light-themed because:

- tables are easier to scan
- forms are easier to read
- less visual fatigue during operations

## Main Layout

```txt id="pal5"
bg-slate-50
text-slate-900
```

### Cards

```txt id="pal6"
bg-white
border border-slate-200
rounded-xl
shadow-sm
```

### Inputs

```txt id="pal7"
border border-slate-300
focus:ring-2 focus:ring-blue-500
focus:border-blue-500
```

### Primary Button

```txt id="pal8"
bg-blue-600 hover:bg-blue-700 text-white
```

### Final UX Notes

The most impressive thing in admin software is:

- spacing
- alignment
- consistency
- hierarchy
- readability

NOT:

- fancy visuals
- animations everywhere
- gradients
- glassmorphism

A clean inventory dashboard with excellent spacing looks far more senior than flashy UI.
