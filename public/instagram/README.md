# Instagram Carousel Images Folder

Drop any photos you want to display in the Instagram scrolling marquee directly into this folder (`public/instagram/`).

### Current Photos:
* `ceramic-morning-cups.jpg`
* `ruffled-candle-holders.jpg`
* `floral-blossom-mug.png`
* `candle-stands-spread.jpg`
* `ceramic-pebble-pins.jpg`
* `custom-name-hangings.jpg`
* `striped-ceramic-tumbler.jpg`
* `studio-collection-display.jpg`

---

### How to add more photos to the feed:
1. Drop your photo file into `public/instagram/` (e.g. `public/instagram/my-reel-shot.jpg`).
2. Open [`lib/content.ts`](file:///Users/ansusmacbookair/Downloads/tintinkss%203/lib/content.ts) and append it to `instagramPhotos`:
```ts
{
  image: "/instagram/my-reel-shot.jpg",
  alt: "Handcrafted pottery piece",
  tag: "@tintinkss",
},
```
The scrolling carousel will automatically include your new photo in the loop.
