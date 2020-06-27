let importBtn = document.getElementById("import");
importBtn.addEventListener("click", () => {
  //result就是这个title模块的导出对象了
  import(/* webpackChunkName: "title" */ "./title").then((result) => {
    console.log(result);
  });
  import(/* webpackChunkName: "title" */ "./title").then((result) => {
    console.log(result);
  });
});

//import('./title')

//require.e("title").then(require.t.bind(null, "./src/title.js", 7));
