<template>
  <div class="places">
    <h1>Places</h1>
    <p>where I have been</p>
    <div id="map-wrapper">
      <iframe id="map" src="https://api.mapbox.com/styles/v1/myeongjae/cjl07pcz14j9t2sqmsp0swqhg.html?fresh=true&title=true&access_token=pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg#1.0/34.307156/128.181610/0"> </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Places'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map-wrapper {
  padding: 0 10px 0 10px;
}

#map {
  height: 500px;
  width: 100%;
  text-align: justify;
  border: 0
}
</style>
