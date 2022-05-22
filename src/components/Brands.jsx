import {Image, Link} from '@shopify/hydrogen';

export default function IndexCollections({collection}) {
  return (
    <>
      <div
        id="Brands"
        key={collection.id}
        className="inline-block w-1/4 flex-col items-center py-4 px-4"
      >
        <div className="bottom-0 mx-auto h-[225px] items-center justify-center">
          <Image width="300" data={collection.image} className="top-1/2" />
        </div>
        <div className="px-10 py-10 lg:py-0">
          <h2 className="mb-5 flex justify-center text-3xl  font-bold text-black">
            {/* {collection.title} */}
          </h2>
          <p className="mb-6 text-lg text-gray-500">{collection.description}</p>
          <Link
            to={`/collections/${collection.handle}`}
            className="block  items-center justify-center rounded bg-black text-center font-bold uppercase tracking-wider text-white transition-all duration-500 hover:-translate-y-1 hover:bg-burgundy hover:shadow-2xl active:bg-neutral-700 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300   md:px-6 md:py-4"
          ></Link>
        </div>
      </div>
    </>
  );
}
