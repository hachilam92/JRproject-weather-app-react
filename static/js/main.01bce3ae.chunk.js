(this["webpackJsonpproject-02-weather-app-react"]=this["webpackJsonpproject-02-weather-app-react"]||[]).push([[0],{19:function(e,t,a){e.exports=a(58)},24:function(e,t,a){},25:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},30:function(e,t,a){},31:function(e,t){function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=Math.round(e*Math.pow(10,t))/Math.pow(10,t);return a}e.exports={toCelsius:function(e){var t=e-273.15;return t=a(t)},toFahrenheit:function(e){var t=9*(e-273.15)/5+32;return t=a(t)},windDirect:function(e){return["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"][parseInt((e+11.25)/22.5)+1]}}},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},54:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(15),i=a.n(c),o=(a(24),a(25),a(3)),u=a.n(o),s=a(5),l=a(2),m=(a(27),a(28),a(8));a(30);var h=function(e){var t=Object(n.useState)(!0),a=Object(l.a)(t,2),c=a[0],i=a[1],o=Object(n.useState)("country or code"),u=Object(l.a)(o,2),s=u[0],m=u[1];function h(){i(!c),m("country or code")}function d(t){t.preventDefault(),e.onCountryChange(s),h()}return r.a.createElement("div",{className:"Country"},r.a.createElement("div",{className:"Country__name",onClick:h},e.country),c?"":r.a.createElement("form",{className:"Country__form",onSubmit:d},r.a.createElement("input",{value:s,onChange:function(e){m(e.target.value)},onBlur:function(e){return""===s?h():d(e)},onFocus:function(){"country or code"===s&&m("")}})))},d=a(4),p=a(31),f=function e(t){Object(d.a)(this,e),this.temperature=p.toCelsius(t.main.temp),this.humidity=t.main.humidity,this.wind=t.wind.speed,this.weather=t.weather[0].main,this.icon=t.weather[0].icon,this.description=t.weather[0].description},y=function e(t,a){Object(d.a)(this,e),this.day=a,this.temperature=Math.round(t.temperature),this.icon=t.icon,this.description=t.description},v=a(32),E="".concat("e787b14540b854a704b00c7a9dfe1342"),C=v.create({baseURL:"https://api.openweathermap.org/data/2.5",params:{appid:E}});function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"current",a="forecast"===t?"/forecast":"/weather",n=C.get(a,{params:{q:e}});return n}var _=function(e,t){var a="".concat(t,", ").concat(e);return Promise.all([N(a),N(a,"forecast")]).then((function(e){var t=e[0],a=e[1];return{cityName:a.data.city.name,countryCode:a.data.city.country,current:new f(t.data),forecast:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,a=["SUN","MON","TUE","WED","THU","FRI","SAT"],n=new Date,r=n.getDay()-1,c=[],i=0;i<t;i++)r=r===a.length-1?0:r+1,c.push(new y(e[i],a[r]));return c}(function(e){for(var t=[],a=0;a<e.length;a+=8)t.push(e[a]);return t}(a.data.list.map((function(e){return new f(e)}))))}})).catch((function(e){console.log(e.message)}))};a(50);var w=function(e){var t=Object(n.useState)("Which city?"),a=Object(l.a)(t,2),c=a[0],i=a[1];function o(){return(o=Object(s.a)(u.a.mark((function t(a){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setLoading(!0),t.next=3,_(e.country,a);case 3:if(void 0!==(n=t.sent)){t.next=7;break}return e.setLoading(!1),t.abrupt("return",alert("country or city can not found"));case 7:e.updateDataArray(n),e.setLoading(!1);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return r.a.createElement("div",{className:"City"},r.a.createElement("h1",null,e.city),r.a.createElement("form",{className:"City__form",onSubmit:function(t){t.preventDefault(),e.checkCityInput(c,e.country)&&function(e){o.apply(this,arguments)}(c),i("Which city?")}},r.a.createElement("input",{className:"City__form__input",value:c,onChange:function(e){i(e.target.value)},onFocus:function(){"Which city?"===c&&i("")},onBlur:function(e){return""===c&&i("Which city?")}})))};a(51);var b=function(e){return r.a.createElement("div",{className:"CurrentInfo"},r.a.createElement("div",{className:"CurrentInfo__temperature"},r.a.createElement("span",null,e.temperature," \xb0")),r.a.createElement("div",{className:"CurrentInfo__weather"},r.a.createElement("span",null,e.weather)),r.a.createElement("div",{className:"CurrentInfo__details"},r.a.createElement("div",{className:"CurrentInfo__details__item"},r.a.createElement("span",null,"HUMIDITY"),r.a.createElement("br",null),r.a.createElement("span",null,e.humidity,"%")),r.a.createElement("div",{className:"division"}),r.a.createElement("div",{className:"CurrentInfo__details__item"},r.a.createElement("span",null,"WIND"),r.a.createElement("br",null),r.a.createElement("span",null,e.wind," K/M"))))};var g=function(e){var t=e.children.currentData.countryCode,a=Object(n.useState)(t),c=Object(l.a)(a,2),i=c[0],o=c[1];Object(n.useEffect)((function(){o(t)}),[t]);var u=e.children,s=u.currentData,d=u.setLoading,p=u.checkCityInput,f=u.updateDataArray,y=s.cityName,v=s.current,E=v.temperature,C=v.humidity,N=v.wind,_=v.weather;return r.a.createElement("div",{className:"Current"},r.a.createElement(h,{country:i,onCountryChange:function(e){var t=function(e){var t=Object(m.getCode)(e)||Object(m.getName)(e);return!!t&&(t.length>2?e:t)}(e);return t&&o(t.toUpperCase())}}),r.a.createElement(b,{temperature:E,humidity:C,wind:N,weather:_}),r.a.createElement(w,{city:y,country:i,checkCityInput:p,setLoading:d,updateDataArray:f}),r.a.createElement("div",{className:"CurrentBottom"}))},O=(a(52),a(53),a(16)),k=a(18),j=a(17),I=function(e){Object(k.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).handleClick=function(t){e.props.onOtherCitiesClick(e.props.index)},e}return Object(O.a)(a,[{key:"render",value:function(){var e=this.props,t=e.city,a=e.temperature,n=e.icon,c=e.description;return r.a.createElement("button",{className:"OtherCityButton",onClick:this.handleClick},r.a.createElement("h3",{className:"OtherCityButton__city"},t),r.a.createElement("div",{className:"OtherCityButton__temperature"},Math.round(a)," \xb0"),r.a.createElement("div",{className:"OtherCityButton__icon"},r.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(n,".png"),alt:c})))}}]),a}(n.Component);var W=function(e){var t=e.cityArray,a=e.onOtherCitiesClick,n=t.map((function(e,t){return r.a.createElement(I,{key:"".concat(e.countryCode).concat(e.cityName),city:e.cityName,temperature:e.current.temperature,icon:e.current.icon,description:e.current.description,onOtherCitiesClick:a,index:t})}));return r.a.createElement("div",{className:"OtherCityButtons"},n)};var A=function(e){var t=e.children,a=t.cityArray,n=t.onOtherCitiesClick;return r.a.createElement("div",{className:"OtherCity"},r.a.createElement("h2",{className:"OtherCity__title"},"Other Cities"),r.a.createElement(W,{cityArray:a,onOtherCitiesClick:n}))};a(54);var S=function(e){var t="http://openweathermap.org/img/wn/".concat(e.info.icon,"@2x.png");return r.a.createElement("div",{className:"ForecastList__Item"},r.a.createElement("h3",{className:"ForecastList__Item__day"},e.info.day),r.a.createElement("img",{className:"ForecastList__Item__icon",src:t,alt:e.info.description}),r.a.createElement("div",{className:"ForecastList__Item__temperature"},e.info.temperature," \xb0"))};var D=function(e){var t=e.forecastArray.map((function(e){return r.a.createElement(S,{key:e.day,info:e})}));return r.a.createElement("div",{className:"ForecastWeather"},r.a.createElement("h2",{className:"ForecastWeather__title"},"Forecast"),r.a.createElement("div",{className:"ForecastList"},t))};var x=function(e){var t=e.children,a=t.dataArray,n=t.onOtherCitiesClick,c=a.slice(1),i=a[0].forecast;return r.a.createElement("div",{className:"WeatherBottom"},r.a.createElement(A,null,{cityArray:c,onOtherCitiesClick:n}),r.a.createElement("div",{className:"division"}),r.a.createElement(D,{forecastArray:i}))};var F=function(){var e=Object(n.useState)(!0),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(n.useReducer)((function(e,t){var a,n=e.map((function(e){return e}));switch(t.type){case"New_Array":return t.array;case"New_DATA":a=t.data,n.pop();break;case"SWITCH":a=n.splice(t.index,1)[0];break;default:throw new Error}return n.unshift(a),n}),[]),o=Object(l.a)(i,2),m=o[0],h=o[1];function d(e){h({type:"New_Array",array:e})}function p(){return(p=Object(s.a)(u.a.mark((function e(){var t,a,n,r,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=["Melbourne","Sydney","Brisbane","Perth"],a="AU",n=[],r=0;case 4:if(!(r<t.length)){e.next=13;break}return i=t[r],e.next=8,_(a,i);case 8:o=e.sent,n.push(o);case 10:r++,e.next=4;break;case 13:d(n),c(!1);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(e){h({type:"SWITCH",index:e+1})}Object(n.useEffect)((function(){!function(){p.apply(this,arguments)}()}),[]);var y=m[0];return r.a.createElement("div",{className:"Weather"},a?r.a.createElement("div",{className:"Current",style:{borderRadius:"32px"}},r.a.createElement("div",{className:"loading"},"Loading...")):r.a.createElement(r.a.Fragment,null,r.a.createElement(g,null,{currentData:y,setLoading:c,checkCityInput:function(e,t){var a=m.findIndex((function(a){return a.cityName.toUpperCase()===e.toUpperCase()&&a.countryCode===t}));return a>0?(f(a-1),!1):0!==a},updateDataArray:function(e){h({type:"New_DATA",data:e})}}),r.a.createElement(x,null,{dataArray:m,onOtherCitiesClick:f})))};a(55).config();var L=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(F,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.01bce3ae.chunk.js.map