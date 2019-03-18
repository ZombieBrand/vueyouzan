import axios from "axios";


function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      let status = res.data.status;
      switch (status) {
        case 200:
          resolve(res);
          break;
        case 300:
          location.href = 'login.html';
          resolve(res);
          break;
        default:
          reject(res);
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export default fetch
