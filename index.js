let inputText = document.getElementById("inputText");
let leftArrow = document.getElementById("leftArrow");
let logoElement = document.getElementById("logo");
let searchElement = document.getElementById("searchIcon");
let restIcons = document.getElementById("remainingIcons");
let seeMoreElm = document.getElementById("seeMore");

window.addEventListener("load", function () {
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
});

function changeSearchIcon() {
  inputText.addEventListener("focus", () => {
    searchElement.style.display = "none";
    logoElement.style.display = "none";
    leftArrow.style.display = "block";
    inputText.style.paddingLeft = "15px";
  });
}
setTimeout(() => {
  changeSearchIcon();
}, 2000);

function backToLogoIcon() {
  logoElement.style.display = "block";
  leftArrow.style.display = "none";
  searchElement.style.display = "block";
  inputText.style.padding = "8px 15px 10px 40px";
}

logoElement.addEventListener("click", () => {
  window.location.href = "index.html";
});

function showIcons(e) {
  if (e == "seeMore") {
    restIcons.style.display = "flex";
    restIcons.classList.add("remainingIcons");
    seeMoreElm.style.display = "none";
  } else {
    restIcons.style.display = "none";
    seeMoreElm.style.display = "block";
  }
}

async function getPage(path, mainContainer) {
  let res = await fetch(path);
  let htmlData = await res.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlData, "text/html");
  mainContainer.innerHTML = htmlDoc.body.innerHTML;
  let externalScript = htmlDoc.querySelectorAll("script");
  for (let i = 0; i < externalScript.length; i++) {
    temp = document.createElement("script");
    temp.textContent = externalScript[i].textContent;
    !intiallyLoaded.find((ele) => ele === redirectedFor) &&
      document.body.appendChild(temp);
  }
  let externalStyle = document.createElement("style");
  externalStyle.textContent =
    htmlDoc.getElementsByTagName("style")[0].textContent;
  document.head.appendChild(externalStyle);

  redirectedFor === "video" && renderVideoContent(facebookVideos);
  redirectedFor === "friends" && runFriendsCards(array);
  redirectedFor === "game" && renderGame(games);
  redirectedFor === "stores" && renderProducts(newArray);

  return 0;
}

let currentPageDisplayed = "";

function highlightSelection(key) {
  let iconsNav = document.querySelectorAll(".center");
  iconsNav[0].classList.remove("iconColor");
  iconsNav[1].classList.remove("iconColor");
  iconsNav[2].classList.remove("iconColor");
  iconsNav[3].classList.remove("iconColor");
  iconsNav[4].classList.remove("iconColor");
  iconsNav[key].classList.add("iconColor");
}

let images = document.querySelectorAll(".userImg");
let users = JSON.parse(localStorage.getItem("userDetails"));
let user = users[users.length - 1];
let userName = document.querySelectorAll("#userName");
function renderUserDetails(data) {
  images.forEach((img) => {
    img.setAttribute("src", `${data.profileImg}`);
  });
  userName.forEach((name) => {
    name.innerText = `${data.firstName} ${data.surName}`;
  });
}

let tempDetails = JSON.parse(localStorage.getItem("loginDetails"));
let newUser = users.filter((item) => {
  if (
    item.email == tempDetails[0].email &&
    item.password == tempDetails[0].password
  ) {
    return item;
  }
});

renderUserDetails(newUser[0]);
highlightSelection(0);
let intiallyLoaded = [];
let redirectedFor = "";

async function highlightButton(page) {
  redirectedFor = page;

  let mainContainer = document.getElementById("mainContainer");
  if (page === "friends") {
    nodePoint = await getPage("./components/friends.html", mainContainer);
    currentPageDisplayed = "friends";
    highlightSelection(1);
  } else if (page == "game") {
    nodePoint = await getPage("./components/game.html", mainContainer);
    highlightSelection(4);
    currentPageDisplayed = "game";
  } else if (page == "video") {
    nodePoint = await getPage("./components/video.html", mainContainer);
    highlightSelection(2);
    currentPageDisplayed = "video";
  } else if (page == "stores") {
    nodePoint = await getPage("./components/marketPlace.html", mainContainer);
    currentPageDisplayed = "stores";
    highlightSelection(3);
  } else {
    window.location.href = "index.html";
    currentPageDisplayed = "home";
    highlightSelection(0);
  }
  !intiallyLoaded.find((ele) => ele === redirectedFor) &&
    intiallyLoaded.push(page);
}

