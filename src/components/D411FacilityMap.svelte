<!--<svelte:options customElement={{tag: 'd411-facility-map',shadow: 'none'}}/>-->

<script lang="ts">
    import L from "leaflet"; // see this comment on how to import leaflet // https://github.com/Leaflet/Leaflet/issues/8451#issuecomment-1255151316
    import "leaflet-draw";
    import 'leaflet-arrowheads';
    import 'leaflet-path-drag';

    import {createEventDispatcher, onMount} from "svelte";
    import Subtitle from "../lib/Subtitle.svelte";
    import MapWrapper from "../lib/MapWrapper.svelte";
    import OptionWrapper from "../lib/OptionWrapper.svelte";
    import Switch from "../lib/Switch.svelte";
    import Modal from "../lib/Modal.svelte";
    import {AREA_COLORS, AREA_ICONS, formatIconHover, icons, setMarkerIconProperties} from "../constants";
    import D411MarkersTray from "../lib/D411MarkersTray.svelte";
    import ModalButton from "../lib/buttons/ModalButton.svelte";
    import {copyObject, isJsonString} from "../lib/utilities/utilities";

    const dispatch = createEventDispatcher();

    export let editMode = false;

    export let lat = null;
    export let lng = null;
    export let getD411FacilityMapDataCallback = undefined;
    export let d411FacilityMapData = {
        version: 4,
        copyright: `Copyright &copy; ${new Date().getFullYear()}, Dock411 LLC. All Rights Reserved.`,
        markers: [],
        routes: [],
        areas: []
    }
    export let initialMapTiles = null;
    export let initialZoom = 19;
    export let scrollingLocked = false;
    export let poisAndHazards = null;
    export let width = null;
    export let height = null;

    export let recenterMap = undefined;

    let map;
    let open_street_maps_tile_layer;
    let google_tile_layer;
    let draw_control;
    let editable_layer = new L.FeatureGroup();
    $: clicked_layer_information = {
        layer_type: '',
        id: 0,
        name: '',
        code: '',
        type: '',
        border: '',
        fill: '',
        is_hazard: false,
        marker_url: '',
        is_facility_property: '',
        vertices: []
    }
    let isEditing = false;
    let hideControls = false;
    let icon;
    let visible = false;
    let draw_marker

    let selectedItemLayer = {
        id: null,
        type: ''
    };

    let dialog;
    let markersTypeToDisplay = 'on-site-features';

    /*show modal with information*/
    let showPopup = false;
    const onShowPopup = () => {
        showPopup = true;
    }

    const closePopup = () => {
        showPopup = false;
    }

    let toggleVisible = () => {
        visible = !visible
    }

    const validateD411FacilityMapData = (d411FacilityMapDataIn) => {

        // If you want null, arrays or functions to be excluded, just make it: and that passed in value is strictly object
        if (typeof d411FacilityMapDataIn === 'object' && !Array.isArray(d411FacilityMapDataIn) && d411FacilityMapDataIn !== null) {
            d411FacilityMapDataIn = JSON.stringify(d411FacilityMapDataIn)
        }

        if (d411FacilityMapDataIn && isJsonString(d411FacilityMapDataIn) && d411FacilityMapDataIn?.includes("version")) {

            d411FacilityMapDataIn = JSON.parse(d411FacilityMapDataIn);

        } else if(lat && lng) {

            let _tmp = copyObject(d411FacilityMapData);
            _tmp.center.lat = lat;
            _tmp.center.lng = lng;
            d411FacilityMapDataIn = copyObject(d411FacilityMapData);

        } else {

            d411FacilityMapDataIn = copyObject(d411FacilityMapData);
        }

        return d411FacilityMapDataIn
    }

    let fitMapToBounds = (mapInstance, mapData) => {

        let bounds = [];


        mapData.areas.map(area => {
            area.vertices.forEach(ver => {
                bounds.push([ver.lat,ver.lng]);
            })
        });

        if (bounds.length) {
            mapInstance.fitBounds(bounds, {maxZoom : 18});
        }
    }
    let init = () => {

        d411FacilityMapData = validateD411FacilityMapData(d411FacilityMapData);

        if (typeof window !== 'undefined') {
            open_street_maps_tile_layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                maxNativeZoom: 19,
                maxZoom: 25
            })

            google_tile_layer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                maxNativeZoom: 19,
                maxZoom: 25
            });

            let base_maps = {
                "OpenStreetMap": open_street_maps_tile_layer,
                "GoogleSatellite": google_tile_layer
            };

            if (map) {
                map.remove()
            }

            if (lat && lng) {
                map = L.map('map', {scrollWheelZoom: scrollingLocked}).setView([lat, lng], initialZoom);

                if (!d411FacilityMapData) {
                    // Creating a marker
                    let marker = L.marker([lat, lng]);

                    // Adding marker to the map
                    marker.addTo(map);
                }

            } else {
                map = L.map('map', {scrollWheelZoom: scrollingLocked}).setView([41.9363511, -87.6642444], initialZoom);
                fitMapToBounds(map, d411FacilityMapData)
            }

            L.control.layers(base_maps).addTo(map);

            if (initialMapTiles === 'google') {
                map.addLayer(google_tile_layer)
            } else {
                map.addLayer(open_street_maps_tile_layer)
            }

            map.addLayer(editable_layer);

            draw_control = new L.Control.Draw({
                position: 'topleft',
                draw: {
                    polyline: {
                        shapeOptions: {
                            color: '#38f',
                            weight: 4,
                            opacity: 1
                        }
                    },
                    polygon: {
                        allowIntersection: true, // Restricts areas to simple polygons
                        drawError: {
                            color: '#7d53de', // Color the shape will turn when intersects
                            message: '<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)' // Message that will show when intersect
                        },
                        draggable: true,
                        shapeOptions: {
                            color: '#7d53de',
                            opacity: 1
                        },
                    },
                    circle: false, // Turns off this drawing tool
                    circlemarker: false,
                    rectangle: false,
                    marker: {
                        icon: "",
                        draggable: true
                    },
                    draw: {
                        circle: false
                    }
                },
                edit: {
                    featureGroup: editable_layer, //REQUIRED!!
                    remove: true
                },
            });

            map.addControl(draw_control);

            map.on('draw:created', (e) => _leafletDrawCreated(e, editable_layer));

            map.on('draw:edited', (e) => _leafletDrawEdited(e));
            // map.on('draw:deleted', (e) => _leafletDrawDelete(e));
            map.on('click', function (e) {
                closeAddNewModal()
                closeEditMode()
            });

            drawItemsOnMapFromDock411Json(d411FacilityMapData);

            if (!editMode) {
                for (const [key, value] of Object.entries(editable_layer._layers)) {
                    value.dragging.disable()

                }
            }
        }

    }

    let drawItemsOnMapFromDock411Json = (map_data_in) => {

        let markers = []
        let routes = []
        let areas = []

        map_data_in.markers.forEach((value, index) => {

            let Icon = L.icon({
                iconUrl: icons['marker_types']['unknown']['marker_url'],
                iconAnchor: [0, 60],
                iconSize: [38, 95]
            });

            if (icons['marker_types'][value.code]) {
                Icon = L.icon({
                    iconUrl: icons['marker_types'][value.code]['marker_url'],
                    iconAnchor: [0, 60],
                    iconSize: [38, 95]
                });
            }

            let marker = L.marker([value.lat, value.lng], {
                icon: Icon,
                draggable: true
            }).on('click', (e) => _layerOnClick(e, 'marker'));

            marker.d411_id = value.id

            marker.on('dragend', function (e) {
                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
                map_data_to_edit.markers.forEach(((value, index) => {
                    if (value.id === marker.d411_id) {
                        value.lat = e.target.getLatLng().lat
                        value.lng = e.target.getLatLng().lng
                    }
                }))
                d411FacilityMapData = {...map_data_to_edit}
            });

            marker.addTo(editable_layer)
            markers.push(value)
        })

        map_data_in.routes.forEach(((value, index) => {

            if (value.isDirectional) {
                let route = L.polyline((value.vertices), {draggable: true}).arrowheads({
                    size: '20px',
                    frequency: 'allvertices'
                })
                route.d411_id = value.id
                enableNodeTransformation(route, 'polyline')
                route.addTo(editable_layer)
                routes.push(value)
            } else {
                let route = L.polyline(value.vertices)
                route.d411_id = value.id

                enableNodeTransformation(route, 'polyline')
                route.addTo(editable_layer)
                routes.push(value)
            }
        }))

        map_data_in.areas.forEach(((value, index) => {
            let lat_lng = []
            value.vertices.map((v) => {
                lat_lng.push([v.lat, v.lng])
            })

            let styles_to_set = AREA_COLORS.filter(v => {
                return v.type === value.type
            })

            let area = L.polygon(value.vertices, {draggable: true}).setStyle({
                color: styles_to_set.length ? styles_to_set[0].border : AREA_COLORS[7].border,
                fillColor: styles_to_set.length ? styles_to_set[0].fill : AREA_COLORS[7].fill,
                fillOpacity: 0.35
            })

            enableNodeTransformation(area, 'polygon')
            area.d411_id = value.id
            area.addTo(editable_layer)
            areas.push(value)

        }))

    }
    let _leafletDrawCreated = (e, draw_items_feature_group) => {

        let type = e.layerType,
            layer = e.layer;

        draw_items_feature_group.addLayer(layer);
        /*_leaflet_id can only be extracted after adding layer to editables feature group*/
        layer.d411_id = layer._leaflet_id
        if (type === 'marker') {
            draw_items_feature_group.removeLayer(layer.d411_id);

            let iconOptions = {
                iconUrl: clicked_layer_information.marker_url,
                iconAnchor: [0, 60],
                iconSize: [38, 95]
            }
            let customIcon = L.icon(iconOptions);
            let markerOptions = {
                clickable: true,
                draggable: true,
                icon: customIcon
            }
            let newMarker = L.marker([layer.getLatLng().lat, layer.getLatLng().lng], {
                icon: customIcon,
                draggable: true
            }).on('click', (e) => _layerOnClick(e, 'marker'));
            let marker_object = {
                id: layer._leaflet_id,
                lat: layer.getLatLng().lat,
                lng: layer.getLatLng().lng,
                name: clicked_layer_information.name,
                code: clicked_layer_information.code,
            }

            d411FacilityMapData.markers.push(marker_object)
            d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData))

            newMarker.d411_id = layer._leaflet_id
            newMarker.addTo(draw_items_feature_group)

            newMarker.on('dragend', function (e) {
                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
                map_data_to_edit.areas.forEach(((value, index) => {
                    if (value.id === layer.d411_id) {
                        value.lng = e.target.getLatLngs().lng
                        value.lat = e.target.getLatLng().lat
                    }
                }))
                d411FacilityMapData = {...map_data_to_edit}
            });

            if (icon.is_hazard === true) {
                toggleVisible_hazards()
            }
            if (icon.is_hazard === false) {
                toggleVisible_markers()
            }
            selectedItemLayer.id = layer.d411_id
        }

        if (type === 'polygon') {
            draw_items_feature_group.removeLayer(layer.d411_id);

            let styles_to_set = AREA_COLORS.filter(v => {
                return v.type === clicked_layer_information.type
            })
            let area = L.polygon(layer.getLatLngs(), {draggable: true}).setStyle({
                color: styles_to_set.length ? styles_to_set[0].border : AREA_COLORS[7].border,
                fillColor: styles_to_set.length ? styles_to_set[0].fill : AREA_COLORS[7].fill,
                fillOpacity: 0.35
            })

            let area_object = {
                id: layer._leaflet_id,
                name: clicked_layer_information.name,
                vertices: layer.getLatLngs()[0],
                type: clicked_layer_information.type,
            }

            d411FacilityMapData.areas.push(area_object)
            d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData))
            area.d411_id = layer._leaflet_id
            area.addTo(draw_items_feature_group)

            enableNodeTransformation(area, type)
            selectedItemLayer.id = layer.d411_id

        }

        if (type === "polyline") {
            // remove the line drawn by leaflet so you can leave the arrow head
            draw_items_feature_group.removeLayer(layer._leaflet_id);

            let arrow_line = L.polyline(layer.getLatLngs(), {draggable: true}).arrowheads({
                size: '20px',
                frequency: 'allvertices'
            })

            arrow_line.layerType = 'polyline'
            arrow_line.isDirectional = true
            arrow_line.addTo(draw_items_feature_group);
            arrow_line.d411_id = arrow_line._leaflet_id

            let route_object = {
                id: arrow_line._leaflet_id,
                name: `Route`,
                type: "",
                vertices: arrow_line.getLatLngs(),
                isDirectional: true
            }

            d411FacilityMapData.routes.push(route_object)
            d411FacilityMapData = JSON.parse(JSON.stringify(d411FacilityMapData))
            enableNodeTransformation(arrow_line, 'polyline')

        }
    }


    let _leafletDrawEdited = (e) => {
        let layers = e.layers;
        layers.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
                let index_of_marker_being_edited = map_data_to_edit.markers.findIndex(marker => marker.id === layer.d411_id)
                if (map_data_to_edit.markers[index_of_marker_being_edited]) {
                    map_data_to_edit.markers[index_of_marker_being_edited].lat = layer.getLatLng().lat
                    map_data_to_edit.markers[index_of_marker_being_edited].lng = layer.getLatLng().lng
                    d411FacilityMapData = map_data_to_edit
                }
            }

            if (layer instanceof L.Polygon) {

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
                let index_of_area_being_edited = map_data_to_edit.areas.findIndex(area => area.id === layer.d411_id)

                map_data_to_edit.areas[index_of_area_being_edited].vertices = layer.getLatLngs()[0]

                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit))
            }

            // this is a polyline
            if ((layer instanceof L.Polyline) && !(layer instanceof L.Polygon)) {

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
                let index_of_route_being_edited = map_data_to_edit.routes.findIndex(route => route.id === layer.d411_id)

                map_data_to_edit.routes[index_of_route_being_edited].vertices = layer.getLatLngs()

                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit))

            }
        });
    }

    let _leafletDrawDelete = (e) => {
        let layers = e.layers;

        layers.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))

                map_data_to_edit.markers = map_data_to_edit.markers.filter(marker => marker.id !== layer.d411_id)

                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit))

            }

            if (layer instanceof L.Polygon) {

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))

                map_data_to_edit.areas = map_data_to_edit.areas.filter(area => area.id !== layer.d411_id)

                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit))
            }

            // this is a polyline
            if ((layer instanceof L.Polyline) && !(layer instanceof L.Polygon)) {

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))

                map_data_to_edit.routes = map_data_to_edit.routes.filter(route => route.id !== layer.d411_id)

                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit))
            }
        });
    }


    const handleSideMenuClick = (type, id) => {
        map_disable()
        if (type === "polygon") {

            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))

            let index_of_area_being_edited = map_data_to_edit.areas.findIndex(area => area.id === id)
            let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information))

            clicked_layer_temp.layer_type = 'polygon'
            clicked_layer_temp.id = map_data_to_edit.areas[index_of_area_being_edited].id
            clicked_layer_temp.code = ''
            clicked_layer_temp.name = map_data_to_edit.areas[index_of_area_being_edited].name
            clicked_layer_temp.type = map_data_to_edit.areas[index_of_area_being_edited].type
            clicked_layer_temp.code = map_data_to_edit.areas[index_of_area_being_edited].type

            if (AREA_ICONS[map_data_to_edit.areas[index_of_area_being_edited].type]) {
                clicked_layer_temp.border = AREA_ICONS[map_data_to_edit.areas[index_of_area_being_edited].type].border;
            } else {
                clicked_layer_temp.border = AREA_ICONS.other.border;
            }

            clicked_layer_information = clicked_layer_temp

            onShowPopup()
            showPopup = true
            //save the previous value of the clicked object in previous_value_of_map_data
            previous_value_of_map_data = map_data_to_edit.areas[index_of_area_being_edited]
            current_edit_value_of_name = clicked_layer_temp.name

            previous_radio_value_type = previous_value_of_map_data.type
            previous_radio_value_name = area_names[previous_value_of_map_data.type]


            selectedItemLayer.id = clicked_layer_temp.id;
            selectedItemLayer.type = 'area';
        }

        if (type === "marker") {

            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_marker_being_edited = map_data_to_edit.markers.findIndex(marker => marker.id === id)
            let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information))


            if (map_of_hazard_codes.includes(clicked_layer_information.code)) {
                clicked_layer_information.is_hazard = true
            } else {
                clicked_layer_information.is_hazard = false
            }

            clicked_layer_temp.layer_type = 'marker'

            clicked_layer_temp.id = map_data_to_edit.markers[index_of_marker_being_edited].id
            clicked_layer_temp.code = map_data_to_edit.markers[index_of_marker_being_edited].code
            clicked_layer_temp.name = map_data_to_edit.markers[index_of_marker_being_edited].name

            clicked_layer_temp.type = map_data_to_edit.markers[index_of_marker_being_edited].code

            clicked_layer_temp.is_hazard = map_of_hazard_codes.includes(map_data_to_edit.markers[index_of_marker_being_edited].code)

            if (icons.marker_types[map_data_to_edit.markers[index_of_marker_being_edited].code]) {
                clicked_layer_temp.marker_url = icons.marker_types[map_data_to_edit.markers[index_of_marker_being_edited].code].marker_url;
            } else {
                clicked_layer_temp.marker_url = icons.marker_types.other.marker_url;
            }

            clicked_layer_information = clicked_layer_temp

            //save the previous value of the clicked object in previous_value_of_map_data
            previous_value_of_map_data = map_data_to_edit.markers[index_of_marker_being_edited]
            //current_edit_value_of_name is the name that is displayed in the text box
            current_edit_value_of_name = clicked_layer_temp.name

            //previous_radio_value
            previous_radio_value_type = previous_value_of_map_data.type
            previous_radio_value_name = icons.marker_types[previous_value_of_map_data.code].name

            onShowPopup()
            showPopup = true

            selectedItemLayer.id = clicked_layer_temp.id;
            selectedItemLayer.type = 'marker';
        }
        if (type === "polyline") {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))

            let index_of_route_being_edited = map_data_to_edit.routes.findIndex(area => area.id === id)

            let clicked_layer_temp = JSON.parse(JSON.stringify(clicked_layer_information))

            clicked_layer_temp.layer_type = 'polyline'
            clicked_layer_temp.id = map_data_to_edit.routes[index_of_route_being_edited].id
            clicked_layer_temp.code = ''
            clicked_layer_temp.name = map_data_to_edit.routes[index_of_route_being_edited].name
            clicked_layer_information = clicked_layer_temp
            onShowPopup()
            showPopup = true
            //save the previous value of the clicked object in previous_value_of_map_data
            previous_value_of_map_data = map_data_to_edit.routes[index_of_route_being_edited]
            current_edit_value_of_name = clicked_layer_temp.name

            selectedItemLayer.id = clicked_layer_temp.id;
            selectedItemLayer.type = 'route';
        }
    }

    let _layerOnClick = (e, type) => {
        current_edit_value_of_name = "";
        let layer = e.target

        map_disable()


        if (type === 'marker') {
            handleSideMenuClick(type, layer.d411_id)
        }

        if (type === 'polygon') {
            handleSideMenuClick(type, layer.d411_id)
        }

        if (type === 'polyline') {
            handleSideMenuClick(type, layer.d411_id)
        }
    };


    onMount(() => {
        if (window && typeof window != 'undefined') {
            init();
            if (document.getElementsByClassName('leaflet-draw-section').length) {
                document.getElementsByClassName('leaflet-draw-section')[0].style.visibility = 'hidden';
            }
            if (document.querySelectorAll('.leaflet-draw-toolbar').length) {
                document.querySelectorAll('.leaflet-draw-toolbar').forEach((item) => {
                    item.style.visibility = 'hidden'
                })
            }
        }
    });

    function dispatchMapData() {
        dispatch('getD411FacilityMapDataCallback', {
            data: d411FacilityMapData
        });
    }

    $: if (d411FacilityMapData) {
        dispatchMapData()
    }

    $: if (lat && lng && map) {
        map.setView([lat, lng]);
    }

    const initiateAreaDraw = () => {
        draw_control.options.draw.polygon.shapeOptions.color = clicked_layer_information.border
        document.getElementById("map").focus();
        if (document.querySelector('.leaflet-draw-draw-polygon')) {
            document.querySelector('.leaflet-draw-draw-polygon').click()
        }
    }

    const initiateRouteDraw = () => {
        document.getElementById("map").focus();
        if (document.querySelector('.leaflet-draw-draw-polyline')) {
            document.querySelector('.leaflet-draw-draw-polyline').click()
        }
    }

    const deleteItem = (id, type) => {
        editable_layer.removeLayer(id);
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));

        switch (type) {
            case "route":
                map_data_to_edit.routes = map_data_to_edit.routes.filter(route => route.id !== id);
                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit));
                map.eachLayer((layer) => {
                    if (layer.d411_id === clicked_layer_information.id) {
                        layer.remove(id)
                    }
                })
                break;
            case "area":
                map_data_to_edit.areas = map_data_to_edit.areas.filter(area => area.id !== id)
                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit));
                map.eachLayer((layer) => {
                    if (layer.d411_id === clicked_layer_information.id) {
                        layer.remove(id)
                    }
                })

                break;
            case "marker":
                map_data_to_edit.markers = map_data_to_edit.markers.filter(marker => marker.id !== id)
                /*this is done to strip out the leaflet function attached by the getLatLngs method*/
                d411FacilityMapData = JSON.parse(JSON.stringify(map_data_to_edit));
                map.eachLayer((layer) => {
                    if (layer.d411_id === clicked_layer_information.id) {
                        layer.remove(id)
                    }
                })
                break;
        }
    }

    const saveEdit = () => {
        document.querySelector('.leaflet-draw-edit-edit').click();
        document.querySelector('[title="Save changes"]').click();
        isEditing = false;
    }

    const initiateEdit = (id) => {
        editable_layer.getLayer(id).editing.enable();
        isEditing = true;
    }

    const onNameInputChange = (e) => {
        current_edit_value_of_name = e.target.value
    }

    const onTypeInputChange = (selected_area_type, clicked_layer_type) => {
        if (selected_area_type === "area") {
            let layer_to_edit = null;
            editable_layer.eachLayer((layer) => {
                if (layer.d411_id === clicked_layer_information.id) {
                    layer_to_edit = layer
                    let styles_to_set = AREA_COLORS.filter(v => {
                        return v.type === clicked_layer_type
                    })
                    layer_to_edit.setStyle({
                        color: styles_to_set[0].border,
                        fillColor: styles_to_set[0].fill,
                        fillOpacity: 0.35
                    })

                }

            })


        }
        if (selected_area_type === "marker") {
            let layer_to_remove = null;
            editable_layer.eachLayer((layer) => {
                if (layer.d411_id == clicked_layer_information.id) {
                    layer_to_remove = layer

                }
            })

            let iconToChange = L.icon({
                iconUrl: icons.marker_types[clicked_layer_information.type] ? icons.marker_types[clicked_layer_information.type].marker_url : icons.marker_types.other.marker_url,
                iconAnchor: [0, 60],
                iconSize: [38, 95]
            });

            let lat = layer_to_remove.getLatLng().lat;
            let lng = layer_to_remove.getLatLng().lng;
            editable_layer.removeLayer(layer_to_remove._leaflet_id);

            let marker = L.marker([lat, lng], {
                icon: iconToChange,
                draggable: true
            }).on('click', (e) => _layerOnClick(e, 'marker'));
            marker.d411_id = clicked_layer_information.id;
            marker.addTo(editable_layer)
        }
    }

    $: if (icon) {
        if (draw_marker) {
            draw_marker.disable();
            draw_marker = null
        }
        draw_marker = new L.Draw.Marker(map, {icon: setMarkerIconProperties(icon), "draggable": true});
        draw_marker.enable();
    }


    let minimize = false;

    const toogleMinimize = () => {
        minimize = !minimize;
    };


    let previous_value_of_map_data = null;
    let current_edit_value_of_name = '';

    const cancelItem = (id, type) => {


        if (type === 'marker') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_marker_being_edited = map_data_to_edit.markers.findIndex(previous_value_of_map_data => previous_value_of_map_data.id === id)
            map_data_to_edit.markers[index_of_marker_being_edited].name = previous_value_of_map_data.name
            map_data_to_edit.markers[index_of_marker_being_edited].type = previous_value_of_map_data.type
            d411FacilityMapData = map_data_to_edit

        }
        if (type === 'area') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_area_being_edited = map_data_to_edit.areas.findIndex(previous_value_of_map_data => previous_value_of_map_data.id === id)
            map_data_to_edit.areas[index_of_area_being_edited].name = previous_value_of_map_data.name
            map_data_to_edit.areas[index_of_area_being_edited].type = previous_value_of_map_data.type
            map_data_to_edit.areas[index_of_area_being_edited]
            d411FacilityMapData = map_data_to_edit


        }
        if (type === 'route') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_route_being_edited = map_data_to_edit.routes.findIndex(previous_value_of_map_data => previous_value_of_map_data.id === id)
            map_data_to_edit.routes[index_of_route_being_edited].name = previous_value_of_map_data.name
            d411FacilityMapData = map_data_to_edit
        }
        current_edit_value_of_name = previous_value_of_map_data.name
    };
    //the third parameter (value_type) is the clicked_layer_information.type
    const saveItem = (id, selected_item_type) => {
        map_enable()
        if (current_edit_value_of_name === "") {
            if (selected_item_type === "area") {
                current_edit_value_of_name = area_names[clicked_layer_information.type]
            }
            if (selected_item_type === "marker") {
                current_edit_value_of_name = icons.marker_types[clicked_layer_information.type].name
            }
            if (selected_item_type === "route") {
                current_edit_value_of_name = "Route"
            }
        }
        if (selected_item_type === 'marker') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_marker_being_edited = map_data_to_edit.markers.findIndex(current_edit_value_of_name => current_edit_value_of_name.id === clicked_layer_information.id)
            map_data_to_edit.markers[index_of_marker_being_edited].name = current_edit_value_of_name
            map_data_to_edit.markers[index_of_marker_being_edited].code = clicked_layer_information.type
            onTypeInputChange(selected_item_type, clicked_layer_information.type)
            d411FacilityMapData = map_data_to_edit

        }
        if (selected_item_type === 'area') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_area_being_edited = map_data_to_edit.areas.findIndex(current_edit_value_of_name => current_edit_value_of_name.id === clicked_layer_information.id)
            map_data_to_edit.areas[index_of_area_being_edited].name = current_edit_value_of_name
            map_data_to_edit.areas[index_of_area_being_edited].type = clicked_layer_information.type
            map_data_to_edit.areas[index_of_area_being_edited].code = clicked_layer_information.code
            onTypeInputChange(selected_item_type, clicked_layer_information.type)
            d411FacilityMapData = map_data_to_edit
        }
        if (selected_item_type === 'route') {
            let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
            let index_of_route_being_edited = map_data_to_edit.routes.findIndex(current_edit_value_of_name => current_edit_value_of_name.id === clicked_layer_information.id)
            map_data_to_edit.routes[index_of_route_being_edited].name = current_edit_value_of_name
            d411FacilityMapData = map_data_to_edit
        }

    };

    const area_names = {
        building_structure: "Building/Structure",
        parking: "Parking",
        do_not_enter: "Do Not Enter",
        staging: "Staging",
        yard: "Yard",
        secure: "Secure",
        other: "Other",
        unknown: "Unknown"
    };

    $:previous_radio_value_type = '';
    $:previous_radio_value_name = '';

    const name_default_changer = (type) => {
        if (type === "polygon") {
            if (clicked_layer_information.type != previous_radio_value_type) {
                if (previous_radio_value_name === current_edit_value_of_name) {
                    clicked_layer_information.name = area_names[clicked_layer_information.type]
                    previous_radio_value_type = clicked_layer_information.type
                    previous_radio_value_name = clicked_layer_information.name
                    current_edit_value_of_name = clicked_layer_information.name
                }
            }
        }
        if (type === 'marker') {
            if (clicked_layer_information.type != previous_radio_value_type) {
                if (previous_radio_value_name === current_edit_value_of_name) {
                    clicked_layer_information.name = icons.marker_types[clicked_layer_information.type].name
                    previous_radio_value_type = clicked_layer_information.type
                    previous_radio_value_name = clicked_layer_information.name
                    current_edit_value_of_name = clicked_layer_information.name
                    clicked_layer_information.marker_url = icons.marker_types[clicked_layer_information.type].marker_url
                }
            }
        }

    };
    const closeAddNewModal = () => {
        visible_areas = false;
        visible_hazards = false;
        visible_markers = false;
    };
    const closeEditMode = () => {
        nodeEditMode = false
        for (const [key, value] of Object.entries(editable_layer._layers)) {
            if (value.editing && value.editing.enabled()) {

                value.editing.disable();

                let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData));
                if (value instanceof L.Polygon) {
                    map_data_to_edit.areas.forEach(((area, index) => {
                        if (value.d411_id === area.id) {
                            let _latlngs = value.getLatLngs();
                            let latlngs = [];

                            _latlngs.forEach(lln => {
                                lln.forEach(l => {
                                    latlngs.push({lat: l.lat, lng: l.lng})
                                })
                            })
                            area.vertices = latlngs
                            d411FacilityMapData = {...map_data_to_edit}
                        }
                    }))

                } else if (value instanceof L.Polyline) {
                    map_data_to_edit.routes.forEach(((route, index) => {
                        if (value.d411_id === route.id) {
                            let _latlngs = value.getLatLngs();
                            let latlngs = [];

                            _latlngs.forEach(l => {
                                latlngs.push({lat: l.lat, lng: l.lng})
                            })
                            route.vertices = latlngs
                            d411FacilityMapData = {...map_data_to_edit}
                        }
                    }))

                }
            }

        }
    };

    let visible_areas = false;
    let visible_hazards = false;
    let visible_markers = false;

    let toggleVisible_areas = () => {
        visible_areas = !visible_areas
    };
    let toggleVisible_hazards = () => {
        visible_hazards = !visible_hazards
    };
    let toggleVisible_markers = () => {
        visible_markers = !visible_markers
    };

    const check_other_add_new_modals = (type) => {
        if (type === "areas") {
            if (visible_hazards === true) {
                toggleVisible_hazards()
            }
            if (visible_markers === true) {
                toggleVisible_markers()
            }
        }
        if (type === "markers") {
            if (visible_areas === true) {
                toggleVisible_areas()
            }
            if (visible_hazards === true) {
                toggleVisible_hazards()
            }
        }
        if (type === "hazards") {
            if (visible_areas === true) {
                toggleVisible_areas()
            }
            if (visible_markers === true) {
                toggleVisible_markers()
            }
        }
    };
    const map_of_hazard_codes = [
        "accident",
        "debris",
        "low_clearance",
        'low_wires',
        'other',
        'pothole',
        'tight_turn',
        'work_zone'
    ];

    let pressTimer;
    let holdClick = false;

    const map_disable = () => {
        if (map) {
            map.dragging.disable()
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
        }
    };

    const map_enable = () => {
        if (map) {
            map.dragging.enable()
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
        }
    }

    let nodeEditMode = false;

    const enableEditingMode = (polygon_or_polyline) => {
        nodeEditMode = true
        polygon_or_polyline.editing.enable()
    };
    const disableEditingMode = (polygon_or_polyline) => {
        nodeEditMode = false
        polygon_or_polyline.editing.disable()

    }

    setInterval(() => {
        if (showPopup) {
            map_disable()
        } else {
            map_enable()
        }
    }, 500);


    const enableNodeTransformation = (polygon_or_polyline, type) => {
        let map_data_to_edit = JSON.parse(JSON.stringify(d411FacilityMapData))
        //* This is the function to enable the hold down node edit mode + the onclick modal open of the polygons and polylines
        const mouseUpCheck = () => {
            clearTimeout(pressTimer);
            window.removeEventListener('mouseup', mouseUpCheck);
        }
        // This is to update the json when the polygon or polyline is dragged to a new position

        polygon_or_polyline.on('dragend', function (e) {
            map_data_to_edit.areas.forEach(((value, index) => {
                if (value.id === polygon_or_polyline.d411_id) {
                    let _latlngs = e.target.getLatLngs();
                    let latlngs = [];

                    _latlngs.forEach(lln => {
                        lln.forEach(l => {
                            latlngs.push({lat: l.lat, lng: l.lng})
                        })
                    })

                    value.vertices = latlngs

                    d411FacilityMapData = {...map_data_to_edit}
                }
            }))
        })
        polygon_or_polyline.addEventListener('mousedown', function (e) {
            L.DomEvent.stopPropagation(e);
            polygon_or_polyline.addEventListener('mouseup', mouseUpCheck);
            pressTimer = window.setTimeout(function () {
                holdClick = true;
                closeEditMode()
                if (holdClick === true) {
                    nodeEditMode = true
                    if (editMode) {
                        editable_layer.eachLayer(function (layer) {
                            if (layer.d411_id == polygon_or_polyline.d411_id) {
                                layer.editing.enable();
                            }
                        });
                    }
                }
            }, 500);
        });
        polygon_or_polyline?.addEventListener('drag', () => {
            disableEditingMode(polygon_or_polyline)
        });

        polygon_or_polyline?.addEventListener('click', function (event) {
            L.DomEvent.stopPropagation(event);
            if (holdClick) {
                holdClick = false;
                return;
            }
            _layerOnClick(event, type);
        })
    }

    $: if (!editMode && editable_layer) {
        for (const [key, value] of Object.entries(editable_layer._layers)) {
            value.dragging.disable()
        }
    } else {
        for (const [key, value] of Object.entries(editable_layer._layers)) {
            value.dragging.enable()
        }
    }

