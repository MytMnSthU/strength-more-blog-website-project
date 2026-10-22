export type Category = {
	id: string;
	slug: string;
	image: {
		url: string;
	} | null;
	name: string;
	color: {
		hex: string
	} 
}
