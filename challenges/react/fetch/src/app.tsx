import { useState } from "react";

import { UsersWithUseFetch } from "#/components/users-with-use-fetch.tsx";
import { UsersWithUse } from "#/components/users-with-use.tsx";

import { BROKEN_URL, USERS_URL } from "./api.ts";

const App = () => {
  const [shouldFail, setShouldFail] = useState(false);
  const url = shouldFail ? BROKEN_URL : USERS_URL;

  return (
    <main>
      <h1>Fetch challenge</h1>

      <label>
        <input
          type="checkbox"
          checked={shouldFail}
          onChange={(e) => setShouldFail(e.target.checked)}
        />
        Simulate a failed request
      </label>

      <div className="solutions">
        <section>
          <h2>
            Custom <code>useFetch</code> hook
          </h2>
          <UsersWithUseFetch url={url} />
        </section>

        <section>
          <h2>
            React <code>use</code> hook
          </h2>
          <UsersWithUse url={url} />
        </section>
      </div>
    </main>
  );
};

export default App;
