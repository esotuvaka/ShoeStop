import CartIcon from './CartIcon';
import OpenIcon from './OpenIcon';

/**
 * A shared component and Suspense call that's used in `App.server.jsx` to let your app wait for code to load while declaring a loading state
 */
export default function LoadingFallback() {
  return (
    <header className="max-w-screen h-20 text-gray-700 lg:h-32">
      <div className="fixed z-10 mx-auto h-20 w-full border-b border-black border-opacity-5 bg-white/90 px-6 md:px-8 md:py-6 lg:h-32 lg:pt-8 lg:pb-0">
        <div className="flex h-full place-content-between lg:flex-col">
          <div className="flex w-full items-center justify-between text-center">
            <div className="hidden w-16 lg:block" />
            <div className="flex h-full w-7 items-center justify-center lg:hidden">
              <OpenIcon />
            </div>
            <p className="text-3xl font-black uppercase tracking-widest">
              Piqqi
            </p>
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
