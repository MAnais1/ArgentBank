import PropTypes from "prop-types";

function H2({ textH2 }) {
  return <h2 className="sr-only">{textH2}</h2>;
}
H2.propTypes = {
  textH2: PropTypes.string.isRequired,
};
export default H2;
