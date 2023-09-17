import { Link } from "react-router-dom";
interface ButtonLinkProps {
  to: string;
  children: React.ReactNode;
}

const ButtonLink = ({ to, children }: ButtonLinkProps) => {
  return (
    <Link to={to} className="bg-indigo-500 px-4 py-2 my-2 rounded-md">
      {children}
    </Link>
  );
};

export default ButtonLink;
