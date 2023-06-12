import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
         <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
         <div>
          <form>
            <input type="text" placeholder="Enter text..." />
            <input type="number" placeholder="Enter amount..." />
          </form>
         </div>
      </div>
    </main>
  )
}
