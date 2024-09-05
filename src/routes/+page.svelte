<script>
/*import {D411FacilityMap} from "../components/index.js";*/

let json = {
    "version": 4,
    "copyright": `Copyright &copy; ${new Date().getFullYear()}, Dock411 LLC. All Rights Reserved.`,
    "center": {"lat": 39.853295061983964, "lng": -84.92518544197084},
    "markers": [{
        "id": 1813,
        "lat": 39.85288327698249,
        "lng": -84.92412328720094,
        "name": "Yard Entrance",
        "code": "yard_entrance"
    }, {
        "id": 1840,
        "lat": 39.853295061983964,
        "lng": -84.92518544197084,
        "name": "Man Door",
        "code": "man_door"
    }, {
        "id": 1850,
        "lat": 39.853834496598054,
        "lng": -84.92519080638887,
        "name": "Receiving",
        "code": "dock"
    }, {
        "id": 1859,
        "lat": 39.85352977832941,
        "lng": -84.92568969726564,
        "name": "Outbound",
        "code": "dock"
    }, {
        "id": 1868,
        "lat": 39.85313446612725,
        "lng": -84.92018043994904,
        "name": "Do Not Enter",
        "code": "do_not_enter"
    }, {
        "id": 1876,
        "lat": 39.85154907660896,
        "lng": -84.92051839828493,
        "name": "Do Not Enter",
        "code": "do_not_enter"
    }],
    "routes": [{
        "id": 2541,
        "name": "Best Route",
        "type": "",
        "vertices": [{"lat": 39.86241680831255, "lng": -84.91916656494142}, {
            "lat": 39.8605054823588,
            "lng": -84.91755723953247
        }, {"lat": 39.85971481203648, "lng": -84.9170207977295}, {
            "lat": 39.85688168814924,
            "lng": -84.91438150405884
        }, {"lat": 39.85090213950113, "lng": -84.90912437438966}, {
            "lat": 39.85090216834159,
            "lng": -84.91676330566408
        }, {"lat": 39.85161045457255, "lng": -84.9226212501526}, {
            "lat": 39.851626958049664,
            "lng": -84.92412328720094
        }, {"lat": 39.85268124007003, "lng": -84.9240803718567}],
        "isDirectional": true
    }],
    "areas": [{
        "id": 1913,
        "name": "Wrong Location",
        "type": "do_not_enter",
        "vertices": [{"lat": 39.853208587338585, "lng": -84.92144107818604}, {
            "lat": 39.853196233808916,
            "lng": -84.91990685462953
        }, {"lat": 39.851952633778644, "lng": -84.9190539121628}, {
            "lat": 39.851491425391025,
            "lng": -84.92050766944887
        }, {"lat": 39.85263208691847, "lng": -84.92147326469421}]
    }, {
        "id": 1935,
        "name": "Yard",
        "type": "yard",
        "vertices": [{"lat": 39.85459213903149, "lng": -84.9265319108963}, {
            "lat": 39.85454684365826,
            "lng": -84.92387115955354
        }, {"lat": 39.85286265810692, "lng": -84.9239194393158}, {
            "lat": 39.85288714502147,
            "lng": -84.92657482624055
        }]
    }, {
        "id": 2102,
        "name": "Richmond Cold Storage",
        "type": "building_structure",
        "vertices": [{"lat": 39.85418866371015, "lng": -84.92548584938051}, {
            "lat": 39.85418866371015,
            "lng": -84.92509961128236
        }, {"lat": 39.85329098091649, "lng": -84.92511570453644}, {
            "lat": 39.85329098091649,
            "lng": -84.92523372173311
        }, {"lat": 39.85352981509963, "lng": -84.925217628479}, {
            "lat": 39.853533932923064,
            "lng": -84.92538392543793
        }, {"lat": 39.85334039495361, "lng": -84.92539465427399}, {
            "lat": 39.853348630623,
            "lng": -84.92551267147066
        }, {"lat": 39.853538050746295, "lng": -84.92552340030672}, {
            "lat": 39.85352569727591,
            "lng": -84.92567360401155
        }, {"lat": 39.85383453336809, "lng": -84.9256682395935}, {
            "lat": 39.85384276897817,
            "lng": -84.92551267147066
        }]
    }, {
        "id": 2123,
        "name": "Parking area",
        "type": "parking",
        "vertices": [{"lat": 39.853253936227034, "lng": -84.92592036724092}, {
            "lat": 39.85324981838678,
            "lng": -84.92542684078217
        }, {"lat": 39.853052161764104, "lng": -84.92542684078217}, {
            "lat": 39.85305627961619,
            "lng": -84.92593109607698
        }]
    }]
}
let editMode = true;

</script>
<h1>Original facility map project</h1>
<div class="flex flex-col bg-[gray]">
	<div class="h-[50px]">
		<button on:click={()=>{editMode = false}}>View</button>
		<button on:click={() =>{editMode = true}}>Edit</button>
	</div>
	<div>

		{#if typeof window != 'undefined'}
			<d411-facility-map d411FacilityMapData={json} editMode={editMode} lat="39.85288327698249" lng="-84.92412328720094"></d411-facility-map>
		{/if}
		<!--<D411FacilityMap bind:d411FacilityMapData={json} bind:editMode={editMode} lat="39.85288327698249" lng="-84.92412328720094"></D411FacilityMap>-->
	</div>
</div>
