# Data Visualization

## Purpose
Data visualization transforms numbers into understanding. Good data viz reveals patterns; bad data viz creates confusion or deceives. The agent must know when to use each chart type, how to apply design principles to data, and how to catch common data viz failures.

---

## Chart Type Selection Guide

### Comparison
| Chart | Use When | Max Items |
|-------|----------|-----------|
| **Bar chart (vertical)** | Comparing values across categories | 5-15 bars |
| **Bar chart (horizontal)** | Long category labels, ranking | 5-25 bars |
| **Grouped bar** | Comparing subcategories within categories | 3-5 groups × 2-4 bars |
| **Radar/spider** | Multivariate comparison (3-8 variables) | 2-3 items |

### Trend / Time Series
| Chart | Use When | Data Points |
|-------|----------|-------------|
| **Line chart** | Continuous data over time | 7-100+ points |
| **Area chart** | Volume/cumulative trend | 7-100+ points |
| **Stacked area** | Part-to-whole over time | 2-5 series |
| **Sparkline** | Compact trend indicator in tables/cards | 20-50 points |

### Part-to-Whole
| Chart | Use When | Segments |
|-------|----------|----------|
| **Pie chart** | Simple proportion (2-5 segments ONLY) | 2-5 |
| **Donut chart** | Proportion + center metric | 2-5 |
| **Stacked bar** | Multiple part-to-whole comparisons | 2-6 segments per bar |
| **Treemap** | Hierarchical part-to-whole | 5-50 items |

### Distribution
| Chart | Use When |
|-------|----------|
| **Histogram** | Frequency distribution of continuous data |
| **Box plot** | Comparing distributions across categories |
| **Scatter plot** | Relationship between two variables |
| **Bubble chart** | Three-variable relationship (x, y, size) |

### Relationship
| Chart | Use When |
|-------|----------|
| **Scatter plot** | Correlation between two variables |
| **Heat map** | Two-dimensional categorical data, correlation matrices |
| **Network graph** | Connections between entities |

---

## Tufte's Data-Ink Ratio

### The Principle
- **Data-ink ratio** = ink used to present data / total ink on the chart
- Maximize this ratio: every pixel should represent data, not decoration
- Remove: gridlines (or make them very faint), chart borders, background fills, 3D effects, decorative icons, redundant labels
- Keep: data points, axis labels (minimal), direct labels on data when possible, a clear title

