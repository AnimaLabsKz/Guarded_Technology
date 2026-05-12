
# Fix overlapping center text on Solutions page

## What I found
The overlap comes from `src/components/ui/full-screen-scroll-fx.tsx` rendering all section titles at once inside `.fx-center`:

- it maps through all `sections`
- creates one `.fx-title-row` per slide
- all rows stay mounted in the same centered area
- only inner word spans are animated, so the title layers can still visually stack and become messy

This is why `CCTV`, `LIVING`, and `ENERGY` appear together instead of one-by-one.

## Implementation plan

### 1. Tie center title directly to active slide index
In `src/components/ui/full-screen-scroll-fx.tsx`, replace the current center-title map with a single active title driven by `index`:

- render only `sections[index].title`
- remove the always-mounted stack of all `.fx-title-row` nodes
- keep the current scroll logic and `index` state exactly as-is

Result:
- index `0` → only `CCTV`
- index `1` → only `LIVING`
- index `2` → only `ENERGY`

### 2. Add smooth fade transition when title changes
Use a lightweight transition approach for the active title:

- either `opacity` + small `translateY`
- or GSAP fade-in/fade-out tied to `index` changes

The simplest clean fix is:
- one centered title wrapper
- key it by `index`
- animate enter/exit with fade transition so the word changes smoothly during scroll

### 3. Remove title-splitting logic if no longer needed
Since the new requirement is “only one active word visible at a time”, the current word-by-word masking system becomes unnecessary for these titles.

In `src/components/ui/full-screen-scroll-fx.tsx`:
- remove `wordRefs`
- remove `tempWordBucket`
- remove `splitWords`
- remove `WordsCollector`
- simplify `changeSection()` so it no longer animates arrays of words

This will reduce complexity and make the behavior more reliable.

### 4. Keep the rest of the slideshow unchanged
Do not change:
- background transitions
- left/right lists
- progress indicator
- scroll pinning / snapping behavior
- current Solutions page content in `src/pages/Solutions.tsx`

Only the center-title rendering/animation should change.

## Files to update
- `src/components/ui/full-screen-scroll-fx.tsx`

## Technical details
Recommended structure:
```tsx
<div className="fx-center">
  <div key={index} className="fx-title-inner fx-title-fade">
    {sections[index]?.title}
  </div>
</div>
```

Recommended styling:
```tsx
.fx-center {
  position: relative;
}

.fx-title-fade {
  animation: fx-title-fade 0.45s ease;
}

@keyframes fx-title-fade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

This matches your request best: one active word only, linked to active scroll state, with a smooth fade on change.
