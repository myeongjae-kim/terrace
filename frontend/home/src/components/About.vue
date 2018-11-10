<template>
  <div class="about">
    <img class="shadow" id="profileImage" alt="dev@myeongjae.kim from gravatar.com" width="200px" height="200px">

    <!-- display:none is for firefox. After the image is loaded, change none to initial -->
    <img id="baedal-move" style="display:none">

    <h1><span id="name-eng">Myeongjae Kim</span><span id="name-kor">(김명재)</span></h1>
    <div id="personal-info">
      <div class="record">
        <div class="icon"><font-awesome-icon :icon="['fas','child']" /></div>
        <div class="text">Software Engineer</div>
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

    <div>
      <div>
          <button v-on:click="sendMessage">Send Test Message</button>
      </div>
    </div>

    <footer id="footer">

    <img class="baedal" :src="baedal_img" style="float: left; opacity:0;">

      If you like my website, you can copy it from
        <a href="https://github.com/hrzon/terrace">here</a>.

    <a href="https://www.woowahan.com/"><img class="baedal" :src="baedal_img" border="0"></a>

    </footer>

  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      baedal_img: "https://cdn.myeongjae.kim/res/baedal.gif",
    }
  },
  mounted: function() {
    // Load profile image asynchronously
    (async () => {
      let img = new Image();
      let tag = document.getElementById("profileImage");

      img.onload = function() {
          tag.src = img.src;
      };

      img.src = "https://cdn.myeongjae.kim/res/profile.jpeg";
      //img.src = "https://www.gravatar.com/avatar/60a42ec05e4e6f2625aba6ff7f44ee02?s=400";
    })();


    let getRandomInteger = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.baedal_img = "https://cdn.myeongjae.kim/res/about_logos/" + getRandomInteger(0, 3) + ".png";
    
    // Load moving baedalee asynchronously to show
    // perfect animation
    /*
    (async () => {
      let img = new Image();
      let tag = document.getElementById("baedal-move");

      img.onload = function() {
          tag.src = img.src;
          tag.style.display = "initial";
      };

      img.src = "https://cdn.myeongjae.kim/res/baedal_move.png";
    })();
    */
  },
  methods: {
    sendMessage: function(event) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'https://notify-api.line.me/api/notify', true);

      //Send the proper header information along with the request
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("Authorization", "Bearer H4lh8bHFX7NuZTHGaDc1uOb4iITTWrwVQ93eg1PgK8P");

      xhr.onreadystatechange = function() { // Call a function when the state changes.
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              // Request finished. Do processing here.
          }
      }
      xhr.send("message=testmessage"); 
    }
  }
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

/*
#baedal-move {
  box-shadow: 0 0 0 rgba(0,0,0,0);
  -moz-box-shadow: 0 0 0 rgba(0,0,0,0);
  -webkit-box-shadow: 0 0 0 rgba(0,0,0,0);

  width:200px;
  margin-left:-200px;
  border-radius: 5%;
}
*/

</style>
