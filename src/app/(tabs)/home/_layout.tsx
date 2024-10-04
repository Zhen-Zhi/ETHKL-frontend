// import { View, Text } from 'react-native'
// import React from 'react'
// import { Stack } from 'expo-router'
// import { ConnectButton, useConnect } from "thirdweb/react";
// import { createWallet } from 'thirdweb/wallets';
// import { baseSepolia } from 'thirdweb/chains';
// import { client } from '@/src/constants/thirdweb';
// import { ThemedButton } from '@/src/components/ThemedButton';

// export default function HomepageStack() {
//   const ConnectWithMetaMask = () => {
//     const { connect, isConnecting } = useConnect();
//     return (
//       <ThemedButton
//         title="Connect with MetaMask"
//         variant="secondary"
//         loading={isConnecting}
//         loadingTitle="Connecting..."
//         onPress={() => {
//           connect(async () => {
//             const w = createWallet("io.metamask");
//             await w.connect({
//               client,
//             });
//             return w;
//           });
//         }}
//       />
//     );
//   };

//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ 
//         headerShown: false, 
//         headerRight: () => <ConnectWithMetaMask />
//       }} />
//     </Stack>
//   )
// }



import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { ConnectButton, useConnect } from "thirdweb/react";
import { ThemedButton } from '@/src/components/ThemedButton';

export default function HomepageStack() {
  // const ConnectWithMetaMask = () => {
  //   const { connect, isConnecting } = useConnect();

  //   return (
  //     <ThemedButton
  //       title="Connect with MetaMask"
  //       variant="secondary"
  //       loading={isConnecting}
  //       loadingTitle="Connecting..."
  //       onPress={() => connect(metamaskWallet())} // Use metamaskWallet function from thirdweb
  //     />
  //   );
  // };

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
        }} 
      />
    </Stack>
  );
}