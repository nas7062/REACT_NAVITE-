// // hooks/usePushNotification.ts
// import { useEffect, useState } from "react";
// import { Platform } from "react-native";
// import * as Notifications from "expo-notifications";

// type PushResult = {
//   expoPushToken: string | null;
// };

// export default function usePushNotification(): PushResult {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

//   useEffect(() => {
//     // 1) 웹이면 아무 것도 하지 않음 → vapidPublicKey 에러 방지
//     if (Platform.OS === "web") {
//       console.log("[usePushNotification] skip on web");
//       return;
//     }

//     // 2) 모바일(ios/안드)에서만 토큰 요청
//     async function registerForPushNotificationsAsync() {
//       try {
//         const { status: existingStatus } =
//           await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;

//         if (existingStatus !== "granted") {
//           const { status } = await Notifications.requestPermissionsAsync();
//           finalStatus = status;
//         }

//         if (finalStatus !== "granted") {
//           console.log("푸시 권한 거부됨");
//           return;
//         }

//         const tokenData = await Notifications.getExpoPushTokenAsync();
//         const token = tokenData.data;
//         console.log("[usePushNotification] expo push token:", token);
//         setExpoPushToken(token);
//       } catch (e) {
//         console.log("[usePushNotification] error:", e);
//       }
//     }

//     registerForPushNotificationsAsync();
//   }, []);

//   return { expoPushToken };
// }
