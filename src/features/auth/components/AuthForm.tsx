import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { animate } from "animejs";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";

const INPUT_CLASS =
	"w-full border border-black/20 bg-transparent px-4 py-3 text-base font-semibold outline-none transition-all placeholder:font-normal placeholder:text-zinc-500 focus:-translate-y-0.5 focus:bg-white dark:border-white/20 dark:focus:bg-[#282727] rounded-lg";

type AuthFormProps = {
	mode: "register" | "login"
}

const AuthForm = ({ mode }: AuthFormProps) => {
	const isRegister = mode === "register";
	const { login } = useLogin();
	const { register } = useRegister();
	const context = useContext(AppContext);
	const themeMode = context?.mode;
	const navigate = useNavigate();
	const location = useLocation();

	// States: "idle" | "loading" | "success" | "error"
	const [status, setStatus] = useState("idle");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const circlePathRef = useRef<SVGCircleElement>(null);
	const svgSpinnerRef = useRef(null);
	const checkmarkPathRef = useRef<SVGPathElement>(null);
	const turnstileContainerRef = useRef<HTMLDivElement>(null);
	const turnstileWidgetIdRef = useRef<string | null>(null);

	const CIRCLE_CIRCUMFERENCE = 251.32;
	const siteKey = import.meta.env.VITE_SITE_KEY;

	const resetTurnstile = () => {
		const turnstile = (window as unknown as { turnstile?: any }).turnstile;
		if (turnstile) {
			try {
				if (turnstileWidgetIdRef.current) {
					turnstile.reset(turnstileWidgetIdRef.current);
				} else {
					turnstile.reset();
				}
			} catch {
				// Ignore reset errors
			}
		}
	};

	// Initialize and handle Cloudflare Turnstile widget across React route changes
	useEffect(() => {
		let isMounted = true;
		if (!siteKey) return;

		const renderTurnstile = () => {
			const turnstile = (window as unknown as { turnstile?: any }).turnstile;
			if (
				turnstile &&
				turnstileContainerRef.current &&
				turnstileContainerRef.current.childElementCount === 0
			) {
				try {
					turnstileWidgetIdRef.current = turnstile.render(
						turnstileContainerRef.current,
						{
							sitekey: siteKey,
							theme: themeMode === "dark" ? "dark" : "light",
						}
					);
				} catch {
					// Element may already have been initialized by Turnstile scanner
				}
			}
		};

		const turnstile = (window as unknown as { turnstile?: any }).turnstile;
		if (turnstile) {
			renderTurnstile();
		} else {
			const interval = setInterval(() => {
				const t = (window as unknown as { turnstile?: any }).turnstile;
				if (t) {
					clearInterval(interval);
					if (isMounted) renderTurnstile();
				}
			}, 100);
			return () => {
				isMounted = false;
				clearInterval(interval);
			};
		}

		return () => {
			isMounted = false;
			const t = (window as unknown as { turnstile?: any }).turnstile;
			if (turnstileWidgetIdRef.current && t) {
				try {
					t.remove(turnstileWidgetIdRef.current);
					turnstileWidgetIdRef.current = null;
				} catch {
					// Ignore cleanup errors
				}
			}
		};
	}, [mode, themeMode, siteKey]);

	useEffect(() => {
		if (status === "loading") {
			if (!submitButtonRef.current || !circlePathRef.current || !svgSpinnerRef.current) return;
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
			if (!submitButtonRef.current) return;
			// Expand button to fit checkmark + "Success"
			animate(submitButtonRef.current, {
				width: ["64px", "160px"],
				duration: 400,
				easing: "easeInOutBack",
			});

			// Draw checkmark stroke
			if (checkmarkPathRef.current) {
				const pathLength = checkmarkPathRef.current.getTotalLength();
				checkmarkPathRef.current.style.strokeDasharray = pathLength + "";
				checkmarkPathRef.current.style.strokeDashoffset = pathLength + "";

				animate(checkmarkPathRef.current, {
					strokeDashoffset: [pathLength, 0],
					duration: 400,
					delay: 150,
					easing: "easeOutQuad",
				});
			}
		}

		if (status === "error") {
			if (!submitButtonRef.current) return;

			animate(submitButtonRef.current, {
				width: ["64px", "160px"],
				duration: 500,
				easing: "easeInOutSine",
			});

			const timer = setTimeout(() => {
				if (!submitButtonRef.current) return;

				animate(submitButtonRef.current, {
					width: "100%",
					duration: 500,
					easing: "easeOutQuad",
				});
				setStatus("idle");
				setErrorMessage("");
			}, 2500);

			return () => clearTimeout(timer);
		}
	}, [status]);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirmPassword");
		const turnstileToken = formData.get("cf-turnstile-response");

		if (isRegister && password !== confirmPassword) {
			setErrorMessage("Passwords do not match. Please try again.");
			setStatus("error");
			return;
		}

		if (!turnstileToken) {
			setErrorMessage("Please complete the Cloudflare security verification.");
			setStatus("error");
			return;
		}

		setStatus("loading");

		try {
			const result = isRegister
				? await register(email, password, name)
				: await login(email, password);

			if (result) {
				setStatus("success");

				setTimeout(() => {
					navigate(location.state?.from || "/profile");
				}, 1200);
			} else {
				resetTurnstile();
				setErrorMessage(
					isRegister
						? "Could not create account. Please check your details and try again."
						: "Invalid email or password. Please try again."
				);
				setStatus("error");
			}
		} catch (err: any) {
			resetTurnstile();
			if (err?.code === "auth/too-many-requests") {
				setErrorMessage("Too many failed attempts. Access to this account has been temporarily disabled. Please try again later.");
			} else if (err?.code === "auth/email-already-in-use") {
				setErrorMessage("An account with this email already exists.");
			} else if (err?.code === "auth/weak-password") {
				setErrorMessage("Password should be at least 6 characters.");
			} else {
				setErrorMessage(
					isRegister
						? "Could not create account. Please check your details and try again."
						: "Invalid email or password. Please try again."
				);
			}
			setStatus("error");
		}
	}

	return (
		<section className="relative mx-auto max-w-full px-1 pb-1">
			<div className="relative z-10 grid gap-6 border border-black/20 bg-transparent p-5 dark:border-white/20 sm:p-5 rounded-lg">
				<div className="grid gap-1">
					<span className="label text-sm font-bold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
						{isRegister ? "join the conversation" : "welcome back"}
					</span>
					<h1 className="text-5xl font-extrabold leading-none">
						{isRegister ? "Create account" : "Sign in"}
					</h1>
					<p className="mb-0 text-base text-zinc-700 dark:text-zinc-300">
						{isRegister
							? "Make a space for the ideas worth coming back to."
							: "Continue reading your favorite stories."}
					</p>
				</div>

				<form
					className={`grid gap-4 ${status === "loading" ? "pointer-events-none opacity-50" : ""}`}
					onSubmit={handleFormSubmit}>
					{isRegister && (
						<label className="grid gap-1.5">
							<span className="label text-lg font-bold uppercase leading-none">
								name
							</span>
							<input
								type="text"
								name="name"
								autoComplete="name"
								placeholder="Your name"
								className={INPUT_CLASS}
							/>
						</label>
					)}

					<label className="grid gap-1.5">
						<span className="label text-lg font-bold uppercase leading-none">
							email
						</span>
						<input
							type="email"
							name="email"
							autoComplete="email"
							placeholder="you@example.com"
							className={INPUT_CLASS}
						/>
					</label>

					{isRegister ? (
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
									className={INPUT_CLASS}
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
									className={INPUT_CLASS}
								/>
							</label>
						</div>
					) : (
						<label className="grid gap-1.5">
							<span className="label text-lg font-bold uppercase leading-none">
								password
							</span>
							<input
								type="password"
								name="password"
								autoComplete="current-password"
								placeholder="Enter your password"
								className={INPUT_CLASS}
							/>
						</label>
					)}

					{/* Cloudflare Turnstile Verification */}
					<div className="flex justify-center my-1 min-h-[65px]">
						<div
							ref={turnstileContainerRef}
							className="cf-turnstile"
							data-sitekey={siteKey}
							data-theme={themeMode === "dark" ? "dark" : "light"}
						/>
					</div>

					{/* Show error message if present */}
					{status === "error" && (
						<p className="text-sm font-semibold text-red-500 text-center mb-0">
							{errorMessage ||
								(isRegister
									? "Could not create account. Please check your details and try again."
									: "Invalid email or password. Please try again.")}
						</p>
					)}

					<button
						type="submit"
						ref={submitButtonRef}
						disabled={status !== "idle"}
						className={`btn border rounded-lg py-3 text-xl font-extrabold uppercase leading-none transition-colors duration-300 mx-auto w-full relative flex items-center justify-center gap-2 overflow-hidden ${status === "success"
							? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
							: status === "error"
								? "bg-red-600 border-red-600 text-white"
								: "bg-black border-black text-white dark:bg-white dark:border-white dark:text-black"
							}`}>
						{status === "idle" &&
							(isRegister ? "create account" : "sign in")}

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
										themeMode === "light"
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
										themeMode === "light"
											? "#ffffff"
											: "#000000"
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
					{isRegister
						? "Already have an account? "
						: "New here? "}
					<Link
						to={isRegister ? "/login" : "/register"}
						className="font-bold underline underline-offset-4">
						{isRegister ? "Sign in" : "Create an account"}
					</Link>
				</p>
			</div>
		</section>
	);
};

export default AuthForm;