import {Image, Link} from '@shopify/hydrogen';

/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function IndexCollections({collection}) {
  return collection ? (
    <>
      <div className="grid grid-cols-1 items-center justify-center overflow-hidden rounded-xl bg-white shadow-xl lg:grid-cols-2">
        <Image
          width={'300'}
          height={'300'}
          src="../Adidas_Logo.svg"
          className="mx-auto justify-center py-4 px-4"
        />
        <div className="px-10 py-10 lg:py-0">
          <h2 className="mb-5 flex justify-center text-3xl  font-bold text-black">
            {collection.title}
          </h2>
          <p className="mb-6 text-lg text-gray-500">{collection.description}</p>
          <Link
            to={`/collections/${collection.handle}`}
            className="mx-auto flex w-3/5 justify-center rounded-md bg-neutral-800 py-2 text-center font-['Poppins'] text-xl font-semibold tracking-wide text-white transition-all duration-700 hover:w-2/3 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-2xl"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </>
  ) : null;
}
