import { useState } from "react"

export const useImageStatus = () => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isImageError, setIsImageError] = useState(false);

	const handleLoad = () => setIsImageLoaded(true);

	const handleError = () => {
		setIsImageLoaded(false);
		setIsImageError(true);
	};

	return {
		isImageLoaded,
		isImageError,
		handleError,
		handleLoad
	}
}