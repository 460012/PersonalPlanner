"use client"; // This is a client component 👈🏽

import DataComponent from "./ApiCall";

export default function Page() {
return (
    <main>
      <div>
        <p>
          Teams page&nbsp;
        </p>
      </div>

      <DataComponent />
    </main>
  );
}
