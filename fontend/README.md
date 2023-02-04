# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



คู่มือ GiftDemo

อธิบายแต่ละหน้า
## Fontend (React)
App.js ใช้ในการกำหนด route ไปหน้าอื่่นๆ
็Home.js หน้าแรกของเว็บ ประกอบด้วย link พาไปหน้า GiftPage FoodPage CheckStatePage
GiftPage.js หน้าสำหรับการอัพเดรตสถานะสิทธิของของขวัญในฐานข้อมูล จะไปเรียก Handheld.js 
FoodPage.js ใหน้าสำหรับอัพเดรตสถานะสิทธิของอาหารในฐานข้อมูล จะไปเรียก Handheld.js 
CheckStatePage.js หน้าตรวจสอบสถานะสิทธิอาหารและของขวัญในฐานข้อมูล แล้วแจ้งเตือนพนักงานออกมา
Handheld.js ทำหน้าที่อัพเดรตสถานะสิทธิของของขวัญและอาหารในฐานข้อมูล
## Backend (Node.Js)
app.js ใช้สำหรับเชื่อมต่อและดำเนินการต่างๆกับฐานข้อมูล
์NY_Gift.js กำหนด config ของฐานข้อมูล

## รันเพื่อทดสอบการทำงาน (ต้องรันสองไฟล์พร้อมกัน)
1 เข้า fontend แล้วใช้คำสั่ง npm start บน terminal
2 เข้า backend แล้วใช้คำสั่ง node app.js บน terminal

## deployment 
1 เตรียมเครื่องมือ
    1.1 โฟลเดอร์ build สำหรับการ deploy app ส่วน fontend
        1.1.1 เข้า fontend แล้วเปิด cmd ขึ้นมาพิมพ์คำสั่ง npm i -g serve เพื่อลงเครื่องมือสำหรับ deploy
        1.1.2 พิมพ์คำสั่ง npm run build บน cmd เมื่อได้โฟลเดอร์ build ให้เข้าไปในโฟลเดอร์และเปิด cmd พิมพ์คำสั่ง npx serve -s 
    1.2 โฟลเดอร์ backend
2 deploy (ในการ deploy ต้องมีการเปิดใช้งานทั้ง fontend และ backend)
    2.1 นำเครื่่องมือทั้งหมดเข้าไปใน server
    2.2 เข้าไปใน build เปิด cmd ขึ้นมาแล้วพิมพ์คำสั่ง npx serve -l {พอร์ทที่ต้องการใช้} -s
    2.3 เข้าไปในส่วน backend เปิด cmd ขึ้นมาแล้วพิมพ์คำสั่ง node app.js