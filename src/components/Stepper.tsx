{
  {
    /* <ul className="steps steps-vertical lg:steps-horizontal">
  <li className="step step-primary">Register</li>
  <li className="step step-primary">Choose plan</li>
  <li className="step">Purchase</li>
  <li className="step">Receive Product</li>
</ul> */
  }
}
import "../scss/stepper.css";

export const Stepper = () => {
  return (
    <>
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li className="step step-primary">Register</li>
        <li className="step step-primary">Choose plan</li>
        <li className="step">Purchase</li>
        <li className="step">Receive Product</li>
      </ul>
    </>
  );
};
