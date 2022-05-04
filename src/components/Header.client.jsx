import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';

import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-32" role="banner">
      <div
        className={`fixed z-20 mx-auto h-20 w-full border-b border-gray-200 bg-white px-6 md:px-8 md:py-6 lg:h-32 lg:pt-8 lg:pb-0 ${
          isMobileNavOpen ? '' : ''
        }`}
      >
        <div
          className="flex h-full w-full place-content-between lg:flex-col"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="mx-auto flex w-4/5 items-center justify-between text-center">
            <Link
              className="text-3xl font-semibold uppercase tracking-widest text-black"
              to="/"
            >
              Shoe<span className="text-burgundy">Stop</span>
            </Link>

            <Navigation collections={collections} />
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />

            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