let adds = [
  {
    img: "https://scontent.fhyd2-3.fna.fbcdn.net/v/t45.1600-4/484546138_1189885272860581_3855312279114825523_n.jpg?stp=cp0_dst-jpg_q75_s526x296_spS444_tt6&_nc_cat=100&ccb=1-7&_nc_sid=c02adf&_nc_ohc=vBO07RVyZfoQ7kNvwGYIa24&_nc_oc=Adlg0UEJl2WZd5ZQenRRman1uxCAY-GioI4Dr46XYsUokX-MrWzdOlImiPECxm0IWs36LObryRdHsQCoupPhwcIw&_nc_zt=1&_nc_ht=scontent.fhyd2-3.fna&_nc_gid=wY9C3YaXXlkLDt2EVGiAUg&oh=00_AfJS8FtkXP_dUrZmIh-94oA7y7cOM5BV6EsMemJDjVMxVQ&oe=68392DCA",
    title: "3 AI Specializations. 1 IIT Legacy.",
    path: "tcsicon.com",
  },
  {
    img: "https://scontent.fhyd2-2.fna.fbcdn.net/v/t45.1600-4/494701240_1471053034302814_5146737874563194948_n.png?stp=cp0_dst-jpg_q90_s526x296_spS444_tt6&_nc_cat=103&ccb=1-7&_nc_sid=c02adf&_nc_ohc=zFrPi_NlFjgQ7kNvwHSrhET&_nc_oc=AdlFxqmYmBvsP0Q_9wO2hpoN9yACjpi5zv_yQ1FtyNW6bRMmEqJtmFvxu4W4WvMscK4_ngpbEnZKZxMrDFG60a4M&_nc_zt=1&_nc_ht=scontent.fhyd2-2.fna&_nc_gid=wY9C3YaXXlkLDt2EVGiAUg&oh=00_AfJDZwMbCp1-O5WqIi_iytENnugXw-aLuWqmQP6MzHVBGw&oe=683925AE",
    title: "Create an Azure free account",
    path: "azure.microsoft.com",
  },
];

function displayAdd(add) {
  document.getElementById("addContainer").innerHTML += `
        <div>
          <a href="https:www.tcsion.com" class="text-black text-decoration-none d-flex flex-column">
            <div class="d-flex align-items-center w-75 gap-3">
              <img src='${add.img}' class="rounded-3" width="120px">
              <div>
                <h5>${add.title}</h5>
                <p class="opacity-75">${add.path}</p>
              </div>
            </div>
          </a>
        </div>
    `;
}

let timer = 2000;
for (let i = 0; i < adds.length; i++) {
  if (i < adds.length) {
    setTimeout(() => {
      displayAdd(adds[i]);
    }, timer);
    timer += 2000;
  }
}

