export interface IRide {
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

export interface ICoords {
	origin: {
		latitude: number;
		longitude: number;
	};
	destination: {
		latitude: number;
		longitude: number;
	};
}

export interface IRideState {
	rides: IRide[];
	coords: ICoords;
}

export interface IReduxStates {
	rides: IRideState;
}