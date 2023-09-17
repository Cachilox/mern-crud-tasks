interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  name: string
}

const Button = ({ onClick, children, name }: ButtonProps) => {
  let buttonStyle;
  if(name === "delete") {
    buttonStyle = "bg-red-500 px-4 py-2 my-2 rounded-md disabled:bg-indigo-300"
  }else {
    buttonStyle = "bg-sky-600 px-4 py-2 rounded-md mt-4"
  }
  return (
    <button
      onClick={onClick}
      className={buttonStyle}
    >
      {children}
    </button>
  );
};

export default Button;