let postList = [
  {
    id: 1,
    isLiked: false,
    user: {
      id: "user_001",
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    message:
      "Enjoying the view from the top of the mountain! 🏔️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    createdAt: "2025-05-13T08:52:14.479017Z",
    reactions: { like: 113, love: 27, haha: 31, wow: 8, sad: 10, angry: 5 },
    comments: [
      {
        user: "Sarah Lee",
        message: "Love this!",
        createdAt: "13-05-2025",
      },
    ],
    shares: 11,
  },
  {
    id: 2,
    isLiked: false,
    user: {
      id: "user_002",
      name: "Emily Smith",
      profileImage: "https://randomuser.me/api/portraits/women/34.jpg",
    },
    message:
      "Homemade cookies for the weekend 🍪💛 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    createdAt: "2025-05-09",
    reactions: { like: 92, love: 55, haha: 43, wow: 1, sad: 8, angry: 2 },
    comments: [
      {
        user: "Chris Martin",
        message: "So cool!",
        createdAt: "09-05-2025",
      },
    ],
    shares: 0,
  },
  {
    id: 3,
    isLiked: false,
    user: {
      id: "user_003",
      name: "Michael Scott",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    message:
      "Office party was a blast! 🎉 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    },
    createdAt: "16-05-2025",
    reactions: { like: 90, love: 62, haha: 8, wow: 3, sad: 5, angry: 4 },
    comments: [
      {
        user: "Alice Brown",
        message: "Love this!",
        createdAt: "16-05-2025",
      },
    ],
    shares: 6,
  },
  {
    id: 4,
    isLiked: false,
    user: {
      id: "user_004",
      name: "Chris Martin",
      profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    message:
      "Sunsets and smiles 🌅😊 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    createdAt: "2025-05-12",
    reactions: { like: 193, love: 5, haha: 45, wow: 1, sad: 6, angry: 1 },
    comments: [
      {
        user: "John Doe",
        message: "Amazing!",
        createdAt: "13-05-2025",
      },
    ],
    shares: 10,
  },
  {
    id: 5,
    isLiked: false,
    user: {
      id: "user_005",
      name: "Michael Scott",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    message:
      "Weekend vibes with friends 🍻 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
    },
    createdAt: "2025-05-10T00:52:14.479017Z",
    reactions: { like: 193, love: 5, haha: 26, wow: 4, sad: 7, angry: 4 },
    comments: [
      {
        user: "Sarah Lee",
        message: "Love this!",
        createdAt: "10-05-2025",
      },
    ],
    shares: 19,
  },
  {
    id: 6,
    isLiked: false,
    user: {
      id: "user_006",
      name: "Sarah Lee",
      profileImage: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    message:
      "New recipe success! 🥘👌 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    },
    createdAt: "2025-05-15T09:52:14.479017Z",
    reactions: { like: 125, love: 62, haha: 47, wow: 17, sad: 1, angry: 5 },
    comments: [
      {
        user: "Alice Brown",
        message: "Wow!",
        createdAt: "15-05-2025",
      },
    ],
    shares: 3,
  },
  {
    id: 7,
    isLiked: false,
    user: {
      id: "user_007",
      name: "Emily Smith",
      profileImage: "https://randomuser.me/api/portraits/women/34.jpg",
    },
    message:
      "Throwback to last summer 🏖️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    createdAt: "2025-05-09T05:52:14.479017Z",
    reactions: { like: 84, love: 83, haha: 42, wow: 21, sad: 4, angry: 1 },
    comments: [
      {
        user: "Chris Martin",
        message: "Love this!",
        createdAt: "09-05-2025",
      },
    ],
    shares: 13,
  },
  {
    id: 8,
    isLiked: false,
    user: {
      id: "user_008",
      name: "Jessica Ray",
      profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    message:
      "My cat is the cutest! 🐱❤️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    createdAt: "2025-05-12T04:52:14.479017Z",
    reactions: { like: 117, love: 48, haha: 49, wow: 21, sad: 4, angry: 4 },
    comments: [
      {
        user: "David Johnson",
        message: "Love this!",
        createdAt: "2025-05-12T05:52:14.479017Z",
      },
    ],
    shares: 13,
  },
  {
    id: 9,
    isLiked: false,
    user: {
      id: "user_009",
      name: "Alice Brown",
      profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    message:
      "Morning hike to clear the mind 🌄 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1523289333742-be1143f6b766",
    },
    createdAt: "16-05-2025",
    reactions: { like: 74, love: 56, haha: 0, wow: 26, sad: 7, angry: 4 },
    comments: [
      {
        user: "Alice Brown",
        message: "Looks great!",
        createdAt: "16-05-2025",
      },
    ],
    shares: 18,
  },
  {
    id: 10,
    isLiked: false,
    user: {
      id: "user_010",
      name: "Jessica Ray",
      profileImage: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    message:
      "Just finished a good book 📖 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    createdAt: "2025-05-13T07:52:14.479017Z",
    reactions: { like: 65, love: 80, haha: 48, wow: 2, sad: 10, angry: 0 },
    comments: [
      {
        user: "John Doe",
        message: "So cool!",
        createdAt: "13-05-2025",
      },
    ],
    shares: 20,
  },
  {
    id: 11,
    isLiked: false,
    user: {
      id: "user_011",
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    message:
      "Coffee and coding ☕💻 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    },
    createdAt: "2025-05-16T10:52:14.479017Z",
    reactions: { like: 162, love: 100, haha: 3, wow: 20, sad: 8, angry: 2 },
    comments: [
      {
        user: "David Johnson",
        message: "Wow!",
        createdAt: "16-05-2025",
      },
    ],
    shares: 10,
  },
  {
    id: 12,
    isLiked: false,
    user: {
      id: "user_012",
      name: "John Doe",
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    message:
      "Game night was intense 🎮🔥 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
    },
    createdAt: "15-05-2025",
    reactions: { like: 81, love: 17, haha: 25, wow: 14, sad: 9, angry: 5 },
    comments: [
      {
        user: "Sarah Lee",
        message: "Amazing!",
        createdAt: "15-05-2025",
      },
    ],
    shares: 9,
  },
  {
    id: 13,
    isLiked: false,
    user: {
      id: "user_013",
      name: "Chris Martin",
      profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    message:
      "Beach day with the gang 🏝️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-118143566.jpg",
    },
    createdAt: "18-05-2025",
    reactions: { like: 135, love: 24, haha: 37, wow: 30, sad: 8, angry: 4 },
    comments: [
      {
        user: "Alice Brown",
        message: "So cool!",
        createdAt: "18-05-2025",
      },
    ],
    shares: 8,
  },
  {
    id: 14,
    isLiked: false,
    user: {
      id: "user_014",
      name: "David Johnson",
      profileImage: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    message:
      "Feeling grateful today 🙏 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    createdAt: "2025-05-09T21:52:14.479017Z",
    reactions: { like: 168, love: 12, haha: 42, wow: 21, sad: 1, angry: 0 },
    comments: [
      {
        user: "John Doe",
        message: "Amazing!",
        createdAt: "09-05-2025",
      },
    ],
    shares: 13,
  },
  {
    id: 15,
    isLiked: false,
    user: {
      id: "user_015",
      name: "Emily Smith",
      profileImage: "https://randomuser.me/api/portraits/women/34.jpg",
    },
    message:
      "Tried painting for the first time 🎨 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    },
    createdAt: "2025-05-09",
    reactions: { like: 164, love: 72, haha: 29, wow: 28, sad: 10, angry: 2 },
    comments: [
      {
        user: "Michael Scott",
        message: "So cool!",
        createdAt: "05-05-2025",
      },
    ],
    shares: 18,
  },
  {
    id: 16,
    isLiked: false,
    user: {
      id: "user_016",
      name: "Alice Brown",
      profileImage: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    message:
      "Nature never fails to amaze me 🍃 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    createdAt: "2025-05-09T02:52:14.479017Z",
    reactions: { like: 66, love: 66, haha: 3, wow: 30, sad: 3, angry: 0 },
    comments: [
      {
        user: "David Johnson",
        message: "Wow!",
        createdAt: "05-05-2025",
      },
    ],
    shares: 9,
  },
  {
    id: 17,
    isLiked: false,
    user: {
      id: "user_017",
      name: "Sarah Lee",
      profileImage: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    message:
      "Family dinner nights are the best 🍽️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg",
    },
    createdAt: "20-05-2025",
    reactions: { like: 52, love: 50, haha: 46, wow: 19, sad: 3, angry: 1 },
    comments: [
      {
        user: "Alice Brown",
        message: "Love this!",
        createdAt: "20-05-2025",
      },
    ],
    shares: 2,
  },
  {
    id: 18,
    isLiked: false,
    user: {
      id: "user_018",
      name: "Michael Scott",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    message:
      "Lazy Sunday vibes 🛋️ Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://www.shutterstock.com/image-photo/hd-wallpaper-mountains-landscapes-moon-260nw-2389525731.jpg",
    },
    createdAt: "2025-05-18T15:52:14.479017Z",
    reactions: { like: 94, love: 83, haha: 14, wow: 2, sad: 8, angry: 1 },
    comments: [
      {
        user: "Jessica Ray",
        message: "Amazing!",
        createdAt: "18-05-2025",
      },
    ],
    shares: 15,
  },
  {
    id: 19,
    isLiked: false,
    user: {
      id: "user_019",
      name: "Chris Martin",
      profileImage: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    message:
      "Captured this beauty during a walk 📸 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://c4.wallpaperflare.com/wallpaper/41/681/303/pc-hd-1080p-nature-1920x1080-wallpaper-preview.jpg",
    },
    createdAt: "10-05-2025",
    reactions: { like: 194, love: 38, haha: 24, wow: 4, sad: 9, angry: 2 },
    comments: [
      {
        user: "Chris Martin",
        message: "Looks great!",
        createdAt: "210-05-2025",
      },
    ],
    shares: 20,
  },
  {
    id: 20,
    isLiked: false,
    user: {
      id: "user_020",
      name: "Michael Scott",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    message:
      "Can't get enough of this view 🌇 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias unde voluptatem sequi sunt quibusdam nemo ut velit id a itaque.",
    media: {
      type: "image",
      url: "https://www.iamabiker.com/wp-content/uploads/2023/07/2023-Interceptor-650-Continental-GT-650-HD-wallpapers-19.jpg",
    },
    createdAt: "2025-05-13T10:52:14.479017Z",
    reactions: { like: 120, love: 45, haha: 44, wow: 18, sad: 10, angry: 0 },
    comments: [
      {
        user: "John Doe",
        message: "Looks great!",
        createdAt: "13-05-2025",
      },
    ],
    shares: 12,
  },
];

let base64Data = "";
let fileInput = document.getElementById("file");
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => (base64Data = reader.result);
  reader.onerror = (err) => console.error("Image load error:", err);
});

function changetoInput() {
  document.getElementById("file").click();
}

function getTimeAgo(time) {
  const now = new Date();
  const seconds = Math.floor((now - time) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
}

function clickMe() {
  const postTime = new Date();
  const id = postList.length + 1;
  const obj = {
    id: id,
    isLiked: false,
    message: textArea.value,
    user: {
      name: `${newUser[0].firstName} ${newUser[0].surName}`,
      profileImage: newUser[0].profileImg,
    },
    media: {
      url: base64Data || "",
    },
    comments: [
      {
        createdAt: getTimeAgo(postTime),
      },
    ],
    reactions: {
      like: 0,
      love: 27,
      haha: 31,
      wow: 8,
      sad: 10,
      angry: 5,
    },
  };

  postList.unshift(obj);
  textArea.value = "";
  base64Data = "";
  renderPosts(postList);
}

function renderPosts(data) {
  document.getElementById("postContainer").innerHTML = "";

  data.map((post) => {
    const createdDate = new Date(post.comments[0].createdAt);
    const timeAgo = getTimeAgo(createdDate);
    document.getElementById("postContainer").innerHTML += `
  <div id='post${post.id}' class="post">
          <div class="d-flex w-100 gap-2 p-2">
            <div class="rounded-circle d-flex">
              <img src="${
                post.user.profileImage
              }" class="img" height="50px" width="50px" alt="">
            </div>
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex flex-column">
                <p>${post.user.name}</p>
                <p class="time">${post.comments[0].createdAt}</p>
              </div>
              <div class='d-flex gap-4 p-2'>
                <i class="fa-solid fa-ellipsis highlight"></i>
                <i class="fa-solid fa-xmark highlight" onclick='deletePost(${
                  post.id
                })'></i>
              </div>
            </div>
          </div>
          <div class='messege' id="textMessage${post.id}">
            <p class='textMessage'>${
              post.message.length > 50
                ? post.message.slice(0, 50)
                : post.message
            }
            <span onclick="showFullMessage('${post.message}', ${
      post.id
    })"> ...More </span>
            </p>
          </div>
          <div class='d-flex flex-column align-items-center'>
            <img src="${post.media.url}" class='rounded-4' width="100%">
            <div class='w-100 p-2'>
              <i class="fa-solid fa-face-grin-hearts text-warning"></i>
              <i class="fa-solid fa-thumbs-up text-primary"></i>
              <span id='likeCount${post.id}'>${post.reactions.like}</span>
            </div>
            <div class="d-flex w-100 justify-content-around p-3">
              <div class='highlight' onclick='likeBtn(${post.id})'>
                <i id='likeIcon${
                  post.id
                }' class="fa-solid fa-thumbs-up"></i> Like
              </div>
              <div class='highlight'>
                <i class="fa-solid fa-comment"></i> Comment
              </div>
              <div class='highlight'>
                <i class="fa-solid fa-share"></i> Share
              </div>
            </div>
          </div>
        </div>
`;
  });
}

renderPosts(postList);
let statueBtn = true;
let likedPosts = [];
let cartCount = 0;
function likeBtn(id) {
  const post = postList.find((p) => p.id === id);

  if (!post) return;

  const likeIcon = document.getElementById(`likeIcon${id}`);
  const likeCount = document.getElementById(`likeCount${id}`);

  if (post.isLiked) {
    post.reactions.like--;
    post.isLiked = false;
    likeIcon.classList.remove("text-primary");
    updateLikedCart();
  } else {
    post.reactions.like++;
    post.isLiked = true;
    likeIcon.classList.add("text-primary");
    likedPosts.push(post);
    updateLikedCart();
  }

  likeCount.innerText = post.reactions.like;
}

function updateLikedCart() {
  const likedPosts = postList.filter((post) => post.isLiked);
  document.getElementById("cartCount").innerText = likedPosts.length;
  if (likedPosts == 0) {
    document.getElementById("cartCount").innerText = "";
  }
}
function showLikedPosts() {
  const likedPosts = postList.filter((post) => post.isLiked);
  const container = document.getElementById("likedPostsContainer");
  container.innerHTML = "";

  if (likedPosts.length === 0) {
    container.innerHTML = "<p>No liked posts.</p>";
  } else {
    likedPosts.forEach((post) => {
      container.innerHTML += `
        <div style="border-bottom: 1px solid #ccc; color:black; padding: 10px; border-radius:10px; background-color: #cae9ff; margin:10px">
        <div class="d-flex w-100 gap-2 p-2">
            <div class="rounded-circle d-flex">
              <img src="${
                post.user.profileImage
              }" class="img" height="50px" width="50px" alt="">
            </div>
            <div class="d-flex justify-content-between w-100">
              <div class="d-flex flex-column">
                <p>${post.user.name}</p>
                <p class="time">${post.comments[0].createdAt}</p>
              </div>
              <div class='d-flex gap-4 p-2'>
                <i class="fa-solid fa-ellipsis highlight"></i>
                <i class="fa-solid fa-xmark highlight" onclick='deletePost(${
                  post.id
                })'></i>
              </div>
            </div>
          </div>  
        <p><strong>${post.user.name}</strong></p>
         <p class='textMessage'>${
           post.message.length > 50 ? post.message.slice(0, 50) : post.message
         }
            <span onclick="showFullMessage('${post.message}', ${
        post.id
      })"> ...More </span>
            </p>
          ${
            post.media.url
              ? `<img class='rounded-2' src="${post.media.url}" width="100%" />`
              : ""
          }

           <div class='w-100 p-2'>
              <i class="fa-solid fa-face-grin-hearts text-warning"></i>
              <i class="fa-solid fa-thumbs-up text-primary"></i>
              <span id='likeCount${post.id}'>${post.reactions.like}</span>
            </div>
            <div class="d-flex w-100 justify-content-around p-3">
              <div class='highlight' onclick='likeBtn(${post.id})'>
                <i id='likeIcon${
                  post.id
                }' class="fa-solid fa-thumbs-up"></i> Like
              </div>
              <div class='highlight'>
                <i class="fa-solid fa-comment"></i> Comment
              </div>
              <div class='highlight'>
                <i class="fa-solid fa-share"></i> Share
              </div>
            </div>
        </div>
      `;
    });
  }

  const modal = document.getElementById("likedPostsModal");
  modal.style.display = modal.style.display === "none" ? "block" : "none";
}

function showFullMessage(message, id) {
  document.getElementById(
    `textMessage${id}`
  ).innerHTML = `<p class='textMessage'>${message}</p>`;
}

let deletedPosts = [];
function deletePost(id) {
  const index = postList.find((p) => p.id === id);
  if (index !== -1) {
    const removed = postList.splice(index, 1)[0];
    deletedPosts.push(removed);
  }
}

setInterval(() => {
  document.querySelectorAll(".time").forEach((el) => {
    const postId = el.getAttribute("data-id");
    const post = postList.find((p) => p.id == postId);
    if (post) {
      const createdDate = new Date(obj.comments[0].createdAt);
      el.innerText = getTimeAgo(createdDate);
    }
  });
}, 60000);

document.getElementById("text").addEventListener("click", () => {
  if (statueBtn) {
    document.querySelector(".newPost").style.display = "block";
    document.querySelector(".model").style.display = "block";
    statueBtn = false;
  } else {
    document.querySelector(".newPost").style.display = "none";
    document.querySelector(".model").style.display = "none";
    statueBtn = true;
  }
});

const animatedElements = document.querySelectorAll(
  ".post, .storyContainer, .card1"
);

animatedElements.forEach((el, index) => {
  el.style.setProperty("--i", index);
});

function closeModal() {
  document.querySelector(".newPost").style.display = "none";
  document.querySelector(".model").style.display = "none";
  statueBtn = true;
}
let user1 = document.getElementById("showUser");
function showUser() {
  if (statueBtn) {
    user1.style.display = "block";
    statueBtn = false;
  } else {
    user1.style.display = "none";
    statueBtn = true;
  }
}

function logOutUser() {
  localStorage.removeItem("loginDetails");
  document.querySelector(".loginPage").style.display = "block";
  document.querySelector(".model").style.display = "block";
  setTimeout(() => {
    window.open("../components/login.html");
  }, 1000);
}

let menuElement = document.getElementById("icon");
let iconsCenter = document.getElementById("iconList");

menuElement.addEventListener("click", () => {
  if (statueBtn) {
    iconsCenter.innerHTML = `
       <div class="iconList">
         <div class="center" onclick="highlightButton('home')">
          <i class="fa-solid fa-house iconImage"></i>
         </div>
         <div class="center" onclick="highlightButton('friends')">
          <i class="fa-solid fa-user-group iconImage"></i>
         </div>
         <div class="center" onclick="highlightButton('video')">
          <i class="fa-solid fa-video video iconImage"></i>
         </div>
         <div class="center" onclick="highlightButton('stores')">
          <i class="fa-solid fa-shop store iconImage"></i>
         </div>
         <div class="center" onclick="highlightButton('game')">
          <i class="fa-solid fa-gamepad gaming iconImage"></i>
         </div>
      </div>
  `;
    statueBtn = false;
    iconsCenter.style.display = "block";
    document.getElementById("mainContainer").style.marginTop = "110px";
  } else {
    iconsCenter.style.display = "none";
    document.getElementById("mainContainer").style.marginTop = "55px";
    statueBtn = true;
  }
});

document.getElementById("buttonElem").disabled = true;

let textArea = document.getElementById("textArea");
function isEmpty() {
  let str = textArea.value;
  if (/[a-zA-Z0-9]+/.test(str)) {
    document.getElementById("buttonElem").disabled = false;
  } else {
    document.getElementById("buttonElem").disabled = true;
  }
}

let textInput = document.getElementById("inputText");
textInput.addEventListener("input", () => {
  let newPosts = postList.filter((post) => {
    let textValue = textInput.value;
    let userName = post.user.name;
    if (userName.match(textValue)) {
      return post;
    }
  });

  // document.getElementById("postContainer").innerHTML = "";
  renderPosts(newPosts);
});
