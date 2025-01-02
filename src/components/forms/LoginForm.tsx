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
import useSignin from "@/hooks/useSignin";

interface formData {
  email: string;
  password: string;
}

type actionReturnValue =
  | {
      errorMessage?: string;
    }
  | Response;

export default function LoginForm({ isPending }: { isPending: boolean }) {
  const { language } = useLanguage();
  const langData = language === "en" ? enAuth : arAuth;
  const { isPending: isSigning, error, mutate } = useSignin();

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
          disabled={isPending}
        >
          {langData.email}
        </CustomInput>
        <CustomInput
          isPassword
          {...register("password")}
          valueLength={watch("password").length}
          error={typeNarrowingAux && actionData.errorMessage!.length > 0}
          disabled={isPending}
        >
          {langData.password}
        </CustomInput>
        <Button disabled={isPending}>LOG IN</Button>
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
      console.log("The query is going to be Prefetched! ✌️");
      queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: async () =>
          await toast.promise(
            signin(formData.email as string, formData.password as string),
            {
              error: "Failed to signin",
              loading: "Signing in",
              success: "Signed in successfully",
            }
          ),
        staleTime: 1000 * 60 * 60 * 5, // 5 hours
      });
      console.log("the page should be re-directed to this route /app now!");
      return redirect("/App");
    } catch (e: unknown) {
      console.log("There was an error! [🔴]");
      if (e instanceof Error)
        return { errorMessage: e.message.split("||").at(1) };
    } finally {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }

  return { errorMessage: result.error!.message };
}
