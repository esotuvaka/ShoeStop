import {useMoney} from '@shopify/hydrogen/client';

/**
 * A client component that defines the currency code, currency symbol, and amount of a product
 */
export default function MoneyPrice({money}) {
  const {currencyNarrowSymbol, amount} = useMoney(money);
  return (
    <span
      id="MoneyPrice"
      className="mt-2 font-['Poppins'] text-2xl font-bold text-burgundy"
    >
      {currencyNarrowSymbol}
      {amount}
    </span>
  );
}
