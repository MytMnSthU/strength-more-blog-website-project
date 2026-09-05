import { Link } from "react-router-dom";

const RegisterForm = () => {
	return (
		<section className="relative mx-auto max-w-xl px-1 pb-1">
			<div className="relative z-10 grid gap-6 border-0 border-black/20 bg-transparent p-5 dark:border-white/20 sm:p-8 rounded-lg">
				<div className="grid gap-1">
					<span className="label text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
						join the conversation
					</span>
					<h1 className="text-5xl font-extrabold leading-none">Create account</h1>
					<p className="mb-0 text-base text-zinc-700 dark:text-zinc-300">
						Make a space for the ideas worth coming back to.
					</p>
				</div>

				<form className="grid gap-4">
					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">name</span>
						<input
							type="text"
							name="name"
							autoComplete="name"
							placeholder="Your name"
							className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
						/>
					</label>

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

					<div className="grid gap-4 sm:grid-cols-2">
						<label className="grid gap-1.5">
							<span className="label text-lg font-bold uppercase leading-none">password</span>
							<input
								type="password"
								name="password"
								autoComplete="new-password"
								placeholder="Create a password"
								className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
							/>
						</label>

						<label className="grid gap-1.5">
							<span className="label text-lg font-bold uppercase leading-none">confirm password</span>
							<input
								type="password"
								name="confirmPassword"
								autoComplete="new-password"
								placeholder="Repeat your password"
								className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
							/>
						</label>
					</div>

					<button
						type="submit"
						className="btn mt-2 border border-black rounded-lg bg-black px-5 py-3 text-xl font-extrabold uppercase leading-none text-white transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-zinc-200">
						create account
					</button>
				</form>

				<p className="mb-0 text-center text-base text-zinc-700 dark:text-zinc-300">
					Already have an account?{" "}
					<Link to="/login" className="font-bold underline underline-offset-4">
						Sign in
					</Link>
				</p>
			</div>
		</section>
	);
};

export default RegisterForm;