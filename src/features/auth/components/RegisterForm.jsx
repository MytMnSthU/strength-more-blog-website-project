import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { animate } from "animejs";

const RegisterForm = () => {
	const { register } = useRegister();
	const { mode } = useContext(AppContext);
	const navigate = useNavigate();

	// States: "idle" | "loading" | "success" | "error"
	const [status, setStatus] = useState("idle");

	const submitButtonRef = useRef(null);
	const circlePathRef = useRef(null);
	const svgSpinnerRef = useRef(null);
	const checkmarkPathRef = useRef(null);

	const CIRCLE_CIRCUMFERENCE = 251.32;

	useEffect(() => {
		if (status === "loading") {
			// Shrink button to circular spinner size
			animate(submitButtonRef.current, {
				width: ["100%", "64px"],
				duration: 350,
				easing: "easeInOutQuad",
			});

			// Spinner stroke animation
			animate(circlePathRef.current, {
				strokeDashoffset: [
					CIRCLE_CIRCUMFERENCE,
					0,
					CIRCLE_CIRCUMFERENCE,
				],
				duration: 2000,
				loop: true,
				easing: "easeInOutCubic",
			});

			// Spinner rotation
			animate(svgSpinnerRef.current, {
				rotate: "1turn",
				duration: 1200,
				loop: true,
				easing: "linear",
			});
		}

		if (status === "success") {
			// Expand button to fit checkmark + "Success"
			animate(submitButtonRef.current, {
				width: ["64px", "160px"],
				duration: 400,
				easing: "easeInOutBack",
			});

			// Draw checkmark stroke
			if (checkmarkPathRef.current) {
				const pathLength = checkmarkPathRef.current.getTotalLength();
				checkmarkPathRef.current.style.strokeDasharray = pathLength;
				checkmarkPathRef.current.style.strokeDashoffset = pathLength;

				animate(checkmarkPathRef.current, {
					strokeDashoffset: [pathLength, 0],
					duration: 400,
					delay: 150,
					easing: "easeOutQuad",
				});
			}
		}

		if (status === "error") {
			animate(submitButtonRef.current, {
				width: ["64px", "160px"],
				duration: 500,
				easing: "easeInOutSine",
			});

			const timer = setTimeout(() => {
				animate(submitButtonRef.current, {
					width: "100%",
					duration: 500,
					easing: "easeOutQuad",
				});
				setStatus("idle");
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [status]);

	async function handleFormSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const name = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirmPassword");

		if (password !== confirmPassword) {
			setStatus("error");
			return;
		}

		setStatus("loading");

		try {
			const result = await register(email, password, name);

			if (result) {
				setStatus("success");

				setTimeout(() => {
					navigate("/profile");
				}, 1200);
			} else {
				setStatus("error");
			}
		} catch (err) {
			setStatus("error");
		}
	}

	return (
		<section className="relative mx-auto max-w-full px-1 pb-1">
			<div className="relative z-10 grid gap-6 border border-black/20 bg-transparent p-5 dark:border-white/20 sm:p-5 rounded-lg">
				<div className="grid gap-1">
					<span className="label text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
						join the conversation
					</span>
					<h1 className="text-5xl font-extrabold leading-none">
						Create account
					</h1>
					<p className="mb-0 text-base text-zinc-700 dark:text-zinc-300">
						Make a space for the ideas worth coming back to.
					</p>
				</div>

				<form
					className={`grid gap-4 ${status === "loading" ? "pointer-events-none opacity-50" : ""}`}
					onSubmit={handleFormSubmit}>
					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">
							name
						</span>
						<input
							type="text"
							name="name"
							autoComplete="name"
							placeholder="Your name"
							className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
						/>
					</label>

					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">
							email
						</span>
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
							<span className="label text-lg font-bold uppercase leading-none">
								password
							</span>
							<input
								type="password"
								name="password"
								autoComplete="new-password"
								placeholder="Create a password"
								className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
							/>
						</label>

						<label className="grid gap-1.5">
							<span className="label text-lg font-bold uppercase leading-none">
								confirm password
							</span>
							<input
								type="password"
								name="confirmPassword"
								autoComplete="new-password"
								placeholder="Repeat your password"
								className="w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg"
							/>
						</label>
					</div>

					{/* Show error message if present */}
					{status === "error" && (
						<p className="text-sm font-semibold text-red-500 text-center mb-0">
							{"Could not create account. Please check your details and try again."}
						</p>
					)}

					<button
						type="submit"
						ref={submitButtonRef}
						disabled={status !== "idle"}
						className={`btn border rounded-lg py-3 text-xl font-extrabold uppercase leading-none transition-colors duration-300 mx-auto w-full relative flex items-center justify-center gap-2 overflow-hidden dark:mt-2 ${
							status === "success"
								? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
								: status === "error"
									? "bg-red-600 border-red-600 text-white"
									: "bg-black border-black text-white dark:bg-white dark:border-white dark:text-black"
						}`}>
						{status === "idle" && "create account"}

						{status === "loading" && (
							<svg
								ref={svgSpinnerRef}
								viewBox="0 0 100 100"
								className="w-8 h-8">
								<circle
									cx="50"
									cy="50"
									r="40"
									fill="none"
									stroke={
										mode === "light"
											? "rgba(255,255,255,0.2)"
											: "rgba(0,0,0,0.2)"
									}
									strokeWidth="8"
								/>
								<circle
									ref={circlePathRef}
									cx="50"
									cy="50"
									r="40"
									fill="none"
									stroke={
										mode === "light" ? "#ffffff" : "#000000"
									}
									strokeWidth="8"
									strokeLinecap="round"
									strokeDasharray={CIRCLE_CIRCUMFERENCE}
									strokeDashoffset={CIRCLE_CIRCUMFERENCE}
								/>
							</svg>
						)}

						{status === "success" && (
							<>
								<svg
									viewBox="0 0 24 24"
									className="w-6 h-6 stroke-white dark:stroke-black  fill-none stroke-[3]">
									<path
										ref={checkmarkPathRef}
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12.75l6 6 9-13.5"
									/>
								</svg>
								<span>Success</span>
							</>
						)}

						{status === "error" && <span>Failed</span>}
					</button>
				</form>

				<p className="mb-0 text-center text-base text-zinc-700 dark:text-zinc-300">
					Already have an account?{" "}
					<Link
						to="/login"
						className="font-bold underline underline-offset-4">
						Sign in
					</Link>
				</p>
			</div>
		</section>
	);
};

export default RegisterForm;