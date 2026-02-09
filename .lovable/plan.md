

## Align Tabs Navigation with Hero Metrics and Content

### Problem
The [Results | Methodology | Correlation] tab bar currently spans the full `container` width (~1400px), while the hero section's key metrics (NET PROFIT, etc.) and the tab content below (TOTAL NET PROFIT, etc.) are both constrained to `max-w-5xl` (1024px). This creates a visual misalignment on desktop and tablet.

### Solution
Move the `StrategyTabsNav` inside the same `max-w-5xl mx-auto` wrapper so all three elements share the same width:

1. Hero metrics grid (already `max-w-5xl`)
2. Tabs navigation bar (will become `max-w-5xl`)
3. Tab content (already `max-w-5xl`)

### Technical Detail

**File: `src/components/backtest/TabsContainer.tsx`**

Move `<StrategyTabsNav />` from outside the `max-w-5xl` div to inside it:

```text
Before:
  container mx-auto
    ├── StrategyTabsNav  (full container width)
    └── max-w-5xl mx-auto
         └── TabsContent

After:
  container mx-auto
    └── max-w-5xl mx-auto
         ├── StrategyTabsNav  (same width as content)
         └── TabsContent
```

This single change ensures the tabs bar left/right edges align exactly with the hero metrics above and the performance metrics below, creating visual consistency across desktop and tablet viewports.
