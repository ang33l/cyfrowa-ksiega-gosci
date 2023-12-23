import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex items-center justify-center flex-col h-[100dvh]'>
            <h2>Not found</h2>
            <p>Nie udało się odnaleźć strony o tym adresie</p>
            <Link className='px-4 py-2 rounded-md bg-orange-200' href="/">Powrót do strony głównej</Link>
        </div>
    )
}