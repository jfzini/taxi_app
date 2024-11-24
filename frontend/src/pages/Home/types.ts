import type { UseFormRegister } from "react-hook-form";

export type FormData = {
	customerId: string;
	origin: string;
	destination: string;
};

export type FormField = {
	type: string;
	placeholder?: string;
	options?: { value: string; label: string }[];
	label: string;
	register: UseFormRegister<FormData>;
	name: keyof FormData;
	required: boolean;
	error: string | undefined;
};

export type Customer = {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
};
