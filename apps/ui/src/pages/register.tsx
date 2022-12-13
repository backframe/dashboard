import { FormField } from "@/components/base/FormField";
import { BfLogo } from "@/components/shared/BfLogo";
import { createAdminUser } from "@/lib/api";
import { IconArrowRight, IconLoader2, IconX } from "@tabler/icons";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ResStatus } from "shared";

export default function Register() {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [pwdCfrm, setPwdCfrm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { mutate, isError, isLoading } = useMutation(createAdminUser, {
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
      setError((error as any).message);
    },
  });

  const clearError = () => setTimeout(() => setError(""), 2000);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!(email || passwd || pwdCfrm)) {
      setError("Please make sure all fields are set");
      return;
    }
    if (passwd !== pwdCfrm) {
      setError("Passwords do not match");
      return;
    }
    // console.log(email, passwd, pwdCfrm);
    mutate({ email, password: passwd, passwordConfirm: pwdCfrm });
  };

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
        <h1 className="text-slate-500 text-xl">Create a new admin account</h1>

        <form className="bg-white  ring-black ring-opacity-5 shadow-sm mx-auto rounded-md my-5 pt-5 px-8 pb-10 w-full">
          {error.length ? (
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
            onChange={(v) => setEmail(v.target.value)}
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            value={passwd}
            onChange={(v) => setPasswd(v.target.value)}
          />
          <FormField
            name="password"
            label="Confirm Password"
            type="password"
            value={pwdCfrm}
            onChange={(_) => setPwdCfrm(_.target.value)}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="group btn w-full bg-teal-600 text-white p-3 inline-flex gap-2 items-center justify-center rounded-md hover:opacity-80"
          >
            {isLoading ? (
              <IconLoader2 size={20} />
            ) : (
              <>
                <span>Create and login</span>
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
