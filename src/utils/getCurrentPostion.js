export function getCurrentPosition(options = {}) {
  if (!navigator.geolocation) {
    return Promise.reject(new Error('브라우저가 Geolocation을 지원하지 않습니다.'));
  }
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}
