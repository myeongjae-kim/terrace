<template>
  <div class="about">
    <img class="shadow" id="profileImage" alt="dev@myeongjae.kim from gravatar.com" src="https://www.gravatar.com/avatar/60a42ec05e4e6f2625aba6ff7f44ee02?s=400" width="200px" height="200px">
    <img class="baedal_move" src="https://cdn.myeongjae.kim/res/baedal_move.png">
    <h1><span id="name-eng">Myeongjae Kim</span><span id="name-kor">(김명재)</span></h1>
    <div id="personal-info">
      <div class="record">
        <div class="icon"><font-awesome-icon :icon="['fas','child']" /></div>
        <div class="text">Software Developer</div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="map-marker-alt" /></div>
        <div class="text"><router-link to="/places/">Seoul, Korea</router-link></div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon icon="user-tie" /></div>
        <div class="text">Résumé</div>
      </div>
      <div class="record">
        <div class="icon"><font-awesome-icon :icon="['fab', 'github']" /></div>
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

    <img class="baedal" src="https://cdn.myeongjae.kim/res/baedal.gif" style="float: left; opacity:0;">

      If you like my website, you can copy it from
        <a href="https://github.com/hrzon/terrace">here</a>.

    <a href="https://www.woowahan.com/"><img class="baedal" src="https://cdn.myeongjae.kim/res/baedal.gif" border="0"></a>

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
#profileImage {
  border-radius: 5%;
  margin-top: 14px;
}

@media screen and (max-width: 600px) {
  #profileImage {
    margin-top: 0;
  }
}

#name-eng {
  font-family: 'Bad Script', cursive;
}

#name-kor {
  padding-top:25px;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  opacity: 0.5;
}

#personal-info {
  width: 164px;
  height: 180px;
  text-align: left;
  margin: auto;
  font-family: 'Inconsolata', monospace;
}

#personal-info > p{
  margin: 0;
}

div.record {
  height: 20px;
}

div.icon {
  width: 28px;
  float: left;
  font-size: 0.9em;
  text-align: center;
}
div.text {
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

.baedal {
  box-shadow: 0 0 0 rgba(0,0,0,0);
  -moz-box-shadow: 0 0 0 rgba(0,0,0,0);
  -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);

  float: right;
  width: 70px;
  margin-top: -40px;
}

.baedal:hover {
  opacity: 0.5;
}

@media screen and (max-width: 420px) {
  .baedal {
    width: 50px;
    margin-top: -20px;
  }
}

@media screen and (max-width: 350px) {
  .baedal {
    display: none;
  }
}

.baedal_move {
  box-shadow: 0 0 0 rgba(0,0,0,0);
  -moz-box-shadow: 0 0 0 rgba(0,0,0,0);
  -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);

  width:200px;
  margin-left:-200px;
  border-radius: 5%;
}

</style>