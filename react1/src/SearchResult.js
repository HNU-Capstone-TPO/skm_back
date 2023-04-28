import React from 'react';

function SearchResult({ results }) {
  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <h2>{result.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;