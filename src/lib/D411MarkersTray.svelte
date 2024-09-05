<script lang="ts">
    import { AREA_COLORS, formatIconHover, icons, AREA_ICONS } from '../constants';
    import TrayMarkerWrapper from "./TrayMarkerWrapper.svelte";
    import { polygon } from 'leaflet';
    export let clicked_layer_information
    export let icon
    export let visible_areas
    export let visible_hazards
    export let visible_markers
    export let initiateAreaDraw
    export let type = 'on-site-features';

    export let toggleVisible_areas = () => {
        visible_areas = !visible_areas
    };
    export let toggleVisible_hazards = () => {
      visible_hazards = !visible_hazards
    };
    export let toggleVisible_markers = () => {
      visible_markers = !visible_markers
    };
    let onMarkerClick = (icon_in) => {
      icon = icon_in

    };
    let updateClickedLayerInformation = (e) => {
      if (e.type === "point"){
        clicked_layer_information.name = e.name
        clicked_layer_information.type = e.code
        clicked_layer_information.code = e.code
        clicked_layer_information.is_hazard = e.is_hazard
        clicked_layer_information.marker_url = e.marker_url
        clicked_layer_information.layer_type = "marker"
        clicked_layer_information.is_facility_property = e.is_facility_property
      }
      else {
        clicked_layer_information.border = e.border;
        clicked_layer_information.fill = e.fill;
        clicked_layer_information.name = e.name;
        clicked_layer_information.type = e.type;
        clicked_layer_information.layer_type="polygon";
        clicked_layer_information.code = e.code;
      }
    }



</script>

<div class="drawer-container">
      {#if visible_markers === true}
          <div class="d411-marker-drawer-container p-1">
              {#if type === 'on-site-features'}
                  <div>
                      <p class="pl-1 pb-1 text-sm text-black font-semibold">
                          On Site Features and Places
                      </p>
                  </div>
                  <div>
                      {#each Object.entries(icons.marker_types) as marker}
                          {#if marker[1].is_facility_property && !marker[1].is_hazard}
                              <TrayMarkerWrapper on:click={(e) => {
                                    updateClickedLayerInformation(marker[1])
                                    toggleVisible_markers()
                                    onMarkerClick(marker[1]);}}>
                                <img alt="Dock411 Map Icon" class="drawer-img-icon mt-[16px] pr-2 w-[25px] h-[20px] ml-[13px]" src={marker[1].marker_url} title={formatIconHover(marker[1].code)}/>
                                <span class="text-[14px] text-gray-900 pr-3">
                                  {marker[1].name}
                                </span>
                              </TrayMarkerWrapper>
                          {/if}
                      {/each}
                  </div>
              {/if}
          </div>
      {/if}
      {#if visible_areas === true}
        <div class="d411-marker-drawer-container p-1">
          {#if type === 'areas'}
            <div>
              <p class="pl-1 pb-0 pt-2 text-sm text-black font-semibold">
                  Areas
              </p>
            </div>
            <div>
              {#each (AREA_COLORS) as area_color}
                {#if area_color.name != "Unknown"}
                  <TrayMarkerWrapper on:click={(e) => {
                      // clicked_layer_information.border = area_color.border;
                      // clicked_layer_information.fill = area_color.fill;
                      // clicked_layer_information.name = area_color.name;
                      // clicked_layer_information.type = area_color.type;
                      updateClickedLayerInformation(area_color)
                      e.stopPropagation();
                      toggleVisible_areas();
                      initiateAreaDraw();}}>
                  <img alt="area color" class="mt-[10px] pr-2 w-[25px] h-[20px] ml-[10px]"
                      src={`https://cdn-test.dock411.com/0000/brands/area/icon-area-${area_color.type}.png`} style="color:{area_color.fill};border:{area_color.border}"/>
                  <span class="mt-[10px] ml-[2px] text-[14px] text-gray-900 pr-3 ">
                      {area_color.name}
                  </span>
                  </TrayMarkerWrapper>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/if}
      {#if visible_hazards === true}
        <div class="d411-marker-drawer-container p-1">
            {#if type === "hazards" }
                <div>
                  <p class="pl-1 pb-1 pt-2 text-sm text-black font-semibold">
                    Hazards
                  </p>
                </div>
                <div>
                {#each Object.entries(icons.marker_types) as marker}
                    {#if marker[1].is_hazard}
                        <TrayMarkerWrapper on:click={(e) => {
                            // clicked_layer_information.name = marker[1].name
                            // clicked_layer_information.type = marker[1].code
                            // clicked_layer_information.code = marker[1].code
                            // clicked_layer_information.is_hazard = marker[1].is_hazard
                            updateClickedLayerInformation(marker[1])
                            e.stopPropagation()
                            toggleVisible_hazards();
                            onMarkerClick(marker[1]);}}>
                        <img alt="Dock411 Map Icon" class="drawer-img-icon mt-[16px] pr-2 w-[25px] h-[20px] ml-[13px]" src={marker[1].marker_url} title={formatIconHover(marker[1].code)}/>
                        <span class="text-[14px] text-gray-900 pr-3">
                          {marker[1].name}
                        </span>
                        </TrayMarkerWrapper>
                    {/if}
                {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
  .drawer-img-icon {
      font-size: 1.75em;
      vertical-align: middle;
      width: 35px;
      height: 27px;
      cursor: pointer;
      margin: 4px;
  }

  .drawer-container {
      position: absolute;
      top: 250px;
      left: 220px;
      color: white;
      z-index: 900;
      width: 250px;
  }

  .d411-marker-selector {
      box-sizing: border-box;
      -webkit-tap-highlight-color: rgba(51, 181, 229, 0.4);
      background-color: #fff;
      color: black;
      background-repeat: no-repeat;
      background-size: 300px 30px;
      background-clip: padding-box;
      display: block;
      text-align: center;
      text-decoration: none;
      width: 33px;
      height: 33px;
      line-height: 30px;
      border: #555458 2px solid;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 5px;
  }

  .d411-marker-drawer-container {
      position: relative;
      background: white;
      padding-top: 10px;
      padding-bottom: 10px;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.60), 0 15px 12px rgba(0, 0, 0, 0.55);
      margin-left: 35px;
      border-radius: 3px;
      border: 1px solid #686868;
      margin-top: -100px;
  }
  </style>
