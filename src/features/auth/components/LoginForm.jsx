import { Link } from "react-router-dom";

const LoginForm = () => {
	return (
		<section className="relative mx-auto max-w-full px-1 pb-1">
			<div className="relative z-10 grid gap-6 border border-black/20 bg-transparent p-5 dark:border-white/20 sm:p-5 rounded-lg">
				<div className="grid gap-1">
					<span className="label text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
						welcome back
					</span>
					<h1 className="text-5xl font-extrabold leading-none">Sign in</h1>
					<p className="mb-0 text-base text-zinc-700 dark:text-zinc-300">
						Continue reading your favorite stories.
					</p>
				</div>

				<form className="grid gap-4">
					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">email</span>
						<input
							type="email"
							name="email"
							autoComplete="email"
							placeholder="you@example.com"
							className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
						/>
					</label>

					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">password</span>
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							placeholder="Enter your password"
							className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
						/>
					</label>

					<div className="flex flex-wrap items-center justify-between gap-3 text-sm">
						<label className="flex items-center gap-2 font-semibold">
							<input type="checkbox" name="remember" className="h-4 w-4 accent-black" />
							remember me
						</label>
						<a href="#forgot-password" className="font-bold underline underline-offset-4">
							forgot password?
						</a>
					</div>

					<button
						type="submit"
						className="btn mt-2 border border-black rounded-lg bg-black px-5 py-3 text-xl font-extrabold uppercase leading-none text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200">
						sign in
					</button>
				</form>

				<p className="mb-0 text-center text-base text-zinc-700 dark:text-zinc-300">
					New here?{" "}
					<Link to="/register" className="font-bold underline underline-offset-4">
						Create an account
					</Link>
				</p>
			</div>
		</section>
	);
};

export default LoginForm;
