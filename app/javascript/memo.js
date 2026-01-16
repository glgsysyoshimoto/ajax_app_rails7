const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  //  console.log("イベント発火");
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();  
    // console.log("イベント発火");
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);  //「post」→「posts」に戻す
    // XHR.open("POST", "/post", true);  //「posts」→「post」にする
    // XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      // console.log(XHR.response);
      const list = document.getElementById("list"); 
      const formText = document.getElementById("content");
      // console.log(formText.value);
      const item = XHR.response.post;
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      // list.insertAdjacentHTML("afterend", html);
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('turbo:load', post);