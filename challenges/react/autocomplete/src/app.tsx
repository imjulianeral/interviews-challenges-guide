import { useState } from "react";

import { useDebounce } from "#/hooks/debounce.ts";

const values = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
];

const App = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {values
          .filter((value) =>
            value.toLowerCase().includes(debouncedSearch.toLowerCase())
          )
          .map((value) => (
            <li key={value}>{value}</li>
          ))}
      </ul>
      <section id="center">
        <p>Debounced Search: {debouncedSearch}</p>
      </section>
      <section id="center">
        <p>Actual Search: {search}</p>
      </section>
    </>
  );
};

export default App;
