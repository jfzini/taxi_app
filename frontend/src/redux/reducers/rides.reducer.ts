import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRideState } from "../types";

const initialState: IRideState = {
	rides: [],
	coords: {
		origin: {
			latitude: 0,
			longitude: 0,
		},
		destination: {
			latitude: 0,
			longitude: 0,
		},
	}
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
		case "CHANGE_COORDS":
			return {
				...state,
				coords: action.payload,
			};
		default:
			return state;
	}
};

export default ridesReducer;
