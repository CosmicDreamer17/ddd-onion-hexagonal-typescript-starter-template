'use client';

import { hc } from 'hono/client';
import type { AppType } from '@starter/api';
import { useState } from 'react';

const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000');

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await client.api.register.$post({
      json: { email, name },
    });

    if (res.ok) {
      const { user } = await res.json();
      setMessage(`Successfully registered: ${user.name}`);
    } else {
      const err = await res.json();
      setMessage(`Error: ${err.error || 'Registration failed'}`);
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Email: </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
        </div>
        <div>
          <label>Name: </label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
