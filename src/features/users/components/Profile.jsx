import { useRef, useState } from "react";
import { FaCamera, FaCheck, FaPen, FaUser } from "react-icons/fa";
import useAuth from "../../auth/hooks/useAuth";
import { formatDate } from "../../../utils/utils";

const Profile = () => {
	const { user } = useAuth();
	const [name, setName] = useState(user?.displayName || "");
	const [draftName, setDraftName] = useState(user?.displayName || "");
	const [isEditingName, setIsEditingName] = useState(false);
	const [profileImage, setProfileImage] = useState("");
	const [joinedDate, setJoinedDate] = useState(formatDate(user?.metadata.creationTime) || "");
	const fileInputRef = useRef(null);

	const handleImageChange = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setProfileImage(URL.createObjectURL(file));
	};

	const startEditingName = () => {
		setDraftName(name);
		setIsEditingName(true);
	};

	const saveName = () => {
		const nextName = draftName.trim();
		if (nextName) setName(nextName);
		setIsEditingName(false);
	};

	return (
		<section className="w-full">
			<div className="group relative rounded-lg border border-black/20 p-3 transition-all dark:border-white/20">
				<div className="grid gap-6 p-3 sm:grid-cols-[180px_1fr] sm:items-center">
					<div className="relative mx-auto w-fit">
						<div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-black/20 bg-[#F3F1E8] dark:border-white/20 dark:bg-[#111]">
							{profileImage ? (
								<img
									src={profileImage}
									alt={`${name} profile`}
									className="h-full w-full object-cover"
								/>
							) : (
								<FaUser className="text-4xl text-black/40 dark:text-white/40" />
							)}
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="hidden"
						/>
						<button
							type="button"
							aria-label="Upload profile image"
							onClick={() => fileInputRef.current?.click()}
							className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-[#F3F1E8] dark:border-white/20 dark:bg-[#1F1F1F]">
							<FaCamera size={13} />
						</button>
					</div>

					<div className="grid gap-3 text-center sm:text-left">
						<div>
							<span className="text-sm font-semibold uppercase text-zinc-600 dark:text-zinc-400">
								Profile
							</span>
							{isEditingName ? (
								<div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
									<input
										autoFocus
										value={draftName}
										onChange={(event) => setDraftName(event.target.value)}
										onKeyDown={(event) => {
											if (event.key === "Enter") saveName();
											if (event.key === "Escape") setIsEditingName(false);
										}}
									className="w-full border-b border-black/30 bg-transparent px-0 py-1 text-3xl font-extrabold uppercase outline-none dark:border-white/30"
								/>
								<button
									type="button"
									aria-label="Save profile name"
									onClick={saveName}
									className="p-2">
									<FaCheck size={13} />
								</button>
								</div>
							) : (
								<div className="mt-1 flex items-center justify-center gap-3 sm:justify-start">
									<h1 className="text-4xl font-extrabold uppercase leading-none">
										{name}
									</h1>
									<button
										type="button"
										aria-label="Edit profile name"
										onClick={startEditingName}
										className="p-2">
										<FaPen size={13} />
									</button>
								</div>
							)}
						</div>

						<p className="mb-0 text-sm font-semibold uppercase text-zinc-600 dark:text-zinc-400">
							joined at {joinedDate}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};


export default Profile;