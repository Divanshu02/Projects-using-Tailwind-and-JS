let input = document.getElementsByTagName("input")[0];
let searchButton=document.querySelector('.search-but');
let userLogo = document.querySelector(".user-logo");
let profileName = document.querySelector(".user-name");
let userId = document.querySelector(".user-id");
let userBio = document.querySelector(".user-bio");
let joiningDate = document.querySelector(".joining-data");
let userRepos = document.querySelector(".user-repo");
let userFollowers = document.querySelector(".user-followers");
let userfollowing = document.querySelector(".user-following");
let userLocation = document.querySelector(".user-location");
let twitterUsername = document.querySelector(".twitter-username");
let userBlog = document.querySelector(".blog");
let userCompany = document.querySelector(".company");
let found=document.querySelector('.not-found');

let url = "https://api.github.com/users/";

// Fetching Data-----------------------
let getData = async (name) => {
  url = `https://api.github.com/users/${name}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
      throw new  Error("Unidentified Name");
  }
};
//   --------------------------------------

function PreventFromDefault(e) {
  e.preventDefault();
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

input.addEventListener("change", (e) => {
  const name = e.target.value;
  if (name != "") {
    getData(name).then((data) => {
      let {
        login,
        avatar_url,
        name,
        html_url,
        location,
        public_repos,
        bio,
        followers,
        following,
        blog,
        created_at: date,
        twitter_username,
        company,
      } = data;

      // console.log(
      //   login,
      //   avatar_url,
      //   name,
      //   html_url,
      //   location,
      //   public_repos,
      //   followers,
      //   following,
      //   date,
      //   bio,
      //   twitter_username,
      //   blog,
      //   company
      // );

      userLogo.src = avatar_url;
      if (name == null) profileName.textContent = e.target.value;
      else profileName.textContent = name;

      userId.href = html_url;
      userId.textContent = `@${login}`;

      if (bio == null) userBio.textContent = "This profile has no bio";
      else userBio.textContent = bio;

      let d = new Date(`${date}`);
      joiningDate.textContent = `Joined ${d.getDate()} ${
        months[d.getMonth()]
      } ${d.getFullYear()}`;

      userRepos.textContent = public_repos;
      userFollowers.textContent = followers;
      userfollowing.textContent = following;
      if (location != null) {
        userLocation.textContent = location;
      } else {
        userLocation.innerHTML = `<span class=" text-slate-600 font-bold ">Not Available<span> `;
      }

      if (twitter_username != null) {
        twitterUsername.removeEventListener("click", PreventFromDefault);
        twitterUsername.textContent = twitter_username;
        twitterUsername.href = `https://twitter.com/${twitter_username}`;
      } else {
        twitterUsername.addEventListener("click", PreventFromDefault);
        twitterUsername.innerHTML = `<span class=" text-slate-600 font-bold underline">Not Available<span> `;
      }

      if (blog != "") {
        userBlog.removeEventListener("click", PreventFromDefault);
        userBlog.textContent = blog;
        userBlog.href = blog;
      } else {
        userBlog.addEventListener("click", PreventFromDefault);
        userBlog.innerHTML = `<span class=" text-slate-600 font-bold underline">Not Available<span> `;
      }

      if (company != null) {
        userCompany.textContent = company;
      } else {
        userCompany.innerHTML = `<span class=" text-slate-600 font-bold ">Not Available<span> `;
      }
    }).catch(()=>{
      console.log('Error occured')
      found.style.display='block';
      setTimeout(() => {
        found.style.display='none';
      }, 3000);
    })
  }
});


window.addEventListener("load", () => {
  getData("Divanshu02").then((data) => {
    let {
      login,
      avatar_url,
      name,
      html_url,
      location,
      public_repos,
      bio,
      followers,
      following,
      blog,
      created_at: date,
      twitter_username,
      company,
    } = data;

    // console.log(login,avatar_url,name,html_url,location,public_repos,followers,following,date,bio,twitter_username,blog,company);

    userLogo.src = avatar_url;
    if (name == null) profileName.textContent = `${login}`;
    else profileName.textContent = name;

    userId.href = html_url;
    userId.textContent = `@${login}`;

    if (bio == null) userBio.textContent = "This profile has no bio";
    else userBio.textContent = bio;

    let d = new Date(`${date}`);
    joiningDate.textContent = `Joined ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;

    userRepos.textContent = public_repos;
    userFollowers.textContent = followers;
    userfollowing.textContent = following;
    if (location != null) {
      userLocation.textContent = location;
    } else {
      userLocation.innerHTML = `<span class=" text-slate-600 font-bold ">Not Available<span> `;
    }

    if (twitter_username != null) {
      twitterUsername.removeEventListener("click", PreventFromDefault);
      twitterUsername.textContent = twitter_username;
      twitterUsername.href = `https://twitter.com/${twitter_username}`;
    } else {
      twitterUsername.addEventListener("click", PreventFromDefault);
      twitterUsername.innerHTML = `<span class=" text-slate-600 font-bold underline">Not Available<span> `;
    }

    if (blog != "") {
      userBlog.removeEventListener("click", PreventFromDefault);
      userBlog.textContent = blog;
      userBlog.href = blog;
    } else {
      userBlog.addEventListener("click", PreventFromDefault);
      userBlog.innerHTML = `<span class=" text-slate-600 font-bold underline">Not Available<span> `;
    }

    if (company != null) {
      userCompany.textContent = company;
    } else {
      userCompany.innerHTML = `<span class=" text-slate-600 font-bold ">Not Available<span> `;
    }
  });
});
