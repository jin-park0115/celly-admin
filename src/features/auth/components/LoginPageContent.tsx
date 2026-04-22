import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Building2, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { ROUTES } from "../../../shared/constants/routes";
import { useAuthStore } from "../../../store/authStore";

type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginPageContent = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { register, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: "admin@church.com",
      password: "admin1234",
    },
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = handleSubmit(({ email, password }) => {
    const isSuccess = login(email, password);

    if (!isSuccess) {
      setErrorMessage("목업 로그인 정보가 올바르지 않습니다. admin@church.com / admin1234");
      return;
    }

    setErrorMessage("");
    void navigate({ to: ROUTES.dashboard });
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-6 py-10">
      <div className="w-full max-w-[384px] rounded-[22px] border border-slate-200 bg-white px-6 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.08),0_2px_6px_rgba(15,23,42,0.04)] sm:px-7 sm:py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1976d2] text-white shadow-sm">
          <Building2 className="h-6 w-6" />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-slate-900">
            Celly Admin
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-400">교회 셀 관리 시스템</p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="login-email">
              이메일
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-[#1976d2]">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                {...register("email")}
                id="login-email"
                type="email"
                placeholder="admin@church.com"
                className="h-12 w-full border-0 bg-transparent px-3 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="login-password">
              비밀번호
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus-within:border-[#1976d2]">
              <LockKeyhole className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                {...register("password")}
                id="login-password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                className="h-12 w-full border-0 bg-transparent px-3 text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                className="text-slate-400 transition hover:text-slate-600"
                aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1976d2] text-sm font-semibold text-white shadow-[0_10px_18px_rgba(25,118,210,0.25)] transition hover:bg-[#176abd]"
          >
            로그인
          </button>

          {errorMessage ? (
            <p className="text-center text-sm font-medium text-rose-500">{errorMessage}</p>
          ) : (
            <p className="text-center text-xs font-medium text-slate-400">
              목업 계정: `admin@church.com` / `admin1234`
            </p>
          )}
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            className="text-sm font-medium text-slate-400 underline underline-offset-4 transition hover:text-slate-600"
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>
      </div>
    </main>
  );
};
