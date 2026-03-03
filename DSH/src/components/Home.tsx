import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home">
      <h1 className="home__title">To čubrním</h1>
      <div className="home__actions">
        <Link to="/viewer" className="dsh-button home__btn">
          Začít stavět
        </Link>
        <a href="#" className="dsh-button home__btn" onClick={(e) => e.preventDefault()}>
          Stáhnout PDF
        </a>
      </div>
    </main>
  );
}
