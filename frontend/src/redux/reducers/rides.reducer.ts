import type { PayloadAction } from "@reduxjs/toolkit";

interface IRide {
	id: number;
	name: string;
	description: string;
	vehicle: string;
	review: {
		rating: number;
		comment: string;
	};
	value: number;
}

interface IRideState {
	rides: IRide[];
}

const initialState: IRideState = {
	rides: [],
};

const ridesReducer = (
	// biome-ignore lint/style/useDefaultParameterLast: <Redux will handle these cases>
	state = initialState,
	action: PayloadAction<IRideState>,
) => {
	switch (action.type) {
		case "CHANGE_RIDES":
			return {
				...state,
				rides: action.payload,
			};
		default:
			return state;
	}
};

export default ridesReducer;
