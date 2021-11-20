

// env 0-release, 1-debug, 2-debug-https
let release = 2;

let baseURL = "";

if (release == 0) {
  baseURL = "http://192.168.100.113/showSystem/";
} else if (release == 1) {
  baseURL = "http://192.168.100.113/showSystem/";
} else if (release == 2) {
  baseURL = "http://localhost:8080/showSystem/";
}


export {
  baseURL, release
}
