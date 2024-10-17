import React, { FormEvent, useState } from "react";
import classNames from "classnames";
import "./password.css";
import { Button } from "../Button";
import { Input } from "../Input";
import {
  IconCheck,
  IconVisible,
  IconVisibleOff,
  IconX,
} from "../../assets/icon";
import { string } from "prop-types";

// This config object would be stored in some other file with other configs making it easy to edit without having to change component code.
export interface PasswordRequirementProps {
  /** requirment name used to keep track of which requirements have passed */
  name: string;
  /** Text for requirement */
  text: string;
  /* Function used to validate the requirement */
  isValid: (value: string) => boolean;
}

export const defaultRequirments: PasswordRequirementProps[] = [
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
 * String config for internationalization support
 */
export interface StringMapProps {
  alertDefault: string;
  alertFail: string;
  alertMatchFail: string;
  alertSuccess: string;
  confirmPassword: string;
  password: string;
  requirements: string;
  showConfirmPassword: string;
  showPassword: string;
  submit: string;
}

export const defaultStringMap = {
  alertDefault: "Please enter a password.",
  alertFail: "Passwords are not valid.",
  alertMatchFail: "Passwords do not match.",
  alertSuccess: "Success! Your passwords are valid.",
  confirmPassword: "Confirm Password",
  password: "Password",
  requirements: "Requirements",
  showConfirmPassword: "Toggle Confirm Password Visibility",
  showPassword: "Toggle Password Visibility",
  submit: "Submit",
};

export interface PasswordProps {
  /** Config object for password requirements and text   */
  requirements: PasswordRequirementProps[];
  /** String map for internationalization   */
  stringMap: StringMapProps;
}

/**
 * Standalone Password Component . Includes several components that comprise a password and confirm password pattern including validation. Fully accessible.
 */
export const Password = ({
  stringMap = defaultStringMap,
  requirements = defaultRequirments,
}: PasswordProps) => {
  const [arePasswordsValid, setArePasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [passedChecks, setPassedChecks] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    requirements.map((value) => {
      const currentTestName = value.name;
      const isValueInPassed = passedChecks.includes(currentTestName);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setArePasswordValid(false);

    // We already validated password in real time however we are not disabling the
    // submit button so they may have clicked submit with an invalid password meaning we need to test again.
    // no need to test confirmPassword as long as passwords match
    validatePassword(password);

    if (
      passedChecks.length === requirements.length &&
      password === confirmPassword
    ) {
      setArePasswordValid(true);
    }
  };

  // If they got and error after submitting then start editing again clear out form submit to remove notification
  const clearFormSubmitted = () => isFormSubmitted && setIsFormSubmitted(false);

  const getNotificationContent = () => {
    if (!isFormSubmitted) {
      return stringMap.alertDefault;
    }

    return arePasswordsValid
      ? stringMap.alertSuccess
      : password !== confirmPassword
      ? stringMap.alertMatchFail
      : stringMap.alertFail;
  };

  return (
    <form onSubmit={handleSubmit} className="Password">
      <div
        aria-live="assertive"
        role="alert"
        className={classNames({
          "Password-notification": true,
          "Password-notificationSuccess": arePasswordsValid && isFormSubmitted,
          "Password-notificationFail": !arePasswordsValid && isFormSubmitted,
        })}
      >
        {getNotificationContent()}
      </div>
      <div className="Password-row">
        <div className="Password-cell">
          <div className="Password-inputRow">
            <Input
              label={
                <>
                  <div>{stringMap.password}</div>
                  <Button
                    className="Password-visibilityButton"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={stringMap.showPassword}
                  >
                    {showPassword ? IconVisible : IconVisibleOff}
                  </Button>
                </>
              }
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                clearFormSubmitted();
                setPassword(event.target.value);
                // Realtime feedback on your passsword is more useful to the user vs typing two passwords and doing them both wrong and having to start over.
                validatePassword(event.target.value);
              }}
            />
          </div>
          <div className="Password-inputRow">
            <Input
              label={
                <>
                  <div>{stringMap.confirmPassword}</div>
                  <Button
                    className="Password-visibilityButton"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={stringMap.showConfirmPassword}
                  >
                    {showConfirmPassword ? IconVisible : IconVisibleOff}
                  </Button>
                </>
              }
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => {
                clearFormSubmitted();
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          <Button
            type="submit"
            variant="Primary"
            className="Password-submitButton"
          >
            {stringMap.submit}
          </Button>
        </div>
        <div className="Password-cell">
          {stringMap.requirements}
          <ul className="Password-instructions">
            {requirements.map((value) => {
              const requirementPassed = passedChecks.includes(value.name);
              return (
                <li
                  key={value.name}
                  className={classNames({
                    "Password-requirementValid": requirementPassed,
                  })}
                >
                  {requirementPassed ? IconCheck : IconX}
                  {value.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </form>
  );
};
