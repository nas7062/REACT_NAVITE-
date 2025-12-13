import * as SecureStore from "expo-secure-store";

const isWeb = typeof window !== "undefined"; // 웹 환경인지 확인

// 웹에서 사용하는 저장소
async function saveStorage(key: string, value: string) {
  if (isWeb) {
    localStorage.setItem(key, value); // 웹에서는 localStorage 사용
  } else {
    await SecureStore.setItemAsync(key, value); // 모바일에서는 SecureStore 사용
  }
}

async function getStorage(key: string) {
  if (isWeb) {
    return localStorage.getItem(key); // 웹에서는 localStorage 사용
  } else {
    return await SecureStore.getItemAsync(key); // 모바일에서는 SecureStore 사용
  }
}

async function deleteStorage(key: string) {
  if (isWeb) {
    localStorage.removeItem(key); // 웹에서는 localStorage 사용
  } else {
    await SecureStore.deleteItemAsync(key); // 모바일에서는 SecureStore 사용
  }
}

export { saveStorage, getStorage, deleteStorage };
