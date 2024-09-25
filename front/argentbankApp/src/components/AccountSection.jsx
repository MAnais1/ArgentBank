import PropTypes from "prop-types";

function AccountSection({ accountTitle, accountAmont, accountDescription }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountTitle}</h3>
        <p className="account-amount">{accountAmont}</p>
        <p className="account-amount-description">{accountDescription}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
AccountSection.propTypes = {
  accountTitle: PropTypes.string.isRequired,
  accountAmount: PropTypes.string.isRequired,
  accountDescription: PropTypes.string.isRequired,
};
export default AccountSection;