</script>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css"
      integrity="sha512-gc3xjCmIy673V6MyOAZhIW93xhM9ei1I+gLbmFjUHIjocENRsLX/QUE1htk5q1XV2D/iie/VQ8DXI6Vu8bexvQ=="
      crossorigin="anonymous" referrerpolicy="no-referrer"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
<div class="relative overflow-y-hidden">
    <D411MarkersTray type={markersTypeToDisplay} bind:icon={icon}
                     bind:clicked_layer_information={clicked_layer_information} {initiateAreaDraw} {visible_areas}
                     {visible_hazards} {visible_markers}/>
    <MapWrapper>
        <div>
            {#if !minimize}
                <div class="side-menu w-[250px] bg-[#D9D9D9] border-r-[2px] border-r-[#C9C9C9]">
                    <button class="facility-header flex p-5 gap-5 bg-white w-full h-[10px]" on:click={toogleMinimize}>
                        <img class="w-5 h-7 mt-[-13px]"
                             src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-right-double.svg"
                             alt="chevron"/>
                        <p class="text-xl font-medium mt-[-13px]">Facility Map</p>
                    </button>
                    <OptionWrapper let:toggleHidde let:hidde>
                        <div class="flex flex-col w-full ">
                            <Subtitle subTitle="Areas"
                                      img="https://cdn-test.dock411.com/0000/d411-facility-map/editor/area-icon.svg"
                                      {toggleHidde} {hidde}/>
                            {#if !hidde}
                                <div class="">
                                    {#each d411FacilityMapData.areas as area}
                                        <div class="area-container pt-0.5 pb-0.5">
                                            <div class="side-bar-icon ">
                                                <button on:click={(e)=> {
                                                        handleSideMenuClick("polygon",area.id)}}>
                                                    <img class="pr-2 w-[35px] h-[30px] "
                                                         src={`https://cdn-test.dock411.com/0000/brands/area/icon-area-${area.type}.png`}
                                                         alt="area"/>
                                                </button>
                                            </div>
                                            <button class="side-bar-name "
                                                    on:click={()=>{handleSideMenuClick("polygon",area.id)}}>
                                                <span class="name-span">{area.name}</span>
                                            </button>
                                        </div>
                                    {/each}
                                </div>
                                <div class="flex" style="width:30px">
                                    <button class="add-new-button items-center" hidden={!editMode} disabled={!editMode}
                                            on:click={() => {
                                                check_other_add_new_modals("areas")
                                                toggleVisible_areas();
                                                closeEditMode();
                                                markersTypeToDisplay = "areas";
                                                }
                                                }>
                                        <img class="w-6 h-6"
                                             src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"
                                             alt=""/>
                                        <div class="background-add-new-button"></div>
                                    </button>
                                </div>
                            {/if}
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'justify-between'} let:toggleHidde let:hidde>
                        <div class=" flex flex-col w-full">
                            <div class=" flex-col">
                                <Subtitle subTitle="Hazards"
                                          img="https://cdn-test.dock411.com/0000/d411-facility-map/editor/hazard-icon.svg"
                                          {toggleHidde} {hidde}/>
                            </div>
                            {#if !hidde}
                                <div class="">
                                    {#each d411FacilityMapData.markers as marker}
                                        {#if map_of_hazard_codes.includes(marker.code)}
                                            <div class="area-container">
                                                <div class="side-bar-icon">
                                                    <button on:click={(e)=> {
                                                            handleSideMenuClick("marker",marker.id)}}>
                                                        <img class="w-9 h-9 ml-[-4px] mr-1 mt-[-1px]"
                                                             src={icons.marker_types[marker.code] ? icons.marker_types[marker.code].marker_url : icons.marker_types.other.marker_url}
                                                             alt=""
                                                        />
                                                    </button>
                                                </div>
                                                <button class="side-bar-name "
                                                        on:click={()=>{handleSideMenuClick("marker",marker.id)}}>
                                                    <span>{marker.name}</span>
                                                </button>
                                            </div>
                                        {/if}
                                    {/each}
                                    <div class="flex" style="width:30px">
                                        <button class="add-new-button items-center" hidden={!editMode}
                                                disabled={!editMode} on:click={() => {
                                                check_other_add_new_modals("hazards")
                                                toggleVisible_hazards();
                                                markersTypeToDisplay = "hazards";
                                                closeEditMode();
                                            }}>
                                            <img class="w-6 h-6"
                                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"
                                                 alt=""/>
                                            <div class="background-add-new-button">
                                                <div>
                                        </button>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </OptionWrapper>
                    <OptionWrapper let:toggleHidde let:hidde>
                        <div class=" flex flex-col w-full">
                            <Subtitle subTitle="Markers"
                                      img="https://cdn-test.dock411.com/0000/d411-facility-map/editor/marker-icon.svg"
                                      {toggleHidde} {hidde}/>
                            {#if !hidde}
                                <div class="">
                                    {#each d411FacilityMapData.markers as marker}
                                        {#if !map_of_hazard_codes.includes(marker.code)}
                                            <div class="area-container">
                                                <div class="side-bar-icon">
                                                    <button on:click={(e)=> {
                                                            handleSideMenuClick("marker",marker.id)}}>
                                                        <img class="w-9 h-9 ml-[-4px] mr-1 mt-[-1px]"
                                                             src={icons.marker_types[marker.code] ? icons.marker_types[marker.code].marker_url : icons.marker_types.other.marker_url}
                                                             alt=""/>
                                                    </button>
                                                </div>
                                                <button class="side-bar-name mt-[3px]" on:click={(e)=> {
                                                        handleSideMenuClick("marker",marker.id)}}>
                                                    <span>{marker.name}</span>
                                                </button>
                                            </div>
                                        {/if}
                                    {/each}
                                    <div class="flex" style="width:30px">
                                        <button class="add-new-button  items-center" hidden={!editMode}
                                                disabled={!editMode} on:click={() => {
                                                    check_other_add_new_modals("markers")
                                                    toggleVisible_markers();
                                                    markersTypeToDisplay = "on-site-features";
                                                    closeEditMode();
                                                }}>
                                            <img class="w-6 h-6"
                                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"
                                                 alt=""/>
                                            <div class="background-add-new-button">
                                                <button/>
                                                <div>
                                        </button>
                                    </div>
                                </div>
                            {/if}
                        </div>

                    </OptionWrapper>
                    <OptionWrapper let:toggleHidde let:hidde>
                        <div class="flex flex-col w-full">
                            <Subtitle subTitle="Routes"
                                      img="https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg"
                                      {toggleHidde} {hidde}/>
                            {#if !hidde}
                                <div class="">
                                    {#each d411FacilityMapData.routes as route}
                                        <div class="area-container">
                                            <div class="side-bar-icon">
                                                <button on:click={(e)=> {
                                                        handleSideMenuClick("polyline",route.id)}}>
                                                    <img class="w-6 h-6 ml-[1px] mr-1 mt-[3px]"
                                                         src='https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg' alt=""/>
                                                </button>
                                            </div>
                                            <button class="side-bar-name pl-1.5"
                                                    on:click={handleSideMenuClick("polyline",route.id)}>
                                                <span>{route.name}</span>
                                            </button>
                                        </div>
                                    {/each}
                                </div>
                                <div class="flex" style="width:30px">
                                    <button class="add-new-button items-center" hidden={!editMode} disabled={!editMode}
                                            on:click|stopPropagation={() => {
                                            closeAddNewModal()
                                            initiateRouteDraw()
                                            closeEditMode();
                                            }}>
                                        <img class="w-6 h-6"
                                             src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/add-icon.svg"
                                             alt=""/>
                                        <div class="background-add-new-button">
                                            <button/>
                                            <div>
                                    </button>
                                </div>
                            {/if}
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'border-b-[0px]'}>
                        <div class="flex flex-col">
                            <Switch/>
                        </div>
                    </OptionWrapper>
                </div>
            {:else}
                <div class="w-[100px] bg-[#D9D9D9] border-r-[2px] border-r-[#C9C9C9]">
                    <button class="flex justify-center w-full p-3 gap-5 bg-white" on:click={toogleMinimize}>
                        <img class="w-5 h-7"
                             src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/chevron-right-double.svg"
                             alt="chevron"/>
                    </button>
                    <OptionWrapper styles={'justify-center'} style={'padding: 16px;'}>
                        <div class="flex gap-x-5">
                            <img class="w-7 h-7 cursor-pointer"
                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/area-icon.svg"
                                 alt="area"/>
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'justify-center'} style={'padding: 16px;'}>
                        <div class="flex gap-x-5">
                            <img class="w-7 h-7 cursor-pointer"
                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/hazard-icon.svg"
                                 alt="hazard"/>
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'justify-center'} style={'padding: 16px;'}>
                        <div class="flex gap-x-5">
                            <img class="w-7 h-7 cursor-pointer"
                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/marker-icon.svg"
                                 alt="hazard"/>
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'justify-center'} style={'padding: 16px;'}>
                        <div class="flex gap-x-5">
                            <img class="w-7 h-7 cursor-pointer"
                                 src="https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg"
                                 alt="route"/>
                        </div>
                    </OptionWrapper>
                    <OptionWrapper styles={'border-b-[0px]'} style={'padding: 16px 8px;'}>
                        <Switch withTitle={false}/>
                    </OptionWrapper>
                </div>
            {/if}
        </div>
        <div id="map" class="w-[900px] h-full">
            <Modal bind:showModal={showPopup} bind:dialog={dialog}>
                {#if clicked_layer_information.layer_type === "marker"}
                    {#if !clicked_layer_information.is_hazard}
                        <div class=" pb-1">
                            <div class="flex items-center justify-between pb-1">
                                <img class="pr-2 w-[50px] h-[50px]"
                                     src={icons.marker_types[clicked_layer_information.type] ? icons.marker_types[clicked_layer_information.type].marker_url : clicked_layer_information.marker_url}
                                     alt="Marker"/>
                                <button></button>
                                <input type="text" on:input={(e) => onNameInputChange(e)} readonly={!editMode}
                                       disabled={!editMode}
                                       bind:value={clicked_layer_information.name}
                                       class="text-input mt-[-2px]"
                                       aria-describedby="nameHelp" placeholder="Name" maxlength="50">
                                <div id='conditional_buttons' class=" mt-[-20px] ml-5">
                                    <button class="close-button" on:click={()=> {
                                        cancelItem(selectedItemLayer.id, selectedItemLayer.type);
                                        dialog.close();
                                        closePopup();}}>
                                        <img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                            {#each Object.entries(icons.marker_types) as marker}
                                {#if marker[1].is_facility_property && !marker[1].is_hazard}
                                    <div class="mt-0.5 mb-0.5">
                                        <label class="label-toolbar flex flex-row gap-0.5">
                                            <div class="radio-toolbar">
                                                <input
                                                        type=radio bind:group={clicked_layer_information.type}
                                                        on:change={name_default_changer(clicked_layer_information.layer_type)}
                                                        name="marker_type"
                                                        class="marker_input"
                                                        disabled={!editMode}
                                                        readonly={!editMode}
                                                        checked={marker[1].code === clicked_layer_information.type}
                                                        value={marker[1].code}>
                                            </div>
                                            <div>
                                                <img alt="Dock411 Map Icon"
                                                     class="mt-[3px]  mb-1 pr-2 w-[40px] h-[30px] ml-[7px]"
                                                     src={marker[1].marker_url}
                                                     title={formatIconHover(marker[1].code)}/>
                                            </div>
                                            <div class="mt-[5px] ml-[1px] text-[16px] text-[#667085]">
                                                {marker[1].name}
                                            </div>
                                        </label>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                    {#if (clicked_layer_information.is_hazard)}
                        <div class=" block pb-1">
                            <div class="flex items-center justify-between pb-1">
                                <img class="pr-2 w-[50px] h-[50px]"
                                     src={icons.marker_types[clicked_layer_information.type] ? icons.marker_types[clicked_layer_information.type].marker_url : clicked_layer_information.marker_url}
                                     alt="Marker"/>
                                <button></button>
                                <input type="text" on:input={(e) => onNameInputChange(e)} readonly={!editMode}
                                       disabled={!editMode} bind:value={clicked_layer_information.name}
                                       class="text-input mt-[-2px]"
                                       aria-describedby="nameHelp" placeholder="Name" maxlength="50">

                                <div id='conditional_buttons' class=" mt-[-20px] ml-5">
                                    <button class="close-button " on:click={()=> {
                                        cancelItem(selectedItemLayer.id, selectedItemLayer.type);
                                        dialog.close();
                                        closePopup();}}>
                                        <img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg" alt=""/>
                                    </button>
                                </div>
                            </div>
                            {#each Object.entries(icons.marker_types) as marker}
                                {#if marker[1].is_hazard}
                                    <div class="mt-1 mb-1">
                                        <label class="label-toolbar flex flex-row gap-2">
                                            <div class="radio-toolbar">
                                                <input
                                                        type=radio bind:group={clicked_layer_information.type}
                                                        on:change={name_default_changer(clicked_layer_information.layer_type)}
                                                        name="marker_type"
                                                        class="hazard_input"
                                                        disabled={!editMode}
                                                        readonly={!editMode}
                                                        checked={marker[1].code === clicked_layer_information.type}
                                                        value={marker[1].code}>
                                            </div>
                                            <div>
                                                <img alt="Dock411 Map Icon"
                                                     class="mt-[-2px] pr-2 w-[40px] h-[40px] ml-[1px]"
                                                     src={marker[1].marker_url}
                                                     title={formatIconHover(marker[1].code)}/>
                                            </div>

                                            <div class="mt-[5px] ml-[-5px] text-[16px] text-[#667085]">
                                                {marker[1].name}
                                            </div>
                                        </label>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                {/if}

                {#if clicked_layer_information.layer_type === 'polygon'}
                    <div class=" block pb-2">
                        <div class="flex flex-row items-center justify-between">
                            <img class="w-[36px] h-[36px]"
                                 src={`https://cdn-test.dock411.com/0000/brands/area/icon-area-${
								                    AREA_ICONS[clicked_layer_information.type] ? AREA_ICONS[clicked_layer_information.type].type : AREA_ICONS['parking'].type}.png`}
                                 alt="Marker"/>
                            <button></button>
                            <input type="text" on:input={(e) => onNameInputChange(e)} readonly={!editMode}
                                   disabled={!editMode}
                                   bind:value={clicked_layer_information.name} class="text-input"
                                   aria-describedby="nameHelp" placeholder="Name" maxlength="50">
                            <div id='conditional_buttons' class="mt-[-20px] ml-5">
                                <button class="close-button " on:click={()=> {
                                        cancelItem(selectedItemLayer.id, selectedItemLayer.type);
                                        dialog.close();
                                        closePopup();}}>
                                    <img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="pb-4">
                        <form>
                            <div class="form-group">
                                <div>
                                    <span class="text-[#F79120] text-[20px]"></span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <form class="mb-4">
                        {#each AREA_COLORS as area_color}
                            {#if area_color.type !== 'unknown'}
                                <div class="mt-0.3 mb-0.3  ">
                                    <label class="label-toolbar flex flex-row gap-1">
                                        <div class="radio-toolbar">
                                            <input
                                                    type=radio bind:group={clicked_layer_information.type}
                                                    on:change={name_default_changer(clicked_layer_information.layer_type)}
                                                    name="area_type"
                                                    class="area_input"
                                                    disabled={!editMode}
                                                    readonly={!editMode}
                                                    checked={area_color.type === clicked_layer_information.type}
                                                    value={area_color.type}>
                                        </div>
                                        <div>
                                            <img class="mt-[1px]  pr-2 w-[35px] h-[30px] ml-[5px]"
                                                 src={`https://cdn-test.dock411.com/0000/brands/area/icon-area-${area_color.type}.png`}
                                                 style="color:{area_color.fill};border:{area_color.border} "
                                                 alt="Marker"/>
                                        </div>
                                        <div class="mt-[1px] ml-[1px] text-[16px] text-[#667085]">
                                            {area_color.name}
                                        </div>
                                    </label>&nbsp; &nbsp;
                                </div>
                            {/if}
                        {/each}
                    </form>
                {/if}
                {#if clicked_layer_information.layer_type === 'polyline'}
                    <div class=" block pb-2">
                        <div class="flex items-center justify-between">
                            <img class="" src='https://cdn-test.dock411.com/0000/d411-facility-map/editor/route-icon.svg'>
                            <button></button>
                            <input type="text" on:input={(e) => onNameInputChange(e)} readonly={!editMode}
                                   disabled={!editMode}
                                   bind:value={clicked_layer_information.name} class="text-input"
                                   aria-describedby="nameHelp" placeholder="Name" maxlength="50">
                            <div id='conditional_buttons' class="mt-[-20px] ml-5">
                                <button class="close-button " on:click={()=> {
                                        cancelItem(selectedItemLayer.id, selectedItemLayer.type);
                                        dialog.close();
                                        closePopup();}}>
                                    <img src="https://d411-facility-map-wc-images.s3.amazonaws.com/close.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                {/if}
                <div id='conditional_buttons' slot="footer" class="flex justify-between">
                    {#if editMode}
                        <ModalButton
                                styles="min-w-[195px] bg-[#FF8300] border border-solid border-[#ff8300] border-[1px] text-white"
                                on:click={() => {
                        dialog.close();
                        saveItem(selectedItemLayer.id,selectedItemLayer.type,clicked_layer_information.type);
                        closePopup();
                    }}>
                            Save
                        </ModalButton>
                        <ModalButton styles="min-w-[195px] bg-[white] border border-solid border-[#ff8300] text-[red]"
                                     on:click={() => {
                        let result = confirm("Are you sure you want to delete?");
                            if (result) {
                                deleteItem(selectedItemLayer.id, selectedItemLayer.type);
                                dialog.close();
                                closePopup();
                                }}}>Delete
                        </ModalButton>
                    {/if}
                </div>
            </Modal>
        </div>
    </MapWrapper>
</div>

<style lang="scss">
  #map {
    height: 100vh;
    width: 100vw;
    background-color: gray
  }

  /*.text-input {
    @apply focus:border focus:border-[#ff8300] focus:outline-none focus:pl-[5px] ml-[-8.5rem] focus:ml-[-8.9rem] focus:outline focus:outline-[1px] focus:ring-0 disabled:bg-transparent text-[20px] rounded pl-[3px] w-[260px];
  }*/
  .text-input {
    font-size: 20px;
    border-radius: 0.375rem;
    padding-left: 3px;
    width: 260px;
    margin-left: -8.5rem;

    &:focus {
      border-width: 1px;
      border-color: #ff8300;
      outline: none;
      padding-left: 5px;
      margin-left: -8.9rem;
      outline-style: solid;
      outline-width: 1px;
      box-shadow: none;
    }

    &:disabled {
      background-color: transparent;
    }
  }

  .hazard_input, .area_input, .marker_input {
    position: fixed;
    opacity: 0;
    pointer-events: none;
  }

  .label-toolbar:has(.hazard_input:checked) {
    background-color: lightgray;
    border-radius: 25px;
    border: 2px solid deepskyblue;
    width: 200px;
    margin-left: -3.5px;
    padding-top: 2px;
    padding-left: 1.5px;
  }

  .label-toolbar:has(.area_input:checked) {
    background-color: lightgray;
    border-radius: 25px;
    border: 2px solid deepskyblue;
    padding: 7px;
    width: 200px;
    margin: -8.5px;
  }

  .label-toolbar:has(.marker_input:checked) {
    background-color: lightgray;
    border-radius: 25px;
    border: 2px solid deepskyblue;
    padding-left: 2px;
    width: 240px;
    //margin: -3.5px;
    margin-left: -3.5px;
    padding-top: 1px;
  }

  .area-container {
    display: flex;
    justify-content: space-around;
    margin-top: 2px;
    padding-top: -1px;
    margin-bottom: 10px;
  }

  .delete-buttons {
    display: flex;
    margin-left: auto;
    margin-top: -1px;
  }

  .side-bar-name {
    display: flex;
    font-size: 15px;
    justify-content: flex-start;
    margin-right: auto;
    margin-top: 2px;
    max-width: 130px;
    word-break: normal;
    word-wrap: break-word;
    margin-left: 1px;
    text-align: left;
  }

  .side-bar-icon {
    display: flex;
    margin-left: 11px;
  }

  .side-menu {
    overflow-y: auto;
    max-height: 990px;
  }

  .background-add-new-button {
    background-color: #686868;
    width: 16px;
    height: 19px;
    margin-top: -23px;
    margin-left: 3.5px;
  }

  .add-new-button {
    margin-left: -1px;
    margin-top: 4px;
  }

  .facility-header {
    width: 100%;
    top: 0px;
    position: sticky
  }

  .close-button {
    width: 17px;
    height: 22px;
    margin-top: -25px;
  }
</style>
