import PropTypes from 'prop-types';

function Feature({ srcImg, altImg, titleH3, textP }) {
    return (
      <div className="feature-item">
        <img src={srcImg} alt={altImg} className="feature-icon" />
        <h3 className="feature-item-title">{titleH3}</h3>
        <p>{textP}</p>
      </div>
    );
  }
Feature.propTypes = {
    srcImg: PropTypes.string.isRequired,
    altImg: PropTypes.string.isRequired,
    titleH3: PropTypes.string.isRequired,
    textP: PropTypes.string.isRequired,
    
  }

  export default Feature;
  