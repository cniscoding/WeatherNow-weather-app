import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { searchLocation } from "@/app/api/searchLocation";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface Location {
  name: string;
  state: string;
  country: string;
  lon: number;
  lat: number;
}
interface searchBoxProp {
  currentWeatherUpdate: any;
}

const SearchBox: React.FC<searchBoxProp> = ({ currentWeatherUpdate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  let timeoutId: NodeJS.Timeout;

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (query.trim() !== '') {
        const data = await searchLocation(query);
        setResults(data);
        setStatus('OK');
        // inputRef.current?.blur()
      } else {
        setResults([]);
        setStatus('');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setStatus('Error');
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = async (searchQuery: string) => {
  //   try {
  //     setLoading(true);
  //     if (searchQuery.trim() !== '') {
  //       const data = await searchLocation(searchQuery);
  //       setResults(data);
  //       setStatus('OK');
  //     } else {
  //       setResults([]);
  //       setStatus('');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //     setStatus('Error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //debounce
  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchQuery = e.target.value;
  //   setQuery(searchQuery);
  //   // Clear previous timeout
  //   clearTimeout(timeoutId);
  //   // Set new timeout

  //   timeoutId = setTimeout(async () => {
  //     await handleSearch(searchQuery)
  //     inputRef.current?.blur()
  //   }, 2000); // Debounce time (in milliseconds)
  // };

  const handleItemClick = (lat: number, lon: number) => {
    let searchString = `?Latitude=${lat}&Longitude=${lon}`;
    navigation.push(`/${searchString}`);
    currentWeatherUpdate(lat, lon)
    setStatus('');
    setIsInputFocused(false);
    setResults([]);
    inputRef.current?.blur()
    setQuery('')
  };

  const renderSuggestions = () => {
    if (results.length === 0) {
      return <li>No results found</li>;
    }

    return results.map((result, index) => (
      <li className="" key={index} onClick={() => handleItemClick(result.lat, result.lon)}>
        {result.name || ''}{result.name && (result.state || result.country) && ', '}
        {result.state || ''}{result.state && result.country && ', '}
        {result.country || ''}
      </li>
    ));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setResults([]);
    // setQuery('')
    // setStatus('NotOK');
    // inputRef.current?.blur()
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch()
    // Optionally, you can call handleSearch here to trigger the search manually
  };

console.log('isInputFocused', isInputFocused)
console.log('status', status)
console.log('query',query)
  return (

    <>
      <form onClick={handleSubmit}>
        <div className="relative w-full text-black flex items-center">
          <input
            ref={inputRef}
            className="text-black m-2 border-2 border-[black] dark:border-[white] w-[85%]"
            type="text"
            placeholder="Search City"
            value={query}
            onChange={handleInput}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <Button onClick={handleSearch} disabled={loading} className="" onBlur={handleInputBlur}>
            {loading ? 'Searching...' : 'Search'}
          </Button>

          {(status === 'OK' || isInputFocused) && (
          //  {(query || isInputFocused) && (
            <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full p-1">
              <p className="bg-green-200 font-bold">Search Results</p>
              <ul className="">
                {renderSuggestions()}
              </ul>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBox;