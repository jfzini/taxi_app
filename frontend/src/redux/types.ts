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
		address: string;
	};
	destination: {
		latitude: number;
		longitude: number;
		address: string;
	};
}

export interface IRideState {
	rides: IRide[];
	coords: ICoords;
	distance: number;
	duration: string;
}

export interface IReduxStates {
	rides: IRideState;
}