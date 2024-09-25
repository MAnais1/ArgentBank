import PropTypes from 'prop-types';

function PSubtitle({textSubtitle}){
    return(
        <p className="subtitle">{textSubtitle}</p>
    );
}
PSubtitle.propTypes = {
    textSubtitle: PropTypes.string.isRequired
  }

export default PSubtitle;