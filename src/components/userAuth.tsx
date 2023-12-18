"use client"
import { useUserAuth } from '@/app/(components)/UserAuthProvider';
import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'next/navigation'

export default function UserAuth() {
  const [input, setInput] = useState('');
  const { isAuthenticated, setPinCode } = useUserAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const comparePassword = useQuery(api.passwords.compareToGuestPassword, { password: input });
  const router = useRouter()

  console.log(isAuthenticated)
  const handleSubmit = () => {
    console.log(comparePassword)
    if (comparePassword) {
      setPinCode(input);
      //router.push("/songbook")
    }
  };

  return (
    <div>
      <input type="password" value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
