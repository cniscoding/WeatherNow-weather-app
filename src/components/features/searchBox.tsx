import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { searchLocation } from "@/app/api/searchLocation";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from 'next/navigation';

interface Location {
  name: string;
  state: string;
  country: string;
  lon: number;
  lat: number;
}

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (query.trim() !== '') {
        const data = await searchLocation(query);
        setResults(data);
        setStatus('OK');
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (lon: number, lat: number) => {
    let searchString = `?Longitude=${lon}&Latitude=${lat}`;
    navigation.push(`/${searchString}`);
    const newUrl = window.location.origin + '/' + searchString;
    window.location.href = newUrl;
  };

  const renderSuggestions = () => {
    if (results.length === 0) {
      return <li>No results found</li>;
    }

    return results.map((result, index) => (
      <li key={index} onClick={() => handleItemClick(result.lon, result.lat)}>
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
    setStatus('NotOK');
  };

  return (
    
    <div className="relative w-full text-black flex items-center">
      <Input
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
        <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full p-1">
          <p className="bg-green-200 font-bold">Search Results</p>
          <ul className="">
            {renderSuggestions()}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;