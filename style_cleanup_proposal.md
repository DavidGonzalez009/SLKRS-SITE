Style cleanup proposal — suggested deletions & merges

Goal: remove duplicate/overlapping rules and consolidate repeated blocks while preserving current layout. I'll not modify `style.css` yet — this file lists exact changes to review.

1. Remove duplicate `@keyframes pulseTarget`

- Keep the first occurrence (near the top). Remove the second duplicate block.

Delete this block (the second `@keyframes pulseTarget`):

```
@keyframes pulseTarget {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08);
  }

  100% {
    transform: scale(1);
  }
}
```

2. Consolidate `.result-text` definitions

- There are multiple `.result-text` blocks. Merge unique properties into one canonical `.result-text` (keep location near the top where main layout rules live).

Suggested replacement (single block):

```
.result-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-family: Impact, sans-serif;
  font-size: 52px;
  line-height: 1.05;
  width: 85%;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #89ff4a;
  text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 20px #89ff4a;
  font-weight: bold;
  z-index: 10;
}
```

3. Consolidate repeated `.product-card p` blocks

- Four occurrences exist; keep a single base rule for shared properties and use per-card overrides for differences.

Base rule to keep (merge into one place):

```
.product-card p {
  margin-top: 8px;
  color: white;
  font-family: Impact, sans-serif;
  font-size: 24px;
  text-shadow: 0 0 6px black, 0 0 12px #89ff4a;
  position: relative;
  top: 23px;
}
```

- Remove the extra `.product-card p { ... }` blocks and leave only per-card overrides like `.product-card.striker p { margin-top: 12px; }` inside their media query if needed.

4. Merge `@media (max-width: 600px)` fragments

- There are several `@media (max-width: 600px)` blocks spread across the file. Merge them into one block to avoid accidental overrides and make maintenance easier.

Suggested combined mobile block (add or replace the multiple small ones):

```
@media (max-width: 600px) {
  .shop-page { min-height: auto; overflow-y: auto; }
  .shop-logo { width: 170px; margin-top: 30px; }
  .formation { display: grid; grid-template-columns: 1fr 1fr; gap: 45px 10px; padding: 20px; margin-top: 20px; }
  .product-card { width: 150px; margin: 0 auto; }
  .product-card img { width: 100%; height: auto; }
  .product-card p { font-size: 18px; line-height: 1.1; margin-top: 8px; }
  .landing-menu button { width: 130px; padding: 8px 14px; font-size: 20px; }
  /* add per-card mobile overrides here (striker, midfielder, etc.) */
}
```

5. Misc small fixes

- Replace incorrect selector `striker-product img` (no leading dot) with `.striker img` or `.striker-product img` depending on which class you want to use.
- Avoid duplicating `.goalie` rules across many breakpoints unless they differ — consolidate similar sizes.

What I'll do next if you approve:

- Prepare a minimal patch that applies these exact changes (delete duplicates, add merged blocks) and leave the original file backed up.

Choose: "Approve apply" to have me apply the patch, or "Request changes" to tweak the proposal first.
