import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "components/common/Layout";
import { Form, useForm } from "react-hook-form";
import FormPassword from "commons/formFields/FormPassword";
import {
  ConfirmPasswordRules,
  EmailRules,
  FirstNameRules,
  LastNameRules,
  PasswordRules,
} from "commons/rules";
import { msg } from "commons/messages";
import FormInput from "commons/formFields/FormInput";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    formState: { errors, dirtyFields },
  } = useForm();

  //get passwords
  const passwordValue = watch("password");
  const cPasswordValue = watch("confirmPassword");

  const onSubmit = data => console.log(data);

  const firstName = (
    <Box>
      <FormInput
        name={"fName"}
        id={"firstName"}
        type={"text"}
        label={"First Name :"}
        register={register}
        rules={FirstNameRules}
        errors={errors}
        isRequired={true}
      />
    </Box>
  );

  const lastName = (
    <Box>
      <FormInput
        name="lname"
        id={"lastName"}
        type={"text"}
        label={"Last Name:"}
        register={register}
        rules={LastNameRules}
        errors={errors}
      />
    </Box>
  );

  const email = (
    <Box>
      <FormInput
        name="email"
        id={"email"}
        type={"email"}
        label={"Email:"}
        register={register}
        rules={EmailRules}
        errorMsg={errorEmailMessage}
        errors={errors}
        isRequired={true}
      />
    </Box>
  );

  const passwords = (
    <>
      <FormPassword
        name="password"
        label="Password:"
        type="password"
        id="password"
        placeholder=""
        autoFocus={false}
        register={register}
        rules={PasswordRules}
        errors={errors}
        dirtyFields={dirtyFields}
        passwordValue={passwordValue}
      />
      <FormPassword
        cPasswordValue={cPasswordValue}
        confirmPasswordMessage={msg.passwordNotMatch}
        name="confirmPassword"
        label="Confirm Password:"
        type="password"
        id="confirmPassword"
        placeholder=""
        autoFocus={false}
        register={register}
        rules={ConfirmPasswordRules}
        errors={errors}
        isConfirmPassword={true}
        passwordValue={passwordValue}
        dirtyFields={dirtyFields}
        trigger={trigger}
      />
    </>
  );

  const userName = (
    <HStack>
      {firstName}
      {lastName}
    </HStack>
  );

  return (
    <Layout>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Form onSubmit={handleSubmit(onSubmit)} control={control}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                {userName}
                {email}
                {passwords}
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Form>
        </Stack>
      </Flex>
    </Layout>
  );
}
