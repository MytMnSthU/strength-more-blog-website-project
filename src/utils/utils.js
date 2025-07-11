export const formatDate = (date) => {
	const newDate = new Date(date);

	const month = newDate.toLocaleDateString("en-US", { month: "short" });

	const day = newDate.getDate();

	const year = newDate.getFullYear();

	const formattedDate = `${month} ${day}, ${year}`;

	return formattedDate;
};