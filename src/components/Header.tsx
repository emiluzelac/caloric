import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="d-flex justify-content-between align-items-md-center pb-3 mb-5 border-bottom">
      <h1 className="h5">
        <Link
          href="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="me-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 12h2a2 2 0 1 0 0 -4h-2v8"></path>
            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
          </svg>
          <span>Pavlidou Caloric Calculator</span>
        </Link>
      </h1>
      <a
        href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9967803/"
        className="btn btn-sm btn-secondary d-inline-flex align-items-center"
        target="_blank"
        rel="noopener"
      >
        View Study
      </a>
    </header>
  );
};

export default Header;
