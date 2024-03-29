"use client"
import { useUserAuth } from '@/app/(components)/UserAuthProvider';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import localFont from "next/font/local";
import { BsHeartFill } from 'react-icons/bs';
import Spinner from './spinner';
import Loading from '@/app/loading';

const rosaline = localFont({ src: "../fonts/RosalineSignature.ttf" });

export default function UserAuth() {
  const [input, setInput] = useState('');
  const { isAuthenticated, setPinCode } = useUserAuth();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCookieLoaded, setIsCookieLoaded] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  useEffect(() => {
    const existingPinCookie = document.cookie.replace(/(?:(?:^|.*;\s*)guestPin\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (existingPinCookie) {
      setInput(existingPinCookie)
      setPinCode(existingPinCookie)
    }
    setIsCookieLoaded(true)
  }, []);
  const comparePassword = useQuery(api.passwords.compareToGuestPassword, { password: input });

  const handleSubmit = () => {
    setIsError(false)
    if (input.length === 0) {
      setIsError(true);
      setErrorMessage('Uzupełnij kod PIN!')
      return;
    }
    if (comparePassword) {
      setPinCode(input);
    } else {
      setIsError(true);
      setErrorMessage('Niepoprawny kod PIN!')
    }
  };
  if (!isCookieLoaded) return <Loading />
  return (
    <div className={
      "py-28 px-2 flex flex-col items-center justify-center max-w-xl	m-auto"
    }>


      <div className={`flex flex-col gap-4 w-full `}>
        <div className={`flex gap-3 text-7xl items-center justify-center ${rosaline.className}`}>
          Anna <BsHeartFill className={"text-4xl"} /> Alekasander
        </div>
        <p className='text-2xl text-center'>Witaj w cyfrowej księdze gości! Aby się zalogować wpisz poniżej kod PIN!</p>
        <input type="password" className={`border-primary 
          px-2 py-4 
          text-3xl 
          text-center
          bg-primary 
          focus:outline-orange-400
            w-full
          `} value={input} onChange={handleInputChange} />
        {isError && <p className='text-red-500 text-2xl font-bold'>{errorMessage}</p>}
        <button className='border-primary px-2 py-4 text-3xl bg-orange-300' onClick={handleSubmit}>Zaloguj się!</button>
        <p className='text-xl text-center'>Włączone pliki cookies pozwalają na automatyczne logowanie do aplikacji, jeśli tylko podasz raz poprawnie kod PIN!</p>

      </div>
    </div>
  );
}
