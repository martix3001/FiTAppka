import { useNavigate } from "react-router";

interface PageNavigationButtonProps {
  direction: "next" | "previous";
  //Ścieżka do strony, do której ma prowadzić przycisk
  // Można użyć np. "/page2" lub "/page3"
  to: string; 
}

export default function PageNavigationButton({
  direction,
  to,
}: PageNavigationButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {direction === "next" ? "Next Page" : "Previous Page"}
    </button>
  );
}