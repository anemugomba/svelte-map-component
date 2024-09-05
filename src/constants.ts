import * as L from "leaflet";

export const PARKING = 'Parking'
export const DO_NOT_ENTER = 'Do Not Enter'
export const STAGING = 'Staging'
export const YARD = 'Yard'
export const SECURE = 'Secure'
export const OTHER = 'Other'
export const UNKNOWN = 'Unknown'

export const BUILDING_STRUCTURE = 'Building/Structure'

export const CODE_PARKING = 'parking'
export const CODE_DO_NOT_ENTER = 'do_not_enter'
export const CODE_STAGING = 'staging'
export const CODE_YARD = 'yard'
export const CODE_SECURE = 'secure'
export const CODE_OTHER = 'other'
export const CODE_UNKNOWN = 'unknown'

export const CODE_BUILDING_STRUCTURE = 'building_structure'

export const AREA_TYPES = [PARKING, DO_NOT_ENTER, STAGING, YARD, SECURE, OTHER, /*BUILDING,*/ CODE_BUILDING_STRUCTURE];

export const DARK_GREY = '#2D3542'
export const AREA_COLORS = [
    {
        name: BUILDING_STRUCTURE,
        type: CODE_BUILDING_STRUCTURE,
        border: '#232731',
        fill: 'rgba(35,39,49,0.76)'
    },
    {
        name: DO_NOT_ENTER,
        type: CODE_DO_NOT_ENTER,
        border: '#e71d25',
        fill: 'rgb(231,29,37,0.35)'
    },
    {
        name: PARKING,
        type: CODE_PARKING,
        border: '#2bb6e9',
        fill: 'rgb(43,182,233,0.35)'
    },
    {
        name: SECURE,
        type: CODE_SECURE,
        border: '#73c054',
        fill: 'rgb(115,192,84,0.35)'
    },
    {
        name: STAGING,
        type: CODE_STAGING,
        border: '#ead94c',
        fill: 'rgb(234,217,76,0.35)'
    },
    {
        name: YARD,
        type: CODE_YARD,
        border: '#ff8300',
        fill: 'rgb(255,131,0,0.35)'
    },
    {
        name: OTHER,
        type: CODE_OTHER,
        border: '#7d53de',
        fill: 'rgb(125,83,222,0.35)'
    },
    {
        name: UNKNOWN,
        type: CODE_UNKNOWN,
        border: '#7d53de',
        fill: 'rgb(125,83,222,0.35)'
    }

]

export const AREA_ICONS = {
    building_structure: {
        name: BUILDING_STRUCTURE,
        type: CODE_BUILDING_STRUCTURE,
        border: '#232731',
        fill: 'rgba(35,39,49,0.76)'
    },
    do_not_enter: {
        name: DO_NOT_ENTER,
        type: CODE_DO_NOT_ENTER,
        border: '#e71d25',
        fill: 'rgb(231,29,37,0.35)'
    },
    parking: {
        name: PARKING,
        type: CODE_PARKING,
        border: '#2bb6e9',
        fill: 'rgb(43,182,233,0.35)'
    },
    secure: {
        name: SECURE,
        type: CODE_SECURE,
        border: '#73c054',
        fill: 'rgb(115,192,84,0.35)'
    },
    staging: {
        name: STAGING,
        type: CODE_STAGING,
        border: '#ead94c',
        fill: 'rgb(234,217,76,0.35)'
    },
    yard: {
        name: YARD,
        type: CODE_YARD,
        border: '#ff8300',
        fill: 'rgb(255,131,0,0.35)'
    },
    other: {
        name: OTHER,
        type: CODE_OTHER,
        border: '#7d53de',
        fill: 'rgb(125,83,222,0.35)'
    }
};
export const AREA_STYLES = {
    yard: AREA_COLORS[5],
    parking: AREA_COLORS[2],
    other: AREA_COLORS[6],
    staging: AREA_COLORS[4],
    secure: AREA_COLORS[3],
    do_no_enter: AREA_COLORS[1],
    building_structure: AREA_COLORS[0]
}

