import React from "react";
import { useForm } from "react-hook-form";
import { submitToNetlify } from "../hooks/submitToNetlify";

const formName = "Get Started EN";
const success = "Thanks, we'll contact you soon.";

export const GetStartedForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(watch("email"));

  return (
    <form
      name={formName}
      data-netlify="true"
      method="POST"
      onSubmit={handleSubmit(submitToNetlify)}
      className="flex flex-col w-full max-w-[340px]"
    >
      <label className="text-[14px] text-[#ffffff80]">Email</label>
      <input
        name="email"
        type="email"
        {...register("email", { required: true })}
        className="rounded-[4px] border-[1px] border-[#333375] bg-[#333375] p-[10px] h-[50px] outline-none"
      />

      {errors.email && (
        <span className="text-[13px] text-[#ffffff90]">
          This field is required
        </span>
      )}
      <button
        //onClick={(e) => handleOnSubmit(e)}
        type="submit"
        className="btn white w-full mt-[20px] "
      >
        Get started
      </button>
    </form>
  );
};
