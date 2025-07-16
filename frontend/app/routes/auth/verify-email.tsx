import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { CheckCircle, Loader } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useVerifyEmailMutation } from "~/hook/use-auth";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending: isVerifying } = useVerifyEmailMutation();

  useEffect(() => {
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || "Verification failed";
            setIsSuccess(false);
            console.error(error);

            toast.error(errorMessage);
          },
        }
      );
    }
  }, [searchParams]);
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold">Verify Email</h1>
      <p className="text-sm text-gray-500 ">Verfying your email </p>
      <Card className="max-w-md w-full shadow-lg mt-6">
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            {isVerifying ? (
              <>
                <Loader className="w-10 h-10 animate-spin text-gray-500" />
                <h3 className="text-lg font-semibold  ">Verifying...</h3>
                <p className="text-sm text-gray-500">
                  Please wait while we verify your email.
                </p>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-10 h-10 text-green-500" />
                <h3 className="text-lg font-semibold  ">Email Verified!</h3>
                <p className="text-sm text-gray-500">
                  Your email has been successfully verified!
                </p>

                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:underline mt-4"
                >
                  <Button variant="outline" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <CheckCircle className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-semibold  ">Verification Failed</h3>
                <p className="text-sm text-gray-500">
                  The verification link is invalid or has expired.
                </p>

                <Link
                  to="/sign-in"
                  className="text-blue-500 hover:underline mt-4"
                >
                  <Button variant="outline" className="w-full">
                    Back to Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
