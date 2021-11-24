export var loadScript = function loadScript(name, path) {
    return new Promise(function(resolve, reject) {
      if(!!document.getElementById(name)) {
        return resolve();
      }
      var element = document.createElement('script');
      element.id = name;
      element.src = path;
      element.addEventListener('load', function() {
        resolve();
      });
      element.addEventListener('error', function() {
        reject(`Failed to load ${name} (${path})`);
      });
      document.getElementsByTagName('head')[0].appendChild(element);
    }, `Loading external script resource ${name} (${path})`);
};