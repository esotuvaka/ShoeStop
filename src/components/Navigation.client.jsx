import {Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  return (
    <nav className="hidden text-center lg:block">
      <ul className="grid-cols-4 items-center justify-center md:grid">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              to={`/collections/${collection.handle}`}
              className="block p-4 font-bold text-black transition-colors duration-500 hover:text-burgundy xl:text-xl"
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
