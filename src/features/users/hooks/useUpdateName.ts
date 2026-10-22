import { updateUserName } from "../api/updateName";

const useUpdateName = () => {
	const updateName = async (name: string) => {
		const user = await updateUserName(name);
		return user;
	};

	return {
		updateName,
	};
};

export default useUpdateName;
