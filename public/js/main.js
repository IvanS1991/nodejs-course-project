"use strict";$("#toggle-password-form").on("click",function(s){var a=$(s.target),e=a.next();a.toggleClass("hidden"),e.toggleClass("hidden")}),$(".user-form").on("submit",function(){var s=$("#tb-password").val(),a=$("#tb-password-repeat").val();$("#tb-password-secure").val(sha1(s)),$("#tb-password-repeat-secure").val(sha1(a))});
"use strict";var filterMovies=function(){var e=[];[].slice.call($(".genre-option")).forEach(function(c){c.checked&&e.push(c.value)});var c="http://localhost:8000/movies/view?page=1&size=10&genres="+e.join(",");document.location=c};$(".genre-label").on("click",function(e){$(e.target).toggleClass("clicked")});
"use strict";var twitter=io(),container=$("#twitter-feed"),addToFeed=function(e,a){var t=$("<div/>").addClass("panel").addClass("panel-default"),d=$("<div/>").addClass("panel-heading"),n=$("<div/>").addClass("panel-body");$("<img/>").attr("src",e.user.profile_image_url).appendTo(d),$("<div/>").text(e.user.name).appendTo(d),$("<p/>").text(e.created_at).appendTo(d),$("<p/>").text(e.text).appendTo(n);d.appendTo(t),n.appendTo(t),console.log(e),t.prependTo(a)};twitter.on("tweet",function(e){return addToFeed(e,container)});