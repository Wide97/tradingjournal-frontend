export default function PrimaryButton({ text, onClick, disabled = false, type = "button" }) {
  return (
    <button className="btn" onClick={onClick} disabled={disabled} type={type}>
      {text}
    </button>
  );
}
