<template>
  <div class="about">
    <!-- <img id="profileImage" alt="myeongjae.kim@icloud.com from gravatar.com" src="https://www.gravatar.com/avatar/60a42ec05e4e6f2625aba6ff7f44ee02?s=400" width="200px" height="200px"> -->
    <img id="profileImage" alt="Profile Image" src="https://cdn.myeongjae.kim/res/profile.jpeg" width="200px" height="200px">
    <h1>Myeongjae Kim<span id="name-kor">(김명재)</span></h1>
    <div id="personal-info">
      <div class="record">
        <div class="icon"><font-awesome-icon icon="user" /></div>
        <div class="text">Software Engineer</div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="map-marker-alt" /></div>
        <div class="text"><a href="/#/places">Seoul, Korea</a></div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="user-tie" /></div>
        <div class="text">Résumé</div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="code-branch" /></div>
        <div class="text"><a href="https://github.com/hrzon">github.com/hrzon</a></div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="envelope" /></div>
        <div class="text"><a href="mailto:dev@myeongjae.kim">dev@myeongjae.kim</a></div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="pen-nib" /></div>
        <div class="text"><a href="https://blog.myeongjae.kim">blog.myeongjae.kim</a></div>
      </div>
    </div>

    <footer id="footer">
      If you like my website, you can copy it from
        <a href="https://github.com/hrzon/terrace">here</a>.
    </footer>

  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('//cdn.myeongjae.kim/css/IropkeBatangMSubset.woff.css');

#profileImage {
  border-radius: 5%;
}

#name-kor {
  padding-top:18px;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
}

#personal-info {
  width: 150px;
  height: 180px;
  text-align: left;
  margin: auto;
}

#personal-info > p{
  margin: 0;
}

div.record {
  height: 20px;
}

div.icon {
  width: 22px;
  float: left;
  font-size: 0.9em;
}
div.text {
  width: 128px;
  float: left;
  font-size: 0.9em;
}

footer {
  font-size: 0.8em;
  position:fixed;
  left:0px;
  bottom:0px;
  height:30px;
  width:100%;
  background:#FFF;
}

</style>
