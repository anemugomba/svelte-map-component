type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ColorType = 'primary' | 'secondary' | 'danger' | 'success' | 'default' | 'dark';
type UserCredential = {
	email?: string;
	handle: string;
	password: string;
};
type UserJWT = {
	iss: string;
	iat: string | Date;
	exp: string | Date;
	aud: string;
	sub: string;
	sid: string;
	eml: string;
	fnm: string;
	lnm: string;
	hnd: string;
	gnd: string;
	lng: string;
	loc: string;
	tzn: string;
	uom: string;
	rol: string[];
};
type MarkerType =
	| 'yard_entrance'
	| 'security_hut'
	| 'dock'
	| 'accident'
	| 'debris'
	| 'low_clearance'
	| 'low_wires'
	| 'other'
	| 'pothole'
	| 'tight_turn'
	| 'work_zone'
	| 'parking'
	| 'man_door'
	| 'fuel'
	| 'maintenance'
	| 'scale'
	| 'staging_area'
	| 'washout'
	| 'sweepout'
	| 'big_box'
	| 'dealer'
	| 'parking_location'
	| 'rest_area'
	| 'restaurant'
	| 'truck_stop'
	| 'wash'
	| 'weigh_station'
	| 'do_not_enter'
	| undefined;
type validValuesYNU = 'Y' | 'N' | 'U';
type validValuesYNRSOU = 'Y' | 'N' | 'R' | 'S' | 'O' | 'U';
type validGender = 'M' | 'F' | 'U';
type validValuesRSOU = 'R' | 'S' | 'O' | 'U';
type acceptFiles = 'image/*' | 'video/*' | 'file/*';
type BgColors = {
	blue: string;
	danger: string;
	dark: string;
	default: string;
	green: string;
	light: string;
	orange: string;
	yellow: string;
};
type CountryType = 'united-states' | 'canada' | 'mexico';
