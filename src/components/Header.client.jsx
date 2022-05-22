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
    <header id="Header" className="h-20 lg:h-28 " role="banner">
      <div
        className={`fixed z-20 mx-auto w-full border-b border-gray-200 bg-white py-4 px-6 shadow-lg md:px-8 lg:py-4 xl:py-4      ${
          isMobileNavOpen ? '' : ''
        }`}
      >
        <div
          className="flex w-full place-content-between lg:flex-col"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="mx-auto flex w-11/12 items-center justify-between text-center xl:w-4/5">
            <Link
              className="text-3xl font-semibold uppercase tracking-widest text-black xl:text-4xl"
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
