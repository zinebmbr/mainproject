const Form = ({ onSubmit, children, className }) => {
  return (
    <div
      className={className}
      onSubmit={(event) => {
        event.preventDefault(); // Prevent default form submission
        onSubmit(event);
      }}
    >
      {children}
    </div>
  );
};

export default Form;