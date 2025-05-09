export default function PrimaryButton({
  text,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
