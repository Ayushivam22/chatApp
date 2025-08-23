import SigninForm from "@/components/SigninForm";

export default function Signin() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col gap-6 items-center w-full max-w-md border border-white/40 rounded-2xl p-10 shadow-2xl">
                <h1 className="text-3xl font-bold text-amber-900 w-full text-center mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-700 text-center mb-4">
                    Sign in to continue to your account!
                </p>
                <SigninForm />
                <p className="text-gray-600 text-sm mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/auth/signup"
                        className="text-amber-900 font-semibold hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
