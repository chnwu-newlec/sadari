"use client";

import { FormEvent, useState } from "react";

interface AuthFormProps {}

export default function AuthForm({}: AuthFormProps) {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/pick", {
      method: "POST",
      body: JSON.stringify({
        pwd: input,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.status.toString());

        setError("");

        return res.json();
      })
      .then(({ name }) => {
        setName(name);
      })
      .catch((e) => {
        if (e.message === "401") {
          setError("invalid code");
        }
      });
  }

  return (
    <form method="POST" onSubmit={handleSubmit} className="my-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="h-8 pl-1 rounded-lg border bd-default bg-white"
          onChange={handleInput}
        />
        <button
          type="submit"
          className="flex items-center justify-center h-8 px-4 py-1 bg-white border bd-default rounded-lg">
          pick
        </button>
      </div>
      {name && (
        <div className="flex justify-center mt-10">
          <span className="text-3xl font-bold">{name} 🥳</span>
        </div>
      )}
      {error && (
        <div>
          <span className="text-red-600">{error}</span>
        </div>
      )}
    </form>
  );
}
