# QuizForge Design System

A comprehensive design system inspired by [Linear.app](https://linear.app/)'s dark, sophisticated aesthetic.

## Design Philosophy

QuizForge's design language emphasizes:

- **Dark-first design** - Deep backgrounds with light text for reduced eye strain
- **Subtle depth** - Achieved through gradients and blur, not heavy shadows
- **Purposeful color** - Accent colors highlight important elements without overwhelming
- **Refined typography** - Clear hierarchy with precise spacing
- **Smooth interactions** - Fast, subtle animations that feel responsive

---

## Color Palette

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#0D0D12` | Main app background |
| `bg-secondary` | `#13131A` | Cards, panels |
| `bg-tertiary` | `#1A1A24` | Elevated elements, hover states |
| `bg-elevated` | `#21212D` | Modals, dropdowns |
| `bg-hover` | `#26263A` | Interactive hover states |

### Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `surface` | `rgba(255, 255, 255, 0.03)` | Default surface |
| `surface-hover` | `rgba(255, 255, 255, 0.05)` | Hover state |
| `surface-active` | `rgba(255, 255, 255, 0.08)` | Active/pressed state |
### Border Colors

| Token | Value | Usage |
|-------|-------|-------|
| `border` | `rgba(255, 255, 255, 0.08)` | Default border |
| `border-hover` | `rgba(255, 255, 255, 0.12)` | Border on hover |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#F5F5F7` | Headlines, important content |
| `text-secondary` | `#A1A1AA` | Body text, descriptions |
| `text-tertiary` | `#71717A` | Labels, hints, metadata |
| `text-disabled` | `#52525B` | Disabled state |

### Primary Brand Color

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#5E6AD2` | Primary buttons, links |
| `primary-light` | `#7C85DE` | Hover state |
| `primary-dark` | `#4F5ABD` | Active state |
| `primary-subtle` | `rgba(94, 106, 210, 0.15)` | Subtle backgrounds |

### Accent Colors

| Token | Value | Usage |
|-------|-------|-------|
| `accent-cyan` | `#06B6D4` | Info, links |
| `accent-emerald` | `#10B981` | Success, positive |
| `accent-amber` | `#F59E0B` | Warning, caution |
| `accent-rose` | `#F43F5E` | Error, danger |
| `accent-violet` | `#8B5CF6` | Special accents |

### Semantic Colors

| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#10B981` | Success states |
| `warning` | `#F59E0B` | Warning states |
| `error` | `#EF4444` | Error states |

---

## Typography

### Font Family

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Type Scale

| Size | Value | Line Height | Letter Spacing | Usage |
|------|-------|-------------|----------------|-------|
| `text-xs` | 11px | 16px | 0.01em | Micro labels |
| `text-sm` | 13px | 20px | 0 | Small text, buttons |
| `text-base` | 14px | 22px | 0 | Body text |
| `text-lg` | 16px | 24px | -0.01em | Large body |
| `text-xl` | 18px | 26px | -0.01em | Section headers |
| `text-2xl` | 24px | 30px | -0.02em | Page headers |
| `text-3xl` | 32px | 38px | -0.02em | Large headers |
| `text-4xl` | 40px | 46px | -0.02em | Display |
| `text-5xl` | 56px | 62px | -0.03em | Hero headlines |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| `normal` | 400 | Body text |
| `medium` | 500 | Buttons, labels |
| `semibold` | 600 | Headers, emphasis |
| `bold` | 700 | Major headlines |

---

## Spacing

Based on a 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-0.5` | 2px | Micro gaps |
| `spacing-1` | 4px | Tight spacing |
| `spacing-2` | 8px | Small gaps |
| `spacing-3` | 12px | Medium gaps |
| `spacing-4` | 16px | Default spacing |
| `spacing-5` | 20px | Comfortable spacing |
| `spacing-6` | 24px | Section spacing |
| `spacing-8` | 32px | Large sections |
| `spacing-12` | 48px | Page sections |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements |
| `rounded` | 6px | Buttons, inputs |
| `rounded-md` | 8px | Cards |
| `rounded-lg` | 12px | Large cards |
| `rounded-xl` | 16px | Modals |
| `rounded-full` | 9999px | Circular elements |

---

## Components

### Buttons

```jsx
// Primary - Main actions
<Button>Create Quiz</Button>

// Secondary - Alternative actions
<Button variant="secondary">Cancel</Button>

// Ghost - Subtle actions
<Button variant="ghost">Learn more</Button>

// Danger - Destructive actions
<Button variant="danger">Delete</Button>

// With icon
<Button icon={Plus}>Add Question</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>
```

### Cards

```jsx
// Default card
<Card className="p-6">Content</Card>

// Hoverable card
<Card hoverable className="p-6">Content</Card>

// Interactive card (clickable)
<Card interactive className="p-6">Content</Card>

// Elevated card (modals)
<Card variant="elevated" className="p-6">Content</Card>
```

### Inputs

```jsx
// Default input
<Input placeholder="Enter text..." />

// With icon
<Input icon={Search} placeholder="Search..." />

// Error state
<Input error placeholder="Invalid input" />

// Sizes
<Input size="sm" />
<Input size="lg" />
```

### Badges

```jsx
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
```

### Dropdowns

```jsx
<Dropdown trigger={<Button>Open Menu</Button>}>
  <DropdownItem icon={Edit}>Edit</DropdownItem>
  <DropdownItem icon={Copy}>Duplicate</DropdownItem>
  <DropdownDivider />
  <DropdownItem icon={Trash2} danger>Delete</DropdownItem>
</Dropdown>
```

### Modals

```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader onClose={() => setIsOpen(false)}>
    <h2>Modal Title</h2>
  </ModalHeader>
  <ModalBody>
    Content goes here
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={onClose}>Cancel</Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </ModalFooter>
</Modal>
```

---

## Special Effects

### Gradient Mesh Background

```jsx
<div className="gradient-mesh">
  {/* Creates subtle animated gradient background */}
</div>
```

### Glow Effects

```jsx
// Primary glow (on buttons, cards)
<div className="hover:shadow-glow-primary">...</div>

// Success glow
<div className="shadow-glow-success">...</div>
```

### Glass Effect

```jsx
<div className="glass">
  {/* Semi-transparent with blur */}
</div>
```

### Text Gradients

```jsx
<span className="text-gradient">Gradient text</span>
<span className="text-gradient-primary">Brand gradient</span>
```

---

## Animation

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 100ms | Micro-interactions |
| `duration-DEFAULT` | 150ms | Standard transitions |
| `duration-slow` | 300ms | Modals, page transitions |

### Easing

```css
/* Standard easing */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Spring easing (for playful animations) */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Keyframe Animations

```jsx
// Fade in
<div className="animate-fade-in">...</div>

// Slide up
<div className="animate-slide-up">...</div>

// Scale in (for modals)
<div className="animate-scale-in">...</div>

// Subtle pulse
<div className="animate-pulse-subtle">...</div>
```

---

## CSS Utility Classes

### Component Classes

```css
.btn              /* Base button styles */
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.btn-ghost        /* Ghost button */
.btn-danger       /* Danger button */

.card             /* Base card */
.card-hover       /* Hoverable card */
.card-interactive /* Clickable card */
.card-elevated    /* Elevated card */

.input            /* Base input */
.input-sm         /* Small input */
.input-lg         /* Large input */
.textarea         /* Textarea */
.label            /* Form label */

.badge            /* Base badge */
.badge-primary    /* Primary badge */
.badge-success    /* Success badge */
.badge-warning    /* Warning badge */
.badge-error      /* Error badge */

.nav-item         /* Navigation item */
.nav-item-active  /* Active nav item */
.menu-item        /* Menu item */
.menu-item-danger /* Danger menu item */

.dropdown         /* Dropdown container */
.modal            /* Modal container */
.modal-overlay    /* Modal backdrop */

.divider          /* Horizontal divider */
.divider-vertical /* Vertical divider */

.spinner          /* Loading spinner */
.skeleton         /* Skeleton loader */
```

### Effect Classes

```css
.gradient-mesh       /* Animated gradient background */
.gradient-radial     /* Radial gradient */
.gradient-fade-down  /* Fading gradient */
.glass               /* Glassmorphism effect */
.glow-primary        /* Primary glow */
.glow-success        /* Success glow */
.text-gradient       /* Text gradient */
.text-gradient-primary /* Brand text gradient */
```

### Utility Classes

```css
.truncate-2    /* Truncate to 2 lines */
.truncate-3    /* Truncate to 3 lines */
.no-scrollbar  /* Hide scrollbar */
```

---

## Best Practices

### Do ✅

- Use dark backgrounds (`bg-primary`, `bg-secondary`) as the base
- Add depth with subtle surface colors, not shadows
- Keep text hierarchy clear (primary → secondary → tertiary)
- Use primary color sparingly for emphasis
- Keep animations fast (150ms) and purposeful
- Use the glow effect on interactive elements

### Don't ❌

- Don't use pure black (`#000000`) as a background
- Don't overuse accent colors
- Don't add heavy box shadows (Material Design style)
- Don't use slow animations (>300ms for most interactions)
- Don't use bright colors without sufficient contrast
- Don't break the color hierarchy

---

## Figma Reference

For a visual reference, the design system is inspired by Linear's interface:
- [Linear.app](https://linear.app/) - Main inspiration
- Dark background with subtle gradients
- Clean, minimal component design
- Purposeful use of accent colors

