import React, { useState } from "react";
import PropTypes from "prop-types";

import "./password.css";
import { Button } from "./Button";
import { Input } from "./Input";
import { IconX } from "./IconX";
import { IconCheck } from "./IconCheck";

// This config object would be stored in some other file with other configs
//  making it easy to edit without having to change this code.
interface PasswordRequirementProps {
  name: string;
  text: string;
  isValid: (value: string) => boolean;
}

const REQUIREMENTS: PasswordRequirementProps[] = [
  {
    name: "length",
    text: "6 characters minimum.",
    isValid: (value) => value.length > 6,
  },
  {
    name: "upperCase",
    text: "1 uppercase character.",
    isValid: (value) => /[A-Z]/.test(value),
  },
  {
    name: "lowerCase",
    text: "1 lowercase character.",
    isValid: (value) => /[a-z]/.test(value),
  },
  {
    name: "number",
    text: "1 number.",
    isValid: (value) => /\d/.test(value),
  },
  {
    name: "special",
    text: "1 special character.",
    isValid: (value) => /[*@!#%&()^~{}]+/.test(value),
  },
];

/**
 * Pass in a string object for internationalization, because we merge the objects
 * you only need to pass in the one you want changed (although you would probably pass them all in)
 * ex: stringMap = {submit: 'Presentar'}
 */
const defaultStringMap = {
  confirmPassword: "Confirm Password",
  password: "Password",
  passwordFail: "Your passwords are not valid!",
  passwordSuccess: "Your passwords are valid!",
  requirements: "Requirements",
  submit: "Submit",
};

interface PasswordProps {
  /** String map for internationalization   */
  stringMap: {};
}

/**
 * Password Component Pattern. Includes several components that comprise a password and confirm password pattern including validation.
 */
export const Password = ({ stringMap }: PasswordProps) => {
  const mergedStringMap = { ...defaultStringMap, ...stringMap };

  const [arePasswordsValid, setArePasswordValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passedChecks, setPassedChecks] = useState<string[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validatePassword = (password: string) => {
    REQUIREMENTS.map((value) => {
      const currentTestName: string = value.name;
      const isValueInPassed: boolean = passedChecks.includes(currentTestName);

      // Add valid value
      if (value.isValid(password) && !isValueInPassed) {
        setPassedChecks((passedChecks) => [...passedChecks, currentTestName]);
      }

      // Remove previous valid value that is no longer valid
      if (!value.isValid(password) && isValueInPassed) {
        setPassedChecks(
          passedChecks.filter(function (passedValue) {
            return passedValue !== currentTestName;
          })
        );
      }
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsFormSubmitted(true);

    // We already validated password in real time however we are not disabling the
    // submit button so they may have clicked submit with an invalid password meaning we need to test again.
    validatePassword(password); // no need to test confirmPassword as long as passwords match

    if (
      passedChecks.length === REQUIREMENTS.length &&
      password === confirmPassword
    ) {
      setArePasswordValid(true);
    }
  };

  // Realtime feedback on your passsword is more useful to the user vs typing two
  // passwords and doing them both wrong and having to start over.
  const realtimeValidaton = (value: string) => {
    validatePassword(value);
  };

  // We are only going to show the success/fail validation message after the form is submitted
  // Because its annoying when you are still typing the first password and there is a message saying "You're passwords don't match"
  const getValidationMessage = () => {
    if (!isFormSubmitted) {
      return null;
    }

    return (
      <div>
        {arePasswordsValid
          ? mergedStringMap.passwordSuccess
          : mergedStringMap.passwordFail}
      </div>
    );
  };

  return (
    <div className="password">
      <div className="form">
        {getValidationMessage()}
        <form onSubmit={handleSubmit}>
          <Input
            label={mergedStringMap.password}
            type="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              realtimeValidaton(event.target.value);
              setPassword(event.target.value);
            }}
          />

          <br />
          <Input
            label={mergedStringMap.confirmPassword}
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <Button type="submit" label={mergedStringMap.submit} />
        </form>
      </div>
      <div className="instructions">
        {mergedStringMap.requirements}
        <ul>
          {REQUIREMENTS.map((value) => {
            const requirementPassed = passedChecks.includes(value.name);
            return (
              <li key={value.name} className={requirementPassed ? "valid" : ""}>
                {requirementPassed ? IconCheck : IconX}
                {value.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
