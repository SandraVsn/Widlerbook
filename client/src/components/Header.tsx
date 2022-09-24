import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className='bg-wcs text-3xl font-bold'>
        <h1 className='py-4 text-white '>
          <Link to='/'>Wilders Book</Link>
        </h1>
        <nav>
          <Link to='/add-wilder'>Add Wilder</Link>
          <Link to='/skills'>Skills</Link>
        </nav>
      </div>
    </header>
  );
}
