import { useEffect, useState } from "react";
import FormError from "commons/formFields/FormError";
import TickIcon from "assets/images/icons/remove.png";
import TickGreen from "assets/images/icons/check-green.png";

import { VALID_PASSWORD_REGEX } from "commons/regex";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
const FormPassword = ({
  label,
  htmlFor,
  placeholder,
  register,
  rules,
  errors,
  name,
  passwordValue,
  isConfirmPassword,
  confirmPasswordMessage,
  dirtyFields,
  trigger,
    cPasswordValue,
}) => {
  if (isConfirmPassword === true) {
    rules.validate = value => value === passwordValue || confirmPasswordMessage;
  }

  useEffect(() => {
    dirtyFields &&
      dirtyFields[name] &&
      passwordValue &&
      isConfirmPassword &&
      trigger([name]);
  }, [passwordValue]);

  const { ref, ...rest } = register(name, rules);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <>
      <div className="form-group">
        {label ? (
          <label className="form-label cu-form-label" htmlFor={htmlFor}>
            {label}{" "}
          </label>
        ) : null}
        <div className="signup-password">
        <InputGroup>
          <Input
                        ref={ref}
            name={name}
            type={show ? "text" : "password"}
            placeholder={placeholder ? placeholder : "············"}
            className={
              errors[name]?.message ? "form-control required" : "form-control"
            }
            {...(label && htmlFor
              ? {
                  id: htmlFor,
                }
              : {})}
            {...rest}
          />
          
            {dirtyFields && dirtyFields[name] && (
              <div className="tick-icon">
                <>
                  {isConfirmPassword ? (
                    <img
                      alt="checkmark"
                      src={
                        errors[name] ||
                        !VALID_PASSWORD_REGEX.test(cPasswordValue) ||
                        cPasswordValue !== passwordValue
                          ? TickIcon
                          : TickGreen
                      }
                      className="tickicon image-fluid"
                    />
                  ) : (
                    <img
                      alt="checkmark"
                      src={
                        errors[name] ||
                        !VALID_PASSWORD_REGEX.test(passwordValue)
                          ? TickIcon
                          : TickGreen
                      }
                      className="tickicon image-fluid"
                    />
                  )}
                </>
              </div>
            )}
          
          <InputRightElement h={"full"}>
            <Button variant={"ghost"} onClick={toggle}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
</div>

        <FormError msg={errors[name]?.message} />
      </div>
    </>
  );
};

export default FormPassword;
