import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRideState } from "../types";

const initialState: IRideState = {
	rides: [],
	coords: {
		origin: {
			latitude: 0,
			longitude: 0,
			address: "",
		},
		destination: {
			latitude: 0,
			longitude: 0,
			address: "",
		},
	},
	distance: 0,
	duration: "",
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
		case "CHANGE_DISTANCE":
			return {
				...state,
				distance: action.payload,
			};
		case "CHANGE_DURATION":
			return {
				...state,
				duration: action.payload,
			};
		case "CHANGE_VALUE":
			return {
				...state,
				value: action.payload,
			};
		default:
			return state;
	}
};

export default ridesReducer;
