import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { logIn } from "../../services/userService";
// import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Please enter valid email address." })
    .min(3),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  // let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      await logIn(formData);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status == 400) {
        console.log(err.response);
        setFormError(err.response.data.message);
      }
    }
  };

  //   console.log(formState.errors);

  return (
    <section className="align_center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your Email address"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Phone Number</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
