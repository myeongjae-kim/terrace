<template>
  <div class="places">
    <h1>Places</h1>
    <p>where I have been</p>
    <div id="map-wrapper">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Places',
  mounted: function() {
    loadMap();
  }
};

import mapboxgl from 'mapbox-gl';

function loadMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg';

  // eslint-disable-next-line
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/myeongjae/cjl07pcz14j9t2sqmsp0swqhg',
  });
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map-wrapper {
  padding: 0 10px 0 10px;
}

#map {
  height: 500px;
  text-align: justify;
}
</style>