### Practical Application
- **Gridlines**: Use 3-5 light gray (#e5e7eb) horizontal gridlines. No vertical gridlines unless essential. No border around the chart area
- **Axis labels**: Minimal but clear. Abbreviate where possible (Jan, Feb, Mar not January, February, March). Rotate only as last resort — horizontal text is always easier to read
- **Direct labels**: Label data points directly instead of using a legend when there are ≤3 series. This eliminates the eye movement between legend and data
- **Color**: Use it for DATA, not decoration. One color per data series. Highlight the important series in a strong color, gray out the rest
- **Chart junk to eliminate**: 3D effects (ALWAYS), gradient fills on bars (ALWAYS), decorative icons, thick chart borders, excessive gridlines, "artistic" fonts

---

## Dashboard Layout Patterns

### The Metrics → Details → Actions Flow
- **Row 1: Key metrics** (KPI cards). 3-5 cards showing the most important numbers. Each card: metric name, value, trend indicator (sparkline or arrow), comparison period
- **Row 2: Primary visualization**. The main chart — usually a time series showing the most important trend. Full-width or 2/3 width
- **Row 3: Secondary visualizations**. 2-3 charts showing supporting data. Half-width each
- **Row 4: Data table**. Detailed data for users who need specifics. Sortable, filterable, searchable

### Dashboard Layout Rules
- **KPI cards** should be scannable in 2 seconds. Number is hero (24-32px, bold). Label is small (12-14px). Trend indicator uses color: green (up-and-good), red (down-and-bad). Reverse for metrics where "down is good" (churn, bounce rate)
- **Chart sizing**: Give the most important chart the most space. Don't make all charts equal — hierarchy applies to data viz too
- **Alignment**: Charts in a row should share the same Y-axis range and time range when showing related data. This enables visual comparison without cognitive effort
- **Filter bar**: Persistent at the top. Date range selector, key dimension filters. Applied filters should be visible (chips or tags). "Clear all" always available
- **Responsive**: Dashboard charts stack vertically on mobile. KPI cards can be 2-per-row on tablet, 1-per-row on mobile. Tables scroll horizontally with sticky first column

---

## Color in Data Visualization

### Sequential Palettes
- For continuous data (temperature, percentage, intensity): single-hue gradient from light to dark
- Example: light blue (#dbeafe) → dark blue (#1e40af) for "low to high"
- Always start from light (low) to dark (high) — darker = more = natural mapping

### Diverging Palettes
- For data with a meaningful center point (positive/negative, above/below average)
- Example: red (#ef4444) ← neutral (#f5f5f5) → blue (#3b82f6) for "below average ← average → above average"
- The center color should be neutral/light. The extremes should be equally saturated

### Categorical Palettes
- For unrelated categories: use hue differences, not brightness differences
- Maximum 7-8 colors before differentiation breaks down. After 8, use a "highlight + gray" strategy (color the important category, gray the rest)
- Use ColorBrewer palettes — they're designed for perceptual uniformity and color-blind safety
- Accessible pairs: blue + orange, teal + coral, purple + gold, green + pink (avoid red + green)

### Semantic Colors in Data Viz
- Green = good/positive (revenue up, conversion up). Red = bad/negative (churn up, errors up)
- This convention is STRONG — violating it (green for churn) creates confusion
- For audiences where red/green distinction matters (color blindness), double-encode: red + down arrow, green + up arrow

---

## Responsive Data Visualization

### Mobile Adaptations
- Simplify: reduce data points, hide secondary series, show summary instead of detail
- Touch targets: if charts are interactive (tooltips, drill-down), ensure touch targets are at least 44px
- Horizontal scrolling: acceptable for data tables (sticky first column). NOT for charts
- Alternative mobile formats: replace a line chart with a simple metric card + sparkline. Replace a complex table with a summary list

### Accessible Data Viz
- All charts must have text alternatives (aria-label with summary, or a data table version)
- Color is never the only encoding: use patterns, labels, or symbols alongside color
- Animated charts: provide a static version for prefers-reduced-motion users
- High contrast: chart elements must meet 3:1 contrast against background. Data labels must meet 4.5:1
- Font size in charts: minimum 12px for labels, 10px for axis ticks

---

## Table Design

### Table Layout
- **Header row**: Sticky on scroll. Background slightly darker than rows. Font weight 600. Text alignment matches data alignment (numbers right, text left, status center)
- **Row height**: 40-48px for comfortable reading. Dense mode: 32-36px
- **Column width**: Auto-sized to content with minimum widths. Important columns get more space. Secondary columns can be hidden in a "customize columns" panel
- **Zebra striping**: Optional. Alternating row backgrounds (#ffffff / #f9fafb) aid horizontal tracking on wide tables. Not necessary if rows are narrow or few
- **Borders**: Horizontal borders between rows are sufficient. Vertical borders are usually unnecessary (alignment handles column separation). If needed, use very light (#e5e7eb)

### Table Interaction
- **Sorting**: Click column header to sort. Cycle: ascending → descending → unsorted. Show sort indicator (arrow icon)
- **Filtering**: Per-column filters (dropdown, text input, or range) or global search. Applied filters shown as removable chips
- **Selection**: Checkboxes in first column for multi-select. Highlight selected rows. Bulk actions appear on selection (delete, export, assign)
- **Pagination**: 10/25/50/100 rows per page selector. Show total count. "Showing 1-25 of 342 results"
- **Row expansion**: Click to expand and show row details. Expand icon (chevron) in first column. Only one expanded row at a time (unless explicitly multi-expand)

---

## Quality Criteria
- FAIL: 3D chart effects — ALWAYS inappropriate in data viz
- FAIL: Pie chart with more than 5 slices — becomes unreadable
- FAIL: Truncated Y-axis that makes small differences look dramatic (starts at 95% instead of 0%)
- FAIL: Rainbow/jet color map for sequential data — perceptual non-uniformity creates false patterns
- FAIL: Dual Y-axes suggesting correlation that doesn't exist
- FAIL: No axis labels or title — the chart is meaningless without context
- FAIL: Legend far from the chart requiring eye movement to decode colors
- FAIL: Chart without text alternative (aria-label or data table fallback)
- FAIL: Bar chart with more than 15 categories — switch to horizontal bars or top-N with "other"
- FAIL: Using area/volume to represent linear data — circles/bubbles whose AREA represents value are misread when users compare DIAMETER
- PASS: Chart type matches the data relationship (comparison → bar, trend → line, proportion → pie/donut)
- PASS: Data-ink ratio maximized — no chart junk, no 3D, no gradient fills
- PASS: Color palette is color-blind safe (tested with simulator)
- PASS: Direct labels used instead of legend when ≤3 data series
- PASS: Dashboard KPI cards show metric, trend, and comparison period
- PASS: Tables have sticky headers, sorting, and pagination
- PASS: Mobile responsive: charts simplified, tables scrollable with sticky column

## Anti-patterns
- "The Pie Lie": Pie chart with 10+ tiny slices, one of which is labeled "Other (73%)"
- "The Truncated Truth": Y-axis starting at 98% to make a 99% vs 99.5% difference look dramatic
- "The Rainbow Chart": Using a full spectrum color gradient for sequential data — equal perceptual steps don't map to equal hue steps
- "The 3D Disaster": Any 3D chart. Bar chart in perspective. Pie chart at an angle. Data is occluded and proportions are distorted
- "The Dual-Axis Deception": Two Y-axes scaled to make unrelated trends appear correlated
- "The Spaghetti Plot": 10+ lines on a single line chart — unreadable tangle of colors. Show 2-3 lines max, or use small multiples
