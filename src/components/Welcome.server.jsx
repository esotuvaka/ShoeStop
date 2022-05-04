import {Image} from '@shopify/hydrogen';

/**
 * A server component that displays the content on the homepage of the Hydrogen app
 * Essentially the Hero Area
 */
export default function Welcome() {
  return (
    <>
      <div
        id="Discover"
        className="left-0 -mt-40 flex h-screen w-full items-center justify-between  px-4 lg:-mx-4 xl:-mx-12 xl:px-12"
      >
        <div className="xl:-ml-24">
          <h1 className="mt-12 font-['Poppins'] text-5xl font-extrabold text-white hover:cursor-default md:text-7xl">
            Discover
          </h1>
          <p className="mb-5 w-1/2   text-xl  text-white lg:w-full">
            The new way to shop for shoes
          </p>
          <div
            id="hiddenScrollPrompt"
            className="-mt-28 py-4  pl-72 font-['Poppins'] font-semibold text-transparent transition-all duration-700 hover:block hover:translate-x-16 hover:text-white lg:w-3/4"
          >
            Interested? Scroll for more
          </div>
        </div>
        <div
          id="brands"
          className="fixed right-0 mt-28 hidden flex-col rounded-lg bg-stone-50 px-4 pt-20 pb-96 lg:mr-20 lg:flex "
        >
          <ul className="space-y-1 ">
            <li>
              <Image
                width={'50'}
                height={'50'}
                src="/Adidas_Logo.svg"
                className=""
              ></Image>
            </li>
            <li>
              <Image
                width={'50'}
                height={'50'}
                src="/nike-4-logo-svg-vector.svg"
                className=""
              ></Image>
            </li>
            <li>
              <Image
                width={'50'}
                height={'50'}
                src="/Vans_company_logo.svg"
                className=""
              ></Image>
            </li>
            <li>
              <Image
                width={'50'}
                height={'50'}
                src="/puma-logo-logo-svgrepo-com.svg"
                className=""
              ></Image>
            </li>
            <li>
              <Image
                width={'50'}
                height={'50'}
                src="/supra.svg"
                className="hover:cursor-pointer"
              ></Image>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
