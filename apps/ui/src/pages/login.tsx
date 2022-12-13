import { FormField } from "@/components/base/FormField";
import { BfLogo } from "@/components/shared/BfLogo";
import { loginAdminUser } from "@/lib/api";
import { IconArrowRight, IconLoader3, IconX } from "@tabler/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ResStatus } from "shared";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginAdminUser, {
    onSuccess({ data: { status, token, user, msg } }) {
      if (status === ResStatus.ERROR) {
        setError(msg);
      } else {
        // save token
        localStorage.setItem("bf_admin_auth", JSON.stringify({ user, token }));
        navigate("/app");
      }
    },
    onError(error) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      setError((error as any).response.data.msg);
    },
  });

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!(email || pwd)) {
      setError("Please set all fields");
      return;
    }

    mutate({ email, password: pwd });
  };

  const clearError = () => setTimeout(() => setError(""), 2000);

  useEffect(() => {
    if (error) clearError();
  }, [error]);

  return (
    <main className="relative w-full flex min-h-[100vh] text-slate-900 bg-slate-200/40">
      <section className="mx-auto flex flex-col gap-3 justify-center text-center w-[90%] md:w-[50%] lg:w-[30%]">
        <Link
          to="/"
          className="flex items-center justify-center w-full scale-75"
        >
          <BfLogo size={300} />
        </Link>
        <h1 className="text-slate-500 text-xl">Sign in to your account</h1>

        <form className="bg-white  ring-black ring-opacity-5 shadow-sm mx-auto rounded-md my-5 p-6 pb-10 px-8 w-full">
          {error ? (
            <div
              className={clsx(
                "p-3 px-4 text-white bg-red-400 flex items-center justify-between rounded-md mb-4 transition-all",
                error ? "h-14" : "h-0"
              )}
            >
              <span>{error}</span>
              <IconX
                size={20}
                className="text-white cursor-pointer"
                onClick={() => setError("")}
              />
            </div>
          ) : (
            ""
          )}
          <FormField
            name="email"
            label="Email"
            value={email}
            onChange={(_) => setEmail(_.target.value)}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            value={pwd}
            onChange={(_) => setPwd(_.target.value)}
          />
          <div className="flex text-sm -mt-3 justify-between mb-5">
            <Link to="/login" className="text-teal-500">
              Forgot password
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="group btn w-full bg-teal-600 text-white py-3 inline-flex gap-2 items-center justify-center rounded-md hover:opacity-80"
          >
            {isLoading ? (
              <IconLoader3 size={24} className="loading" />
            ) : (
              <>
                <span>Sign in</span>
                <IconArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-all duration-200"
                />
              </>
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
