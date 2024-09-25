import PropTypes from "prop-types";

function Input({
  classDiv,
  forLabel,
  textLabel,
  typeInput,
  idInput,
  value,
  onChange,
  classInput,
}) {
  return (
    <div className={classDiv}>
      <label htmlFor={forLabel}>{textLabel}</label>
      <input type={typeInput} id={idInput} value={value} onChange={onChange} className={classInput} />
    </div>
  );
}
Input.propTypes = {
  classDiv: PropTypes.string.isRequired,
  forLabel: PropTypes.string.isRequired,
  textLabel: PropTypes.string.isRequired,
  typeInput: PropTypes.string.isRequired,
  idInput: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, 
  onChange: PropTypes.func.isRequired,
  classInput: PropTypes.string.isRequired,
};
export default Input;
