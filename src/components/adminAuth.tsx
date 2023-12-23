"use client"
import { useAdminAuth } from '@/app/(components)/AdminAuthProvider';
import { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import localFont from "next/font/local";
import { BsHeartFill } from 'react-icons/bs';
import Spinner from './spinner';
import Loading from '@/app/loading';
import Header from './header';
import Link from 'next/link';

export default function AdminAuth() {
    const [input, setInput] = useState('');
    const { isAuthenticated, setPinCode } = useAdminAuth();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isCookieLoaded, setIsCookieLoaded] = useState(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };
    useEffect(() => {
        const existingPinCookie = document.cookie.replace(/(?:(?:^|.*;\s*)adminPin\s*=\s*([^;]*).*$)|^.*$/, "$1");
        if (existingPinCookie) {
            setInput(existingPinCookie)
            setPinCode(existingPinCookie)
        }
        setIsCookieLoaded(true)
    }, []);
    const comparePassword = useQuery(api.passwords.compareToAdminPassword, { password: input });

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
    return (<><Header />

        <div className={
            "py-28 px-2 flex flex-col items-center justify-center max-w-xl	m-auto"
        }>


            <div className={`flex flex-col gap-4 w-full `}>
                <p className='text-2xl text-center'>Wpisz hasło aby zalogować się do panelu administratora!</p>
                <input type="number" className={`border-primary 
          px-2 py-4 
          text-3xl 
          text-center
          bg-primary 
          focus:outline-orange-400
            w-full
          `} value={input} onChange={handleInputChange} />
                {isError && <p className='text-red-500 text-2xl font-bold'>{errorMessage}</p>}
                <button className='border-primary px-2 py-4 text-3xl bg-orange-300' onClick={handleSubmit}>Zaloguj się!</button>
                <span className=' px-2 py-4 text-xl text-center'>Zabłądziłeś? <Link className='underline' href="/">Powrót do strony głównej</Link></span>
            </div>
        </div></>
    );
}
