import {
  useCart,
  CartCheckoutButton,
  Link,
  CartLines,
  CartLineImage,
  CartLineProductTitle,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  CartShopPayButton,
  CartEstimatedCost,
  useCartLine,
} from '@shopify/hydrogen/client';
import {Dialog} from '@headlessui/react';

import {useCartUI} from './CartUIProvider.client';
import CartIconWithItems from './CartIconWithItems.client';
import {BUTTON_PRIMARY_CLASSES} from './Button.client';

/**
 * A client component that contains the merchandise that a customer intends to purchase, and the estimated cost associated with the cart
 */
export default function Cart() {
  const {isCartOpen, closeCart} = useCartUI();
  const {totalQuantity} = useCart();

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        id="Cart"
        className={`duration-400 fixed top-0 bottom-0 left-0 right-0 z-20 bg-black transition-opacity ${
          isCartOpen ? 'opacity-20' : 'pointer-events-none opacity-0'
        }`}
        onClick={isCartOpen ? closeCart : null}
      />
      <Dialog open={isCartOpen} onClose={closeCart}>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-gray-50 opacity-75" />
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 z-20 flex h-full w-full flex-col rounded-b-lg bg-gray-50 shadow-2xl md:top-7 md:left-auto md:right-7 md:bottom-auto md:block md:h-auto md:max-h-[calc(100vh-56px)] md:w-[470px] ${
            totalQuantity === 0 ? 'overflow-hidden' : 'overflow-y-scroll'
          }`}
        >
          <CartHeader />
          {totalQuantity === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <CartItems />
              <CartFooter />
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
}

function CartHeader() {
  const {closeCart} = useCartUI();
  return (
    <header
      id="Cart"
      className="sticky top-0 flex items-center justify-between border-b border-gray-300 bg-white py-3 px-6"
    >
      <button type="button" onClick={closeCart}>
        <ArrowIcon />
        <span className="sr-only">Close cart</span>
      </button>
      <span className="text-xs text-gray-500">
        Free shipping on orders over $50
      </span>
      <CartIconWithItems />
    </header>
  );
}

function CartItems() {
  return (
    <div
      id="Cart"
      className="w-full flex-grow px-7"
      role="table"
      aria-label="Shopping cart"
    >
      <div role="row" className="sr-only">
        <div role="columnheader">Product image</div>
        <div role="columnheader">Product details</div>
        <div role="columnheader">Price</div>
      </div>
      <CartLines>
        <LineInCart />
      </CartLines>
    </div>
  );
}

function LineInCart() {
  const {merchandise} = useCartLine();
  return (
    <div
      id="Cart"
      role="row"
      className="flex justify-center border-b border-gray-300 py-7 text-gray-900 last:border-b-0"
    >
      <div role="cell" className="mr-2 flex-shrink-0 sm:mr-7">
        <Link to={`/products/${merchandise.product.handle}`}>
          <CartLineImage
            className="rounded-xl border border-black border-opacity-5 bg-white "
            options={{width: 98, height: 98, crop: 'center'}}
          />
        </Link>
      </div>
      <div
        role="cell"
        className="flex-grow-1 mx-auto mr-2 flex w-full flex-col items-start justify-between sm:mr-4"
      >
        <Link
          to={`/products/${merchandise.product.handle}`}
          className="hover:underline "
        >
          <CartLineProductTitle className="mx-auto text-center text-lg font-medium" />
        </Link>
        <ul className="space-y-1 text-sm">
          {merchandise.selectedOptions.map(({name, value}) => (
            <li key={name}>
              {name}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div role="cell" className="flex flex-col items-end ">
        <CartLineQuantityAdjustButton
          adjust="remove"
          aria-label="Remove from cart"
          className="disabled:pointer-events-all disabled:cursor-wait"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-12 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </CartLineQuantityAdjustButton>
        <CartLinePrice className="text-lg font-semibold text-burgundy" />
        <CartItemQuantity />
      </div>
    </div>
  );
}

function CartItemQuantity() {
  return (
    <div
      id="Cart"
      className="mt-2 flex items-center overflow-auto rounded border border-gray-300"
    >
      <CartLineQuantityAdjustButton
        adjust="decrease"
        aria-label="Decrease quantity"
        className="disabled:pointer-events-all disabled:cursor-wait sm:p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </CartLineQuantityAdjustButton>
      <CartLineQuantity
        as="div"
        className="p-2 text-center text-xs text-gray-900"
      />
      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className="disabled:pointer-events-all text-gray-400 disabled:cursor-wait sm:p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </CartLineQuantityAdjustButton>
    </div>
  );
}

function CartFooter() {
  return (
    <footer
      id="Cart"
      className="sticky bottom-0 border-t border-black border-opacity-5 pb-8"
    >
      <div className="relative h-60 bg-white p-7 ">
        <div role="table" aria-label="Cost summary">
          <div role="row" className="flex justify-between">
            <span className="font-semibold" role="rowheader">
              Subtotal asasd
            </span>
            <CartEstimatedCost
              amountType="subtotal"
              role="cell"
              className="text-right"
            />
          </div>
          <div role="row" className="mt-2 flex justify-between"></div>
        </div>
        <CartShopPayButton className="my-4 flex w-full justify-center rounded-md bg-[#5a31f4] py-2" />
        <CartCheckoutButton className={BUTTON_PRIMARY_CLASSES}>
          Checkout
        </CartCheckoutButton>
      </div>
    </footer>
  );
}

function CartEmpty() {
  const {closeCart} = useCartUI();
  return (
    <div id="Cart" className="flex flex-col p-7">
      <p className="mb-4 text-center text-lg text-gray-500">
        Your cart is empty
      </p>
      <button
        type="button"
        onClick={closeCart}
        className={BUTTON_PRIMARY_CLASSES}
      >
        Continue Shopping
      </button>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1.5L19 8.5M19 8.5L12 15.5M19 8.5L1 8.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
