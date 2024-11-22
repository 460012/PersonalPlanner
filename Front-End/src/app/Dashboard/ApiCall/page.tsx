"use client"; // This is a client component 👈🏽

import DataComponent from "./ApiCall";

export default function page() {
return (
    <main>
      <div>
        <p>
          Get started by editing this page&nbsp;
        </p>
      </div>

      <DataComponent />
    </main>
  );
}
