/** @format */

import {
  type ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from "react-router-dom";
import CustomInput from "../ui/custom/CustomInput";
import { useLanguage } from "@/contexts/LanguageProvider";
import { arAuth, enAuth } from "@/assets/langs/auth";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import CustomErrorMessage from "../ui/custom/CustomErrorMessage";

interface formData {
  username: string;
  password: string;
}

type actionReturnValue =
  | {
      errorMessage?: string;
    }
  | Response;

export default function LoginForm() {
  const { language } = useLanguage();
  const langData = language === "en" ? enAuth : arAuth;

  const actionData = useActionData<actionReturnValue>();

  const { register, watch, formState } = useForm<formData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const typeNarrowingAux = !(actionData instanceof Response) && actionData;
  return (
    <>
      <Form
        method="post"
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center space-y-10"
      >
        <CustomInput
          {...register("username", { minLength: 5 })}
          error={typeNarrowingAux && actionData.errorMessage!.length > 0}
        >
          {langData.username}
        </CustomInput>
        <CustomInput
          isPassword
          {...register("password")}
          valueLength={watch("password").length}
          error={typeNarrowingAux && actionData.errorMessage!.length > 0}
        >
          {langData.password}
        </CustomInput>
        <Button>SUBMIT THE FORM</Button>
      </Form>
      {typeNarrowingAux && (
        <CustomErrorMessage>{actionData!.errorMessage}</CustomErrorMessage>
      )}
    </>
  );
}

export async function action({
  request,
}: ActionFunctionArgs): Promise<actionReturnValue> {
  const form = await request.formData();
  const formData = Object.fromEntries(form);
  const dataShape = z.object({
    username: z
      .string()
      .min(3, "the username is too small")
      .max(15, "the username too long"),
    password: z.string(),
  });

  const result = await dataShape.safeParseAsync(formData);

  return result.success
    ? redirect("/App")
    : { errorMessage: "Invalid Credentials" };
}
