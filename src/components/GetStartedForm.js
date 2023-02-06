import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitToNetlify } from "../hooks/submitToNetlify";

const formName = "Get Started EN";
const success = "Thanks, we'll contact you soon.";

export const GetStartedForm = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      name={formName}
      data-netlify="true"
      method="POST"
      onSubmit={handleSubmit((data, e) => {
        try {
          submitToNetlify(data, e);
          resetField("email");
          //setMessage("Thank you, follow your email!");
        } catch (e) {
          console.log("Err", e);
          setMessage("Oh, something went wrong. Try again.");
        }
      })}
      className="flex flex-col w-full max-w-[340px]"
    >
      <label className="text-[14px] text-[#ffffff80]">Email</label>
      <input
        name="email"
        type="email"
        {...register("email", { required: true })}
        className="rounded-[4px] border-[1px] border-[#333375] bg-[#333375] p-[10px] h-[50px] text-white outline-none"
      />

      {errors.email && (
        <span className="text-[13px] text-[#ffffff90]">
          This field is required
        </span>
      )}
      <button
        //onClick={(e) => handleOnSubmit(e)}
        type="submit"
        className="text-primary bg-white rounded-sm w-full h-[58px] flex items-center justify-center uppercase tracking-wide font-medium mt-[20px]"
      >
        Get started
      </button>
      {message && <p className="pt-[5px] text-[15px]">{message}</p>}
    </form>
  );
};
