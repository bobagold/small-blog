requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        react: '../build/react.min',
        reactdom: '../build/react-dom.min',
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);