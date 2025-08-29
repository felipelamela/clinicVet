"use client"
import React from "react";
import { Form, Input, Select, SelectItem, Checkbox, Button } from "@heroui/react";
import Estados from "../../types/states.type";
import getPasswordError from "../../common/validates/validatePassword";
import validateDocument from "../../common/validates/validateDocument";

export default function FormsNewClientComponent() {
  const [password, setPassword] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({
  });

  const newClient = {
    name: "",
    document: "",
    phone: "",
    email: "",
    address: {
      street: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
      complement: "",
    },
    obs: '',
  }



  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const dataValidate = Object.fromEntries(new FormData(e.currentTarget)) as unknown as typeof newClient
    console.log(data);

    // Custom validation checks
    const newErrors = {} as typeof newClient

    // Document validation
    const documentError = validateDocument(dataValidate.document);
    if (documentError) {
      newErrors.document = documentError;
    }


    // Username validation
    if (dataValidate.name === "admin") {
      setErrors({ ...newErrors, name: "Username 'admin' is not allowed" });
      newErrors.name = "Username 'admin' is not allowed";

    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            console.log(validationDetails);
            if (validationDetails.valueMissing) {
              return "Nome completo é obrigatório";
            }
            return errors.name;
          }}
          label="Name"
          labelPlacement="outside"
          name="name"
          placeholder="Nome completo"
        />

        <Input
          isRequired
          errorMessage={({ validationDetails }) => {
            if (validationDetails.valueMissing) {
              return "Please enter your email";
            }
            if (validationDetails.typeMismatch) {
              return "Please enter a valid email address";
            }
          }}
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Input
          isRequired
          errorMessage={getPasswordError(password)}
          isInvalid={
            password.length > 0 && !!getPasswordError(password)
          }
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onValueChange={setPassword}
        />

        <Select
          isRequired
          label="Country"
          labelPlacement="outside"
          name="country"
          placeholder="Select country"
        >
          {Estados.map((state) => (
            <SelectItem key={state.nome}>{state.uf}</SelectItem>
          ))}
        </Select>

        <Checkbox
          isRequired
          classNames={{
            label: "text-small",
          }}
          isInvalid={!!errors.terms}
          name="terms"
          validationBehavior="aria"
          value="true"
          onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
        >
          I agree to the terms and conditions
        </Checkbox>

        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

