import {useProduct} from '@shopify/hydrogen/client';

/**
 * A client component that tracks a selected variant and/or selling plan state, as well as callbacks for modifying the state
 */
export default function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProduct();

  return (
    <>
      {options.map(({name, values}) => {
        return (
          <fieldset key={name} className="mt-8">
            <legend className="mb-4 text-xl font-medium text-gray-900">
              {name}
            </legend>
            <div className="flex flex-wrap items-center gap-4">
              {values.map((value) => {
                const checked = selectedOptions[name] === value;
                const id = `option-${name}-${value}`;

                return (
                  <label key={id} htmlFor={id}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name={`option[${name}]`}
                      value={value}
                      checked={checked}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <div
                      className={`md:text-md cursor-pointer rounded border p-2 text-sm ${
                        checked ? 'bg-gray-900 text-white' : 'text-gray-900'
                      }`}
                    >
                      {name.includes('Color') ? (
                        <div
                          className=" h-6 w-6"
                          style={{backgroundColor: value}}
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        <span className="px-2">{value}</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </>
  );
}
