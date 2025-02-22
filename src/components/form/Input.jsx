import styles from "./input.module.css";

const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
  max,
  maxLength
}) => {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? {multiple} : '')}
        max={max}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