export const icons = {
    marker_types: {
        accident: {
            name: "Accident",
            code: "accident",
            marker_url: "https://cdn.dock411.com/0000/brands/accident/marker-accident.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        big_box: {
            name: "Big Box",
            code: "big_box",
            marker_url: "https://cdn.dock411.com/0000/brands/big_box/marker-big_box.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        dealer: {
            name: "Dealer",
            code: "dealer",
            marker_url: "https://cdn.dock411.com/0000/brands/dealer/marker-dealer.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        debris: {
            name: "Debris",
            code: "debris",
            marker_url: "https://cdn.dock411.com/0000/brands/debris/marker-debris.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true,
        },
        dock: {
            name: "Dock",
            code: "dock",
            marker_url: "https://cdn.dock411.com/0000/brands/dock/marker-dock.svg",
            type: "point",
            multiple: false,
            is_facility_property: true,
            is_hazard: false
        },
        security_hut: {
            name: 'Driver Welcome Center',
            code: 'security_hut',
            marker_url: 'https://cdn.dock411.com/0000/brands/security_control/marker-security_control.svg',
            type: 'point',
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        fuel: {
            name: "Fuel",
            code: "fuel",
            marker_url: "https://cdn.dock411.com/0000/brands/fuel/marker-fuel.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        low_clearance: {
            name: "Low Clearance",
            code: "low_clearance",
            marker_url: "https://cdn.dock411.com/0000/brands/low_clearance/marker-low_clearance.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        low_wires: {
            name: "Low Wires",
            code: "low_wires",
            marker_url: "https://cdn.dock411.com/0000/brands/low_wires/marker-low_wires.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        maintenance: {
            name: "Maintenance",
            code: "maintenance",
            marker_url: "https://cdn.dock411.com/0000/brands/maintenance/marker-maintenance.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        man_door: {
            name: "Man Door",
            code: "man_door",
            marker_url: "https://cdn.dock411.com/0000/brands/man_door/marker-man_door.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        other: {
            name: "Other Hazard",
            code: "other",
            marker_url: "https://cdn.dock411.com/0000/brands/hazard/marker-hazard.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        parking: {
            name: "Parking",
            code: "parking",
            marker_url: "https://cdn.dock411.com/0000/brands/parking/marker-parking.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        parking_location: {
            name: "Parking Location",
            code: "parking_location",
            marker_url: "https://cdn.dock411.com/0000/brands/parking_location/marker-parking_location.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        pothole: {
            name: "Pothole",
            code: "pothole",
            marker_url: "https://cdn.dock411.com/0000/brands/pothole/marker-pothole.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        rest_area: {
            name: "Rest Area",
            code: "rest_area",
            marker_url: "https://cdn.dock411.com/0000/brands/rest_area/marker-rest_area.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        restaurant: {
            name: "Restaurant",
            code: "restaurant",
            marker_url: "https://cdn.dock411.com/0000/brands/restaurant/marker-restaurant.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        restrooms: {
            name: "Restrooms",
            code: "restrooms",
            marker_url: "https://cdn.dock411.com/0000/brands/restrooms/marker-restrooms.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        scale: {
            name: "Scale",
            code: "scale",
            marker_url: "https://cdn.dock411.com/0000/brands/scale/marker-scale.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        staging_area: {
            name: "Staging Area",
            code: "staging_area",
            marker_url: "https://cdn.dock411.com/0000/brands/staging_area/marker-staging_area.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        sweepout: {
            name: "Sweepout",
            code: "sweepout",
            marker_url: "https://cdn.dock411.com/0000/brands/sweepout/marker-sweepout.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        tight_turn: {
            name: "Tight Turn",
            code: "tight_turn",
            marker_url: "https://cdn.dock411.com/0000/brands/tight_turn/marker-tight_turn.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        truck_stop: {
            name: "Truck Stop",
            code: "truck_stop",
            marker_url: "https://cdn.dock411.com/0000/brands/truck_stop/marker-truck_stop.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        unknown: {
            name: 'Unknown',
            code: 'unknown',
            marker_url: 'https://cdn.dock411.com/0000/brands/unknown/marker-unknown.svg',
            type: 'point',
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        wash: {
            name: "Wash",
            code: "wash",
            marker_url: "https://cdn.dock411.com/0000/brands/wash/marker-wash.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        washout: {
            name: "Washout",
            code: "washout",
            marker_url: "https://cdn.dock411.com/0000/brands/washout/marker-washout.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        weigh_station: {
            name: "Weigh Station",
            code: "weigh_station",
            marker_url: "https://cdn.dock411.com/0000/brands/weigh_station/marker-weigh_station.svg",
            type: "point",
            multiple: true,
            is_facility_property: false,
            is_hazard: false
        },
        work_zone: {
            name: "Work Zone",
            code: "work_zone",
            marker_url: "https://cdn.dock411.com/0000/brands/work_zone/marker-work_zone.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: true
        },
        yard_entrance: {
            name: "Yard Entrance",
            code: "yard_entrance",
            marker_url: "https://cdn.dock411.com/0000/brands/yard_entrance/marker-yard_entrance.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        },
        do_not_enter: {
            name: "Do Not Enter",
            code: "do_not_enter",
            marker_url: "https://cdn.dock411.com/0000/brands/do_not_enter/marker-do_not_enter.svg",
            type: "point",
            multiple: true,
            is_facility_property: true,
            is_hazard: false
        }
    }
};

export const formatIconHover = (text: string): string =>
    text
        .split('_')
        .map((el) => el[0].toUpperCase() + el.slice(1))
        .join(' ');

export let setMarkerIconProperties = (icon: any) => {
    return L.icon({
        iconUrl: icon.marker_url,
        iconAnchor: [0, 60],
        iconSize: [38, 95], // size of the icon
        /*shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
    })
};
