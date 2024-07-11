function Input({type, placeholder, value, onChange}) {
    return (
      <input
        className="search"
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
}

export default Input
