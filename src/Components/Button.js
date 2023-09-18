import '../styles/Button.css'

export default function ({ children, onClick, pagination ,disabled}) {
  const className = pagination ? "btn-pagination" : "btn btn-danger";
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
