import { useState } from "react";
import OtpInput from "./components/OtpInput/otp-input";

const App: React.FC = () => {
  const [otpInput, setOtpInput] = useState("");

  const onChange = (value: string) => setOtpInput(value);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert(`otp-code: ${otpInput}`);
  }

  return (
    <div className="wrapper">
      <div className="heading">
        <h2>OTP Verification</h2>
        <p>Please enter the code we have sent you.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="otp-container">
          <OtpInput
            length={6}
            type="tel"
            autoFocus={true}
            value={otpInput}
            onChange={onChange}
            className="otp-number"
          />
        </div>
        <input
          type="submit"
          value="Submit"
          disabled={otpInput.trim().length !== 6}
        />
      </form>
    </div>
  );
};

export default App;
