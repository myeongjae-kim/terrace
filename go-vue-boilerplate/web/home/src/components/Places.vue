<template>
  <div class="places">
    <h1 class="component-title">Places</h1>
    <p>where I have been</p>
    <div id="map-wrapper">
      <iframe class="center shadow" id="map" src="https://api.mapbox.com/styles/v1/myeongjae/cjl07pcz14j9t2sqmsp0swqhg.html?fresh=true&title=true&access_token=pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Places',
  metaInfo: {
    title : 'Places',
    meta: [
      { charset: 'utf-8' },
      {
        'property': 'og:title',
        'content': 'Places',
        'template': chunk => `${chunk} :: Myeongjae Kim`,
        'vmid': 'og:title'
      },
      {
        'property': 'og:description',
        'content': 'where I have been',
        'template': chunk => `${chunk}`,
        'vmid': 'og:description'
      }
    ]
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div#map-wrapper {
  padding: 0 10px 0 10px;
  max-width: 1000px;
  margin: auto;
}

#map {
  height: 500px;
  width: 100%;
  text-align: justify;
  border: 0
}
</style>
