# Create Project - ts
- npx create-expo-app --template

## Babel alias
- npm install --save-dev babel-plugin-module-resolver

## Font Google - Roboto
- npx expo install expo-font @expo-google-fonts/roboto

## NativeBase
- npm install native-base
- npx expo install react-native-svg@12.1.1
- npx expo install react-native-safe-area-context@3.3.2

## SVG with components
- npm i react-native-svg-transformer --save-dev

## React Navigation
- npm install @react-navigation/native
- npx expo install react-native-screens react-native-safe-area-context
- npm install @react-navigation/native-stack

## Bottom Tabs Navigation
- npm install @react-navigation/bottom-tabs

## Picker - add imagem da galeria
- npx expo install expo-image-picker
- https://docs.expo.dev/versions/latest/sdk/imagepicker/
- adicionar no app.json
"plugins": [
    [
    "expo-image-picker",
    {
        "photosPermission": "The app accesses your photos to let you share them with your friends."
    }
    ]
],

## FileSystem
- npx expo install expo-file-system
- Retorna inf. sobre arquivos do usuários, como imagem...
- https://docs.expo.dev/versions/latest/sdk/filesystem/

## React Hook Forms
- npm install react-hook-form
- Todos os valores são enviados de uma única vez
- https://react-hook-form.com/

## Validação por Schema - Yup
 - npm install @hookform/resolvers yup
 - Zod faz a mesma funcionalidade