(function (modules) {
  // webpackBootstrap
  // install a JSONP callback for chunk loading
  //安装一个JSONP callback为了加载额外的代码块
  function webpackJsonpCallback(data) {
    var chunkIds = data[0]; //chunkIds数组
    var moreModules = data[1]; //额外的模块

    // add "moreModules" to the modules object,
    // then flag all "chunkIds" as loaded and fire callback
    // 给modules对象上添加额外的模块
    //然后把所有的代码块ID设置为已经加载成功,并且让promise变成成功态,并且触发回调
    var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i]; //title
      //installedChunks[chunkId]=[resolve,reject,promise]
      resolves.push(installedChunks[chunkId][0]); //resolves.push(resolve);
      installedChunks[chunkId] = 0; //表示 已经加载成功了
    }
    //把moreModules上面的属性都合并到modules上面去
    for (moduleId in moreModules) {
      modules[moduleId] = moreModules[moduleId];
    }
    //调用一下parentJsonpFunction jsonpArray.push(data);
    if (parentJsonpFunction) parentJsonpFunction(data);

    while (resolves.length) {
      let resolve = resolves.shift(); //取出第一个元素
      resolve(); //promies里的resolve
    }
  }

  // The module cache
  var installedModules = {};

  // object to store loaded and loading chunks
  // Promise = chunk loading, 0 = chunk loaded
  //这是一个对象,用来存放加载过的和加载中的代码块
  // undefined 代码块从未加载
  // Promise  此代码块正在加载中
  // 0 此代码块已经加载
  var installedChunks = {
    main: 0,
  };

  // script path function
  function jsonpScriptSrc(chunkId) {
    return require.p + "" + ({ title: "title" }[chunkId] || chunkId) + ".js";
  }

  // The require function
  function require(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, require);

    // Flag the module as loaded
    module.l = true;

    // Return the exports of the module
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  //懒加载额外的代码块
  //这个文件只包含入口代码块
  //代码块加载函数可以用来加载额外的,分割出去的代码块
  require.e = function requireEnsure(chunkId) {
    //title 声明一个promise空数组
    var promises = [];

    // JSONP chunk loading for javascript
    //使用JSONP来加载 额外的代码块
    var installedChunkData = installedChunks[chunkId]; //undefined
    if (installedChunkData !== 0) {
      //未加载成功的话
      // 0 means "already installed". 0表示已经安装成功

      // a Promise means "currently loading". 说明这是个promise,表示 此代码块正在加载中
      if (installedChunkData) {
        //再看看这个installedChunkData是不是undefined
        promises.push(installedChunkData[2]); //把这个promise放在数组中等一等
      } else {
        // setup Promise in chunk cache 开始创建Promise准备加载数据
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = [resolve, reject];
          installedChunks[chunkId] = installedChunkData;
        });
        installedChunkData[2] = promise;
        //installedChunkData.push(promise);
        //installedChunkData =[resolve,reject,promise]
        promises.push(promise);

        // start chunk loading 开始代码块的加载了
        var script = document.createElement("script");
        script.charset = "utf-8"; //指定编码
        script.timeout = 120; //指定超时
        //require.p + "" + ({ title: "title" }[chunkId] || chunkId) + ".js";
        script.src = jsonpScriptSrc(chunkId); // /title.js
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  require.m = modules;

  // expose the module cache
  require.c = installedModules;

  // define getter function for harmony exports
  require.d = function (exports, name, getter) {
    if (!require.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      });
    }
  };

  // define __esModule on exports
  require.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module",
      });
    }
    Object.defineProperty(exports, "__esModule", {
      value: true,
    });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  require.t = function (value, mode) {
    if (mode & 1) value = require(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === "object" && value && value.__esModule)
      return value;
    var ns = Object.create(null);
    require.r(ns);
    Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value,
    });
    if (mode & 2 && typeof value != "string")
      for (var key in value)
        require.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  require.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module["default"];
          }
        : function getModuleExports() {
            return module;
          };
    require.d(getter, "a", getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  require.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  require.p = "";

  // on error function for async loading
  require.oe = function (err) {
    console.error(err);
    throw err;
  };
  window["webpackJsonp"] = []; //window["webpackJsonp"]等于一个空数组
  var jsonpArray = window["webpackJsonp"];
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray); //等于数组老的push方法
  jsonpArray.push = webpackJsonpCallback;
  var parentJsonpFunction = oldJsonpFunction; ////等于数组老的push方法

  // Load entry module and return exports
  return require((require.s = "./src/index.js"));
})({
  "./src/index.js": function (module, exports, require) {
    let importBtn = document.getElementById("import");
    importBtn.addEventListener("click", () => {
      debugger;
      require
        .e("title")
        //.then(require.t.bind(null, "./src/title.js", 7))
        .then(function () {
          //moduleId ="./src/title.js"  0b0111
          return require.t("./src/title.js", 7);
        })
        .then((result) => {
          console.log(result);
        });
    });
  },
});
