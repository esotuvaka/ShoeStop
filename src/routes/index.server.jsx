import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
  Image,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';

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
    <div className="my-10 rounded-xl bg-white p-12 shadow-xl">
      {featuredProductsCollection ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div
                className="rounded-xl border-2 border-transparent transition-all duration-500 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-2xl"
                key={product.id}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-md flex h-full w-full items-center justify-center text-center font-medium">
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="m-0 block w-full items-center justify-center rounded bg-black px-6 py-4 text-center  font-bold uppercase tracking-wider text-white transition-all duration-500 hover:-translate-y-1 hover:bg-burgundy hover:shadow-2xl active:bg-neutral-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
              >
                Featured Collection
              </Link>
            </span>
          </div>
          <div className="text-center md:hidden">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="m-0 block w-full items-center justify-center rounded bg-black px-6 py-4 text-center  font-bold uppercase tracking-wider text-white transition-all duration-500 hover:-translate-y-1 hover:bg-burgundy hover:shadow-2xl active:bg-neutral-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
            >
              Featured
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
    query: QUERY_FEATURED,
    variables: {
      numCollections: 4,
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];

  // return collections.map((collections) => {
  //   return (
  //     <FeaturedCollections collection={collections} key={collections.id} />
  //   );
  // });

  return (
    <div className="grid grid-cols-2 rounded-xl bg-white py-8 sm:grid-cols-4 sm:px-8 lg:h-96">
      {collections.map((collection) => (
        <ul key="FeaturedCollectionKey" className="h-52 lg:h-auto">
          <li key={collection.id} className="relative h-52 list-none lg:h-72 ">
            <div className=" flex items-center justify-center">
              <Image
                width="300"
                height="300"
                data={collection.image}
                className="mx-auto mb-4 h-full w-full transition-all duration-500 ease-in-out hover:scale-110 sm:mb-0"
              ></Image>
            </div>

            <Link
              to={`/collections/${collection.handle}`}
              className="absolute inset-x-0 bottom-0 mx-auto mb-4 block w-3/4 items-center justify-center rounded bg-black px-4 py-4  text-center font-bold  uppercase tracking-wider text-white transition-all duration-500 hover:-translate-y-1 hover:bg-burgundy hover:shadow-2xl active:bg-neutral-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 sm:px-6"
            >
              {collection.handle}
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

function GradientBackground() {
  return (
    <div className="fixed top-0 h-full w-full overflow-hidden">
      <div
        className="absolute z-10 h-screen w-full border-2 border-x-0 bg-cover bg-center bg-blend-overlay "
        style={{
<<<<<<< HEAD
          backgroundImage:
            'url(https://raw.githubusercontent.com/esotuvaka/ShoeStop-Hydrogen-Store-TEST/main/public/grailify-lBhxU9ycdcs-unsplash.jpg)',
=======
          backgroundImage: 'url(https://raw.githubusercontent.com/esotuvaka/ShoeStop-Hydrogen-Store-TEST/main/public/grailify-lBhxU9ycdcs-unsplash.jpg)',
>>>>>>> d4e0d703ffcc21f82b8f2dcda006da86574b1658
        }}
      />
    </div>
  );
}

const QUERY_FEATURED = gql`
  query indexContent(
    $country: CountryCode
    $language: LanguageCode
    $numCollections: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $numCollections) {
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
        }
      }
    }
  }
`;

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
