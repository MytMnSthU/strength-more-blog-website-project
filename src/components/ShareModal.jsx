import { FaTelegram, FaCopy, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useEffect, useState } from "react";

const ShareButton = ({ platform, url, title }) => {
	const platformData = {
		telegram: {
			icon: <FaTelegram className="text-[40px]" />,
			link: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
			color: "text-[#0088cc]",
		},
		facebook: {
			icon: <FaFacebook className="text-[40px]" />,
			link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
			color: "text-[#1877F2]",
		},
		twitter: {
			icon: <BsTwitterX className="text-[40px]" />,
			link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
			color: "text-[#000] dark:text-[#fff]",
		},
	};

	return (
		<a
			href={platformData[platform].link}
			className={`flex items-center p-5  ${platformData[platform].color}`}
			target="_blank"
			rel="noopener noreferrer"
		>
			{platformData[platform].icon}
		</a>
	);
};

const ShareModal = ({ isOpen, onClose }) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			const timer = setTimeout(() => setIsCopied(false), 2000);
			return () => clearTimeout(timer);
		}
	}, [isCopied]);

	return (
		<div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
			<div className=" relative  w-11/12 max-w-md">
				<div className="bg-[#F3F1E8] dark:bg-black p-5 border-2 border-black dark:border-[#aaa] relative z-10">
								<h2 className="text-2xl font-bold mb-4">Share this article on:</h2>
								<div className="flex justify-around">
									<ShareButton platform="telegram" url={window.location.href} title={document.title} />
									<ShareButton platform="facebook" url={window.location.href} title={document.title} />
									<ShareButton platform="twitter" url={window.location.href} title={document.title} />
								</div>
								<div className="mt-4">
									<input type="text" value={window.location.href} readOnly className="border-2 border-black dark:border-[#aaa] p-2 w-full" />
									<button onClick={() => navigator.clipboard.writeText(window.location.href).then(() => setIsCopied(true))} className="mt-2 w-full bg-black dark:bg-[#aaa] text-white dark:text-black p-2 flex items-center justify-center">
										<FaCopy className="mr-2" /> Copy Link
									</button>
									{isCopied && <span className="text-zinc-500 p-3 inline-block w-full text-center">Link copied!</span>}
								</div>
				</div>
				<div className="w-full h-full bg-black dark:bg-[#aaa] absolute top-0 left-0 translate-x-[3px] translate-y-[3px] z-[-1]"></div>
			</div>
			<div onClick={onClose} className="fixed inset-0 bg-black opacity-50"></div>
		</div>
	);
};

export default ShareModal;