const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <hr className="mt-5 mb-4" />
      <span className="text-center text-md me-2">
        Created and opened sourced by{' '}
        <a
          href="https://github.com/emiluzelac"
          className="text-muted"
          target="_blank"
          rel="noopener"
        >
          Emil Uzelac
        </a>
      </span>
      <span className="badge bg-dark-subtle text-dark-emphasis rounded-pill">
        v0.1.0
      </span>
    </footer>
  )
}

export default Footer
