import {
  flattenConnection,
  useProduct,
  useParsedMetafields,
  ProductProvider,
  ProductTitle,
  ProductDescription,
  ProductPrice,
  AddToCartButton,
  BuyNowButton,
} from '@shopify/hydrogen/client';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from './Button.client';

function AddToCartMarkup() {
  const {selectedVariant} = useProduct();
  const isOutOfStock = !selectedVariant.availableForSale;

  return (
    <div className="my-8 space-y-2">
      <AddToCartButton
        className={BUTTON_PRIMARY_CLASSES}
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
      </AddToCartButton>
      {isOutOfStock ? (
        <p className="text-center text-black">Available in 2-3 weeks</p>
      ) : (
        <BuyNowButton
          variantId={selectedVariant.id}
          className={BUTTON_SECONDARY_CLASSES}
        >
          Buy now
        </BuyNowButton>
      )}
    </div>
  );
}

function ProductPrices() {
  const product = useProduct();

  return (
    <>
      <ProductPrice
        className="text-lg font-semibold text-gray-500 line-through"
        priceType="compareAt"
        variantId={product.selectedVariant.id}
      />
      <ProductPrice
        className="text-lg font-semibold text-gray-900"
        variantId={product.selectedVariant.id}
      />
    </>
  );
}

export default function ProductDetails({product}) {
  const initialVariant = flattenConnection(product.variants)[0];

  const productMetafields = useParsedMetafields(product.metafields);
  const sizeChartMetafield = productMetafields.find(
    (metafield) =>
      metafield.namespace === 'my_fields' && metafield.key === 'size_chart',
  );

  return (
    <>
      <ProductProvider data={product} initialVariantId={initialVariant.id}>
        <div className="my-16 grid grid-cols-1 gap-x-8 md:grid-cols-[2fr,1fr]">
          <div className="mt-5 mb-8 md:hidden">
            <ProductTitle
              as="h1"
              className="mb-4 text-9xl font-bold text-black"
            />
            {product.vendor && (
              <div className="mb-2 text-sm font-medium text-gray-900">
                {product.vendor}
              </div>
            )}
            <span />
            <div className="flex justify-between md:block">
              <ProductPrices />
            </div>
          </div>

          <Gallery />

          <div>
            <div className="hidden md:block">
              <ProductTitle
                as="h1"
                className="mb-4 text-5xl font-bold text-black"
              />
              {product.vendor && (
                <div className="mb-2 text-sm font-medium text-gray-900">
                  {product.vendor}
                </div>
              )}
              <ProductPrices />
            </div>
            {/* Product Options */}
            <div className="mt-8">
              <ProductOptions />
              {sizeChartMetafield?.value && (
                <a
                  href="#size-chart"
                  className="my-4 block text-sm tracking-wide text-gray-500 underline"
                >
                  Size Chart
                </a>
              )}
              <AddToCartMarkup />
              <div className="items flex space-x-4"></div>
            </div>
            {/* Product Description */}
            <ProductDescription className="text-md prose border-t border-gray-200 pt-6 text-black" />
            {sizeChartMetafield?.value && (
              <div className="border-t border-gray-200"></div>
            )}
          </div>
        </div>
      </ProductProvider>
    </>
  );
}
