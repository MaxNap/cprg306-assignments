import Link from "next/link";

export default function Home() {
  let linkStyle =
    "text-white bg-blue-500 hover:bg-blue-700 font-bold py-4 px-8 rounded";

  return (
    <main className="p-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-5">
        CPRG 306: Web Development 2 - Assignments
      </h1>
      <ul className="space-y-8">
        <li>
          <Link href="./week-2/" className={linkStyle}>
            Week-2 Page
          </Link>
        </li>
        <li>
          <Link href="./week-3/" className={linkStyle}>
            Week-3 Page
          </Link>
        </li>
        <li>
          <Link href="./week-4/" className={linkStyle}>
            Week-4 Page
          </Link>
        </li>
        <li>
          <Link href="./week-5/" className={linkStyle}>
            Week-5 Page
          </Link>
        </li>
        <li>
          <Link href="./week-6/" className={linkStyle}>
            Week-6 Page
          </Link>
        </li>
        <li>
          <Link href="./week-7/" className={linkStyle}>
            Week-7 Page
          </Link>
        </li>
        <li>
          <Link href="./week-8/" className={linkStyle}>
            Week-8 Page
          </Link>
        </li>
        <li>
          <Link href="./week-9/" className={linkStyle}>
            Week-9 Page
          </Link>
        </li>
        <li>
          <Link href="./week-10/" className={linkStyle}>
            Week-10 Page
          </Link>
        </li>
      </ul>
    </main>
  );
}
