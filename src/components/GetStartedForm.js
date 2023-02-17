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
          resetField("company");
          resetField("email");
          //setMessage("Thank you, follow your email!");
        } catch (e) {
          console.log("Err", e);
          setMessage("Oh, something went wrong. Try again.");
        }
      })}
      className="flex w-full max-w-[440px]"
    >
      <div className="!hidden">
        <label className="text-[14px] text-[#ffffff80]">
          Company (optional)
        </label>
        <input
          name="company"
          type="text"
          {...register("company", { required: false })}
          className="rounded-[4px] border-[1px] border-[#333375] bg-[#333375] p-[10px] mb-[10px] h-[50px] text-white outline-none"
        />
      </div>
      <div className="flex flex-col w-full">
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="rounded-[4px] border-[1px] border-[#333375] bg-[#333375] p-[10px] h-[50px] text-white outline-none"
        />

        {errors.email && (
          <span className="text-[13px] text-[#ffffff90]">
            This field is required
          </span>
        )}
      </div>
      <button
        //onClick={(e) => handleOnSubmit(e)}
        type="submit"
        className="text-primary bg-white rounded-sm w-full h-[50px] flex items-center justify-center uppercase tracking-wide font-medium ml-[5px] max-w-[160px] opacity-90 hover:opacity-100"
      >
        Get started
      </button>
      {message && <p className="pt-[5px] text-[15px]">{message}</p>}
    </form>
  );
};
