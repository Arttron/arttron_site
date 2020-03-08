//= lodash.core.min.js
//= particles.min.js
(function () {
    function random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
     };
    particlesJS('particles-js',
    {
      "particles": {
        "number": {
          "value": 180,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.3,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 0.2,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 100,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 120,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 50
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true,
      "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
      }
    }
    );
    let progressComplit = true;
    let form = document.querySelector('.contact__form');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let formData = new FormData(document.getElementById("form__mail"));
        $.ajax({
            method: "POST",
            url: "mail.php",
            processData: false,
            contentType: false,
            data: formData
            })
            .done(function( msg ) {
              console.dir(msg);
            }).
            fail(function() {
              console.error( "error" );
            });
    });
    document.addEventListener('scroll', ()=> {
      if(window.pageYOffset >= 1482 || window.pageYOffset<=900 && !progressComplit){
        _.forEach(document.querySelectorAll('.skylls__item progress'), function(e){e.value = 0;});
        progressComplit = true;
      }

      if(window.pageYOffset >= 900 && progressComplit){
        progressComplit = false;
        setTimeout(function() {
          _.forEach(document.querySelectorAll('.skylls__item progress'), function(e){e.value = random(40, 100);});
        }, 0);
      }
    });
  
}());