import PSubtitle from "../components/PSubtitle";
import H2 from "../components/H2";
import Feature from "../components/Feature";
import icon1 from "../assets/icon-chat.png";
import icon2 from "../assets/icon-money.png";
import icon3 from "../assets/icon-security.png";

function Home() {
  return (
    <div>
      <div className="hero">
        <section className="hero-content">
          <H2 textH2={`Promoted Content`} />
          <PSubtitle textSubtitle={`No fees`} />
          <PSubtitle textSubtitle={`No minimum deposit.`} />
          <PSubtitle textSubtitle={`High interest rates.`} />
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <H2 textH2={`Features`} />
        <Feature
          srcImg={icon1}
          altImg={`Chat Icon`}
          titleH3={`You are our #1 priority`}
          textP={`Need to talk to a representative? You can get in touch through our
        24/7 chat or through a phone call in less than 5 minutes.`}
        />
        <Feature
          srcImg={icon2}
          altImg={`Chat Icon`}
          titleH3={`More savings means higher rates`}
          textP={`The more you save with us, the higher your interest rate will be!`}
        />
        <Feature
          srcImg={icon3}
          altImg={`Chat Icon`}
          titleH3={`Security you can trust`}
          textP={`We use top of the line encryption to make sure your data and money
        is always safe.`}
        />
      </section>
    </div>
  );
}

export default Home;
