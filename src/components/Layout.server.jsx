import {
  useShop,
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
  CacheHours,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import Cart from './Cart.client';
import {Suspense} from 'react';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export default function Layout({children, hero}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      language: languageCode,
      numCollections: 4, //Max number of collections in the Navbar
    },
    cache: CacheHours(),
    preload: '*',
  });
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider preload="*">
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="sr-only p-4 focus:not-sr-only focus:block"
        >
          Skip to content
        </a>
      </div>
      <div className="max-w-screen min-h-screen font-sans text-gray-700">
        {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
        <Suspense fallback={null}>
          <Header collections={collections} storeName={storeName} />
          <Cart />
        </Suspense>
        <main role="main" id="mainContent" className="relative bg-white">
          {hero}
          <div className="mx-auto max-w-screen-2xl p-4 md:py-5 md:px-8">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($language: LanguageCode, $numCollections: Int!)
  @inContext(language: $language) {
    shop {
      name
    }
    #PrettierIgnore
    collections(
      first: $numCollections
      after: "eyJsYXN0X2lkIjoyODcyMzI4MTkzNjEsImxhc3RfdmFsdWUiOiIyODcyMzI4MTkzNjEifQ=="
    ) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
