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

<br />
<br />
  
# Getting Started with CryptoPilot
## 1. Project file layout
![project layout](https://github.com/ashishp911/Cryptocurrency-Application/blob/main/src/Images/project_file_layout.jpeg)

## Create react App 
```
npx create-react-app cryptocurrency
```

## install Material UI
```
npm install @mui/material @mui/system @emotion/react @emotion/styled @mui/styles @mui/lab  
```

## install Axios
```
npm i axios
```

## install React Router DOM

```
npm install react-router-dom
```

## Coingecko API
We are going to use 4 endpoints for this application, you can find all API related data here ->
 [Coingecko API](https://www.coingecko.com/en/api/documentation).
1. TrendingCoins (For carousel)
2. SingleCoin (For single coin data)
3. CoinList (For coin Table)
4. HistoricalChart (For chart data)

### 1. Reseting all css styles to default in app.css
### 2. Importing a font Montserrat from google
```
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;800&display=swap');
```
### 3. in App.js
Using routing in app.js so that we can toggle between homepage and coin_page. Wrap the entire app.js inside ``` <BrowserRouter> </BrowserRouter> ``` tags. Also do not forget to import Routes, Route and BrowserRouter. 
```
import { Routes, Route, BrowserRouter } from "react-router-dom";
``` 
Enclose all the routes of your application between the ```<Routes> </Routes>``` tags. (In our case, homepage and coin_page). 
Header.js will be outside the routes, so that it will be displayed all through the application.

We change the background color of the entire app to ```"#14161a"``` in app.js

## Header.js
We use Appbar from material UI and Container(it ensures that the appbar is responsive).
The appbar will contain Typography(for the title of our application) and a select tag(to select the currency).
Flex : 1 for our typography indicates that the width of all other elements will be the same as their content, but the element with flex: 1 will be given the remaining full space.
We wrap whole header with darkTheme.

## Context API
Since we want the currency and symbol selected through the header for the entire application, we will use context API. We wrap our entire app within cryptocontext, from index.js. We export {currency, symbol, setCurrency}, so that any component can now use these states.

## Homepage
Our homepage is divided into 2 parts, banner (upper part with carousel) and coint table (table with all trending coins.)

### Banner
1. For the banner, we use background image as banner2.
2. Banner has 3 parts, Name of the application (Typography), small description (Typography) and the carousel. I created a different react component for the carousel.
3. All APIs are in Api.js
###  Carousel
1. For carousel, we need the trendingCoins() api. This API takes currency as a parameter. We get the currency from context API. 
2. Instead of fetch, I have used axios.get() to fetch data from the API.
3. We use useEffect such that fetchTrendingCoins() function is called for the first time the page is rendered, also we add currency in the dependency list, so that whenever currency changes, fetchTrendingCoins() is called.
4. We use useState to keep the fetched data in a variable called trending. 
5. We use [**react alice carousel**](https://www.npmjs.com/package/react-alice-carousel) for our carousel.
6. installation -->
```
npm i react-alice-carousel
```
7. We use ```<AliceCarousel/>``` to create carousel.
8. We add responsive object in our AliceCarousel, and we have deifned it such that when the page in 0 pixels or more, we display 2 items and if its greater then 512 pixels,  we display 4 items.
9. **Items** in the most important part of AliceCarousel.
10. In items, we use the javaScript **object.map()** function to travese all the coins in trending which we fetched from our API.
11. For the carousel, we add ```<Link></Link>``` tag so that by clicking on the image, we can go to any particular coin.
12. We add ```<img>``` and ```<span></span>``` tags for image, name, price and 24hr change.
example of carousel image is given below
<br />

![carousel example](https://github.com/ashishp911/Cryptocurrency-Application/blob/main/src/Images/carousel%20.png)
### Coins Table
1. For coins table, we are going to use coinList api from api.js
2. We again use axios to fetch coin list.
3. With the heading (Typography) and search bar (TextField)
4. Next comes the material UI [**TABLE**](https://mui.com/material-ui/react-table/) which will contain all the coins data like, 
* Coin, 
* Price, 
* 24h Change, 
* Market Cap.
5. For table body, we call ```handleSearch()```, which returns the coin we inputted in TextField.
6. We use slice function to only display 10 coins per page.
7. We also added ```<LinearProgress />``` so that if the coins are not fetched from the API, we will show a progress bar using ```loading``` state. (More on LinearProgress [here](https://mui.com/material-ui/react-progress/))

### Pagination
1. Details about pagination [**here**](https://mui.com/material-ui/react-pagination/)
2. We use pagination to divide the number of pages into the length of handleSearch() divided by 10.
3. We add onChange fucntion so that ```page``` will be set to the page number we clicked. 
4. We also add ```window.scroll(0,450)``` so that on change the window will be shown from the top.


## Coins page
1. We used useparams to fetch id of coin from URL.
``` 
const { id } = useParams(); 
```
2. We use ```singleCoin(id)``` API to get information of a single coin. 
3. Coinpage is divided into Coin_Info and CoinChart.

### Coin_Info
1. Sidebar(Coin_Info.js) is a component inside CoinPage will have some details about the coin. 
2. I added reponsive styles for this part. If the screensize is less than md, then flexDirection will be column.I did this by using ```useMediaQuery()```.
3. For coin_Info, I added coin image, coin id, description, rank, market cap, 
4. The description of a coin has some html in it, so to remove that, we added ```HTMLReactParser```.
5. Installation
```
npm i html-react-parser
```
6. I made the page responsive by adding different styles for diffent screen sizes using ```useMediaQuery()```.

### CoinChart
1. CoinChart is another component inside CoinPage which will have historic data of the prices of the coin.
2. I used chartJs2 for plotting the chart.
3. Installation
```
npm i react-chartjs-2 chart.js
```
4. Refer [Here](https://github.com/reactchartjs/react-chartjs-2) for chartjs2
5. We used historicalChart API to get the data
6. We have 2 dependencies for the useEffect API here, currency and days which means if currency or days change, the page will re-render.
7. ```historicalData``` will have an array of time and price.
8. We use ```<Line />``` from chartjs 2 for our chart. It will have labels (time) and dataset (price of the coin).

### SelectButton
1. Below the chart, we will add 4 buttons which will give options to show the chart data of 
* 1 Day
* 1 Month
* 3 Months  
* 1 Year.
2. Select Button is a custom component to give styles to the buttons.

![selectButton](https://user-images.githubusercontent.com/62334020/232167886-3d20ebab-7341-441a-80c7-e574ef9356a1.png)















