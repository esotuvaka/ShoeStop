import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';

export default function Index({country = {isoCode: 'US'}}) {
  return (
    <Layout hero={<GradientBackground />}>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12 w-full">
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
          <FeaturedProductsBox country={country} />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
        </Suspense>
      </div>
    </Layout>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="mb-10 h-40 rounded-xl bg-white p-12 shadow-xl"></div>;
}

function FeaturedProductsBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[16];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="mb-10 rounded-xl bg-white p-12 shadow-xl">
      {featuredProductsCollection ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div
                className="rounded-xl transition-all duration-500 hover:-translate-y-10 hover:shadow-xl"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-md mb-8 flex items-center justify-center text-center font-medium">
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="rounded-lg bg-neutral-800 px-12 py-2 font-['Poppins'] text-xl font-semibold tracking-wide text-white transition-all duration-700 hover:-translate-y-0.5 hover:bg-neutral-700 hover:px-16 hover:shadow-2xl"
              >
                Featured Collection
              </Link>
            </span>
          </div>
          <div className="text-center md:hidden">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="rounded-lg bg-neutral-800 px-12 py-2 font-['Poppins'] text-xl font-semibold tracking-wide text-white transition-all duration-700 hover:-translate-y-0.5 hover:bg-neutral-700 hover:px-16 hover:shadow-2xl "
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

function GradientBackground() {
  return (
    <div className="fixed top-0 h-full w-full overflow-hidden">
      <div
        className="absolute  z-10 h-5/6 w-full border-2 border-x-0 bg-neutral-600 bg-cover bg-bottom bg-blend-overlay "
        style={{
          backgroundImage: 'url(/paul-volkmer-updW-QUccFE-unsplash.jpg',
        }}
      />
    </div>
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 20) {
      edges {
        node {
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
          products(first: 250) {
            edges {
              node {
                handle
                id
                title
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                      priceV2 {
                        currencyCode
                        amount
                      }
                      compareAtPriceV2 {
                        currencyCode
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
