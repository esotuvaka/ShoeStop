# Hydrogen test storefront

Hydrogen is an alternative to Next.js for headless eCommerce, and this repo is my first pass at making a headless storefront

## Checklist

- Need to run a Lighthouse check to get first steps for performance, accessibility, and seo improvement
- Possibly add ID's to different components to make them more navigable when using Chrome DevTools
- Fix the media queries / layout shifts on different display sizes
- Look into adding more content to the landing page
- Change the collections' [handle].server.jsx file to be more aesthetic / cleanup
- ! Change FeaturedCollections.jsx to Brands.jsx
- ! Change button theming to a reusable attribute in tailwind.config
- ! Change product page to have better spacing, and better image sizing
- ! Change cart to accurately say if an order has free shipping or not (>$50)

## Problems

- Layout shifts on different screen sizes
- "Brands" section is not responsive
- Images in individual product pages are too large
- Cart says ANY item has free shipping (despite only being on orders $50 or more), but moving on to billing section shows a charge for shipping

## Versions

### 5/16/2022:

- Converted "featured collection" section into "Brands" section
- Updated landing page to have a better hero image, removed hover subtext, and improved color consistency of backgrounds
- Consistent button theming
- Edited brand logos photos for consistent sizing (For some reason when collection data is mapped the Image object ignores its explicit width and height parameters???)
- Changed actual featured collection to feature "cooler" shoes
- Updated product details page to better fit Black & Burgundy theme
