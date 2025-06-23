import { useMutation } from "@tanstack/react-query";
import { postData } from "~/lib/fetch-utils";
import type { SignUpformData } from "~/routes/auth/sign-up";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpformData) => postData("/auth/register", data),
  });
};
