import {useState, Suspense} from 'react';
import {useCountry} from '@shopify/hydrogen/client';
import {Listbox} from '@headlessui/react';
import SpinnerIcon from './SpinnerIcon.client';

import {ArrowIcon, Countries} from './CountrySelector.client';

/**
 * A client component that selects the appropriate country to display for products on a mobile storefront
 */
export default function MobileCountrySelector() {
  const [listboxOpen, setListboxOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useCountry();

  return (
    <div className="mt-8 w-full rounded border border-gray-200">
      <Listbox onChange={setSelectedCountry}>
        {({open}) => {
          setTimeout(() => setListboxOpen(open));
          return (
            <>
              <Listbox.Button className="flex w-full items-center justify-between py-5 px-7 text-sm">
                {selectedCountry.name}
                <ArrowIcon isOpen={open} />
              </Listbox.Button>
              <Listbox.Options className="h-64 w-full overflow-y-auto px-3 pb-2 text-lg">
                <Listbox.Option
                  disabled
                  className="w-full px-4 pb-4 text-left font-medium uppercase"
                >
                  Country
                </Listbox.Option>
                {listboxOpen && (
                  <Suspense
                    fallback={
                      <div className="flex justify-center">
                        <SpinnerIcon />
                      </div>
                    }
                  >
                    <Countries
                      selectedCountry={selectedCountry}
                      getClassName={(active) => {
                        return (
                          `py-2 px-4 rounded flex justify-between items-center text-left ` +
                          `w-full cursor-pointer ${
                            active ? 'bg-gray-100' : null
                          }`
                        );
                      }}
                    />
                  </Suspense>
                )}
              </Listbox.Options>
            </>
          );
        }}
      </Listbox>
    </div>
  );
}
