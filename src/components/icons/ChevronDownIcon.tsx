export const ChevronDownIcon = ({ rotated }: { rotated?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: rotated ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
