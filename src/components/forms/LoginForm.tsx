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
import { queryClient } from "../../../queryClient";
import { signin } from "@/services/AuthService";
import toast from "react-hot-toast";

interface formData {
  email: string;
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
      email: "",
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
          {...register("email", { minLength: 5 })}
          error={typeNarrowingAux && actionData.errorMessage!.length > 0}
        >
          {langData.email}
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
    email: z.string().email("Invalid email"),
    password: z.string(),
  });

  const result = await dataShape.safeParseAsync(formData);

  if (result.success) {
    try {
      const user = await toast.promise(
        signin(formData.email as string, formData.password as string),
        {
          error: "Failed to signin",
          loading: "Signing in",
          success: "Signed in successfully",
        }
      );

      queryClient.setQueryData(["user"], user);
    } catch (e: unknown) {
      if (e instanceof Error)
        return { errorMessage: e.message.split("||").at(1) };
    }
  }

  return result.success
    ? redirect("/app")
    : { errorMessage: result.error.message };
}
