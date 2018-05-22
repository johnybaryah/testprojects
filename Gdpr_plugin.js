/*
WES GDPR popup - coooooookie
*/

class Eu_Cookie{    
    constructor(name, val){
        this.name = name;
        this.scriptLink = "https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js";
        this.val = val;
    }

    static get(c){

        return new Promise(function(resolve, reject){
            $.getScript(c.scriptLink).done(function(js){
                resolve(typeof Cookies.get(c.name) !== "undefined");
            });
        });
    }
    set(){
        return new Promise(function(resolve, reject){
            $.getScript(this.scriptLink).done(function(){
                Cookies.set(this.name, this.val);
                resolve();
            });
        });
    }
}

class IpStack{
    constructor(){
        this.url = "http://api.ipstack.com/check";        
        this.params = {access_key : "88de7a4a65b399634e9291d9070aac3f"};
    }

    getInfo(){
        
        var options = $.extend( options || {}, {
            dataType: "jsonp",
            type: "GET",
            url: this.url,
            data: this.params
        });

        return $.ajax(options);
    }
}

/*var IsCookieSet = () => {
    return new Promise(function(resolve, reject){
        $.getScript("https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js")
        .done(function(js){            
            resolve(typeof Cookies.get("_eu_wes") !== "undefined");
        });
    });    
};

var SetCookie = () => {
    return new Promise(function(resolve, reject){
        $.getScript("https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js")
        .done(function(js){
            Cookies.set("_eu_wes", 1);
            resolve();
        });
    });    
};

var InjectScripts = (scripts) => {
    scripts.forEach(element => {
        console.log(element);
        $.getScript("http://localhost/gdpr/" + element);
    });
};*/

// if is europe => getLocation()
// then find a cookie
// if no cookie is found
// then show popup - set cookie on save
// if cookie is found then no popup return false; 

class GDPR{
    constructor(w, e, s){
        this.mode = w;
        this.ScriptsToInject = e;
        this.appendTo = s;
        
        this.checkParams();

        this.modalContentUrl = "http://localhost/gdpr/terms.html";
        this.alertContentUrl = "http://localhost/gdpr/alertText.html";
    }

    Init(){
        var eucookie = new Eu_Cookie("_eu_wes", 1);

        Eu_Cookie.get(eucookie).then(function(cookieAlreadySet, eucookie){
            if (cookieAlreadySet) return;

            var ip = new IpStack();
            ip.getInfo().done(function(json){
                if (!json.location.is_eu) {
                    injectScripts();
                    return;
                }

                showConsent(eucookie);
            });
        });
    }

    showConsent(eucookie){
        switch(this.mode){
            case "alert":
                $.get(this.alertContentUrl).done(function(text){
                    var newDiv = $('<div/>').addClass("alert alert-info newPrivacyAlert").attr("role","alert").append(text);
                    w.prepend(newDiv);
                    $("#okButton").on("click", function(){ eucookie.set().then(function(){ $(".newPrivacyAlert").hide('slow'); });});
                });
                break;
            case "modal":
                $.get(this.modalContentUrl).done((modal) => {
                    $('body').append(modal);                        
                    $("#savecookie").on('click', function(){
                        SetCookie().then(function(){
                            $("#myModal").modal('hide');
                            this.injectScripts();
                        });
                    });
                    $("#myModal").modal();
                });
            case "redirect":
                break;
            default: break;
        }
    }

    injectScripts(){
        this.ScriptsToInject.forEach(script => {
            $.getScript("http://localhost/gdpr/" + script);
        });
    }

    checkParams(){
        var allowedParams = ["redirect", "alert", "modal"];

        if (!Array.isArray(this.ScriptsToInject)) return this.throwError("second parameter should be of type array");
        if (this.appendTo instanceof jQuery === false) return this.throwError("3rd parameter must be a jquery selecter object");
        if (allowedParams.indexOf(this.mode) === -1) return this.throwError("Invalid value passed as parameter for init menthod.");
    }

    throwError(msg){
        console.log(msg);
        return false;
    }
}

/*var SetGdprTerms = (function(){
    var allowedParams = ["redirect", "alert", "modal"];

    var init = function (a, s, w){
        if (allowedParams.indexOf(a) === -1) {
            console.log("Invalid value passed as parameter for init menthod.");
            return;
        }

        // init cookie class
        var eucookie = new Eu_Cookie("_eu_wes", 1);

        eucookie.get().then(function(cookieAlreadySet){
            if (cookieAlreadySet) return;

            var ip = new IpStack();
            ip.getInfo().done(function(json){
                if (!json.location.is_eu) {
                    if (s !== null) InjectScripts(s);
                    return;
                }


            });
        });

        IsCookieSet().then(function(r){            
            if (r) return false;

            var url = "http://api.ipstack.com/check";
            var key = "88de7a4a65b399634e9291d9070aac3f";    
            var params = {access_key : key};

            $.ajax({
                url,
                data: params,
                dataType: "jsonp",
                type: "GET"
            }).done(function(json){
                //if (!json.location.ie_eu) return;
                
                //if (!json.location.is_eu) {
                //    InjectScripts(s);
                //    return;
                //}

                if (a === "alert"){
                    $.get("http://localhost/gdpr/alertText.html").done(function(text){
                        //alert("here");
                        var newDiv = $('<div/>').addClass("alert alert-info newPrivacyAlert").attr("role","alert").append(text);
                        w.prepend(newDiv);
                        $("#okButton").on("click", function(){ SetCookie().then(function(){ $(".newPrivacyAlert").hide('slow'); });});
                    });
                }
                else if (a === "modal"){
                    $.get("http://localhost/gdpr/terms.html").done((modal) => {
                        $('body').append(modal);                        
                        $("#savecookie").on('click', function(){
                            SetCookie().then(function(){
                                $("#myModal").modal('hide');
                                InjectScripts(s);
                            });
                        });
                        $("#myModal").modal();
                    });
                }
                else{
                    window.location.replace("http://localhost/gdpr/index1.html");
                }
            });   
        });
    }

    return { init: init }
})();*/
