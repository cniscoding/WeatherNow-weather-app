'use client'

import { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { searchLocation } from "@/app/api/searchLocation"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getWeatherData } from '@/app/api/route'

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
  const searchParams = useSearchParams();
  const [isInputFocused, setIsInputFocused] = useState(false);


  const handleSearchClick = async () => {
    try {
      setLoading(true);
      if (query.trim() !== '') {
        const data = await searchLocation(query);
        setResults(data);
        setStatus('OK');
        console.log("Response:", data); // Log the response
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

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handleItemClick = (lon, lat) => {
    let searchString = `?Longitude=${lon}&Latitude=${lat}`;
    navigation.push(`/${searchString}`);
    const searchLat = searchParams.get('Latitude')
    const searchLong = searchParams.get('Longitude')
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  // const handleSuggestionsBlur = () => {
  //   // Reset results and status when suggestions area loses focus
  //   setIsInputFocused(false);
  //   setResults([]);
  //   setStatus('NotOK');
  // };

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-auto min-w-[280px] text-black flex items-center flex-col justify-center md:flex-row">
      <Input
        className="text-black m-2 sm:min-w-[400px]"
        type="text"
        placeholder="Search City"
        value={query}
        onChange={handleInput}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <Button onClick={handleSearchClick} disabled={loading} className="w-full">
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {(status === 'OK' || isInputFocused) && (
        <div
          className="absolute top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full p-1"
          // onBlur={handleSuggestionsBlur} 
        >
          <p className="bg-green-200 font-bold">Search Results</p>
          <ul className="">
            {renderSuggestions()}
          </ul>
        </div>
      )}


    </form>
  );
};

export default SearchBox;