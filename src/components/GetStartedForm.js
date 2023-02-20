import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { submitToNetlify } from "../hooks/submitToNetlify";

const formName = "Free Trial EN";
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
      className="flex w-full max-w-[440px]"
    >
      <div className="flex w-full flex-col">
        <input
          name="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="h-[50px] rounded-[4px] border-[1px] border-[#333375] bg-[#333375] p-[10px] text-white outline-none"
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
        className="ml-[5px] flex h-[50px] w-full max-w-[160px] items-center justify-center rounded-sm bg-white font-medium uppercase tracking-wide text-primary opacity-90 hover:opacity-100"
      >
        Start the trial
      </button>
      <p className="h-[20px] pt-[5px] text-[15px]">{message}</p>
    </form>
  );
};
