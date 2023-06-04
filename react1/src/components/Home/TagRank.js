import { useEffect, useState } from 'react';

const TagRank = () => {
    const [tags, setTags] = useState([]);
    useEffect(() => {
      const savedTags = JSON.parse(localStorage.getItem('save')) || [];
      let flattenedTags = savedTags;
  if (savedTags.length > 0 && Array.isArray(savedTags[0])) {
    flattenedTags = savedTags.flat();
  }

  setTags(flattenedTags);
    }, []);
    
    const tagFrequency = {};
    for (const tag of tags) {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    }
    const sortedTags = Object.entries(tagFrequency).sort((a, b) => b[1] - a[1]);
  
    return (
      <div>
        <h1>검색 랭킹</h1>
        <ol>
        {sortedTags.map(([tag], index) => (
            <li>{tag}</li>
        ))}
        </ol>
      </div>
    );
  };

export default TagRank;