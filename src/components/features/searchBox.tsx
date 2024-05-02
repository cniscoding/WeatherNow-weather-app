import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { searchLocation } from '@/app/api/searchLocation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Location {
  name: string;
  state: string;
  country: string;
  lon: number;
  lat: number;
}

interface SearchBoxProps {
  currentWeatherUpdate: (lat: number, lon: number) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ currentWeatherUpdate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigation = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setResults([]);
        setIsInputFocused(false);
        setQuery('')
        setStatus('saf')
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, query]);

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
      setStatus('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (lat: number, lon: number) => {
    let searchString = `?Latitude=${lat}&Longitude=${lon}`;
    navigation.push(`/${searchString}`);
    currentWeatherUpdate(lat, lon);
    setStatus('');
    setIsInputFocused(false);
    setResults([]);
    setQuery('');
  };

  const renderSuggestions = () => {
    if (results.length === 0) {
      return <li>No results found</li>;
    }

    return results.map((result, index) => (
      <li className="" key={index} onClick={() => handleItemClick(result.lat, result.lon)}>
        {result.name || ''} {result.state && (result.name && result.state) && ', '}
        {result.state || ''} {result.country && (result.state && result.country) && ', '}
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
  };

  return (
    <div className="relative w-full text-black flex items-center" ref={inputRef}>
      <Input

        className="text-black m-2 border-2 border-black dark:border-white w-[85%]"
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