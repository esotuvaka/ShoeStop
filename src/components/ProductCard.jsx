import {Suspense} from 'react';
import {Image, Link} from '@shopify/hydrogen';

import MoneyCompareAtPrice from './MoneyCompareAtPrice.client';
import MoneyPrice from './MoneyPrice.client';

/**
 * A shared component that displays a single product to allow buyers to quickly identify a particular item of interest
 */
export default function ProductCard({product}) {
  const selectedVariant = product.variants.edges[0].node;

  if (selectedVariant == null) {
    return null;
  }

  return (
    <div className="text-md relative mx-5 mb-4 rounded-2xl bg-white py-8 transition-all duration-700">
      <div className="text-9xl"></div>
      <Link to={`/products/${product.handle}`}>
        <div className="relative mb-2 flex h-96 items-center justify-center overflow-hidden rounded-lg object-cover">
          {selectedVariant.image ? (
            <Image
              className="absolute h-full w-full transform bg-white bg-cover bg-center object-contain object-center transition-all duration-500 ease-in-out hover:scale-110"
              data={selectedVariant.image}
            />
          ) : null}
          {!selectedVariant?.availableForSale && (
            <div className="absolute top-3 left-3 rounded-3xl bg-black py-3 px-4 text-xs text-white">
              OUT OF STOCK !
            </div>
          )}
        </div>

        <div className="mx-auto w-11/12">
          <span className="mb-0.5 font-['Poppins'] text-3xl font-semibold text-black">
            {product.title}
          </span>

          {product.vendor && (
            <p className="mt-2 mb-0.5 text-lg font-medium text-gray-900">
              {product.vendor}
            </p>
          )}

          <div className="flex">
            <Suspense fallback={null}>
              <MoneyPrice money={selectedVariant.priceV2} />
            </Suspense>
            {selectedVariant.compareAtPriceV2 && (
              <Suspense fallback={null}>
                <MoneyCompareAtPrice money={selectedVariant.compareAtPriceV2} />
              </Suspense>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
