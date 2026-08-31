# Tintinkss Gallery Images Folder Guide

You can manually drop your photos directly into these category folders:

### 1. `public/gallery/vases-and-pots/`
* Use for: Wheel-thrown vases, flower pots, planters, mugs, and tableware.
* Examples: `terracotta-vase.jpg`, `flower-pot.jpg`, `speckled-mug.jpg`

### 2. `public/gallery/postcards-and-favors/`
* Use for: Illustrated ceramic postcards, Holy Communion favors, angel keepsakes, cross pendants.
* Examples: `angel-keepsakes.jpg`, `communion-favors.jpg`

### 3. `public/gallery/collectibles-and-gifts/`
* Use for: Ceramic fridge magnets, custom badges, small desk collectibles, and gift sets.
* Examples: `ceramic-magnets.jpg`

---

### How to link a new image:
Open [`lib/content.ts`](file:///Users/ansusmacbookair/Downloads/tintinkss%203/lib/content.ts) and set the `image` property in `galleryItems`:
```ts
{
  id: "my-piece",
  title: "My Ceramic Vase",
  category: "Vases & Pots",
  categoryKey: "vases",
  tag: "Small Batch",
  image: "/gallery/vases-and-pots/my-photo.jpg", // <--- Path to your image
  ...
}
```
If `image: ""` is empty, the gallery will automatically show the studio placeholder card.
