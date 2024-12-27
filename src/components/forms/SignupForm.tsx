import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomInput from "../ui/custom/CustomInput";
import { Button } from "../ui/button";
import InputRow from "../ui/custom/InputRow";
import CustomCheckbox from "../ui/custom/CustomCheckbox";
import CustomDatePicker from "../ui/custom/CustomDatePicker";
import { DateRange } from "react-day-picker";

const schema = z
  .object({
    username: z.string().min(3, "too short").max(20, "too long"),
    email: z.string().min(1, "Invalid email").email("Invalid email"),
    dob: z
      .date()
      .min(new Date("1940-01-01"), {
        message: "enter a reasonable date",
      })
      .max(new Date(), { message: "enter a reasonable date" }),
    password: z.string().min(8, "Minimum length is 8."),
    "repeat-password": z.string(),
    terms: z.boolean(),
  })
  .strict()
  .refine(
    (data) => data.password === data["repeat-password"],
    "Passwords don't match"
  );

type SchemaType = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  console.log(watch("dob"));

  function onSubmit(data: SchemaType) {
    console.log(data);
  }

  // FieldErrors is a type that is used to narrow down the type of the error object...
  function onError(error: FieldErrors<SchemaType>) {
    console.log(error);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col justify-center align-center gap-y-3"
    >
      <InputRow>
        <CustomInput
          type="text"
          error={errors.username?.message}
          className="max-w-[200px]"
          {...register("username")}
        >
          username
        </CustomInput>
        <CustomInput
          type="email"
          error={errors.email?.message}
          {...register("email")}
        >
          email address
        </CustomInput>
      </InputRow>

      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <CustomDatePicker
            onSelect={(date?: DateRange) => field.onChange(date)}
            error={errors.dob?.message}
          >
            date of birth
          </CustomDatePicker>
        )}
      />

      <InputRow>
        <CustomInput
          error={errors.password?.message}
          isPassword
          {...register("password")}
        >
          password
        </CustomInput>
        <CustomInput
          error={errors["repeat-password"]?.message}
          isPassword
          {...register("repeat-password")}
        >
          repeat password
        </CustomInput>
      </InputRow>

      <CustomCheckbox {...register("terms")}>
        I've read the terms and conditions and I agree on them
      </CustomCheckbox>

      <Button
        disabled={!watch("terms")}
        className="disabled:!cursor-not-allowed"
      >
        Create an account!
      </Button>
    </form>
  );
}