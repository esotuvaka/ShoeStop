import {useCart} from '@shopify/hydrogen/client';

import CartIcon from './CartIcon';

/**
 * A client component that specifies the icon to use if a cart contains merchandise
 */
export default function CartIconWithItems() {
  const {totalQuantity} = useCart();

  return (
    <>
      <div id="CartIconWithItems" className="relative">
        <CartIcon />

        <div
          className={`absolute bottom-3 right-1 flex translate-y-1/2 transform items-center justify-center rounded-full bg-red-800 text-xs leading-none text-white transition-all ${
            totalQuantity > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
          }`}
          aria-hidden
        >
          {totalQuantity > 0 ? totalQuantity : null}
        </div>
      </div>
      <span className="sr-only">Cart, {totalQuantity} items</span>
    </>
  );
}
