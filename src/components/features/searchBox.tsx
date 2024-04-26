

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { searchLocation } from "@/app/api/searchLocation"
import { Button } from "@/components/ui/button"

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

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

  const renderSuggestions = () => {
    if (results.length === 0) {
      return <li>No results found</li>;
    }

    return results.map((result, index) => (
      <li key={index}>{result.name}, {result.state}, {result.country}</li>
    ));
  };

  return (
    <div className="relative w-full md:w-auto md:min-w-[280px] text-black">
      <Input
        className="text-black"
        type="text"
        placeholder="Search City"
        value={query}
        onChange={handleInput}
      />
      <Button onClick={handleSearchClick} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>
      {status === 'OK' && (
        <ul className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;