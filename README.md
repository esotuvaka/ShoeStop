# CONCEPT Hydrogen storefront

## NOT LIVE - Shopify Oxygen servers release date are TBD. Please see here @ https://stackblitz.com/github/esotuvaka/ShoeStop-Hydrogen-Store-TEST?file=README.md , but allow adequate time to load and open the preview in a new window (upper right of Stackblitz UI)

### Built with Shopify Hydrogen Framework, TailwindCSS, ViteJS, GraphQL, Shopify as a CMS

## Checklist

- Need to run a Lighthouse check to get first steps for performance, accessibility, and seo improvement
- Research further SEO work that can be done
- Possibly edit / customize the shopping cart a little more

- ~~Possibly add ID's to different components to make them more navigable when using Chrome DevTools~~
- ~~Fix the media queries / layout shifts on different display sizes~~
- ~~Change the collections' [handle].server.jsx file to be more aesthetic / cleanup~~
- ~~! Change FeaturedCollections.jsx to Brands.jsx~~
- ~~! Change product page to have better spacing, and better image sizing~~
- ~~! Change cart to accurately say if an order has free shipping or not (>$50)~~

## Problems

- Media queries can break (need to check for odd sizing / common devices like Macbook)
- Landing page needs more content, possible link to men / women collections

## Versions

### 6/14/2022:

- Updated README
- Now aware of potential specific device media queries like macbooks that Chrome DevTools don't have specific breakpoints for

### 5/22/2022:

- Changed FeaturedCollections.jsx file to be Brands.jsx
- Changed product page to have better image sizing and spacing
- Changed the cart UI to be more navigable / compressed, while also functioning better with multiple different products in cart
- Worked on some media query issues, but will invesigate further for edge cases (small phones, 4k displays, layout shifts)
- Changed cart to accurately reflect shipping costs (no actual fix for the static $50 off message in the subtotal calculation, so just removed the text)
- Removed country selector from the mobile navigation
- Changed ProductOptions.client.jsx to have consistent option button sizing
- Changed landing page to hopefully not break under large screen sizes (laptop-desktop)
- Changed header to have consistent sizing under media queries (previously y-padding was changing with queries, now is consistent)

### 5/16/2022:

- Converted "featured collection" section into "Brands" section
- Updated landing page to have a better hero image, removed hover subtext, and improved color consistency of backgrounds
- Consistent button theming
- Edited brand logos photos for consistent sizing (For some reason when collection data is mapped the Image object ignores its explicit width and height parameters???)
- Changed actual featured collection to feature "cooler" shoes
- Updated product details page to better fit Black & Burgundy theme
