# mtm6302-capstone-pu000007
Name: Xincheng Pu
Student number: 041134447
The project I intend to complete: Astronomy Picture of the Day Search

Design Decisions Report:

The overall app interface were designed based on the immersive color theme
and easy to use.

==Dark Background Theme==
Use a dark background throughout the web app, the dark color reflects 
the mystery space.

==Homepage Design==
Simple layout allows users to easily find the area to select a date 
to see the Astronomy Picture of the Day.

==Interactive Icon==
Users can save the image as a favorite by clicking "Add to My Favarite Pictures". 
Users can also delete the picture from "My Favorite Pictures" page by click the 
heart icon on the picure.


==Prototype report== 
First I created the HTML structure for the home page and added CSS to make it 
close to the mockup. Then I added a media query to make it responsive. Later 
I created the gallery page using the CSS grid and the demo page for the picture 
when user click confirm at the home page.


Steps taken to create the web application:

1.In the HTML, I added a header containing navigation links and an initially 
empty main content area. It serves as the single-page container where content 
updates dynamically through Javastript based on user interactions.

2.I used method renderSearchForm(), which is called on page load via DOMContentLoaded 
event. When the user visits the site, the app shows a form that user can enter a date.

3.I used method handleDateSubmit(), triggered by clicking the Confirm button;
it uses fetch() to call the API. After the user submits a date, the app sends a
request to NASA’s API to get the picture for that day.

4.I used method renderAPOD(data), which renders the APOD details dynamically inside 
the page.

5.I used method addToFavourites(apod), which adds the picture data to localStorage, 
this allow users to save the currently shown picture to favourites by clicking a button.

6.In the renderAPOD(data) function, I added a click event listener to the displayed 
image element. When the user clicks the image, it triggers the showHDImage() function, 
which replaces the page content with an overlay that displays the HD version 
of the image.The overlay also has a click event listener that listens for clicks on the 
empty background area. When the user clicks the empty area, the overlay closes and the 
original content restored. 

7.I used localStorage.getItem() and localStorage.setItem() to save and retrieve
favorite pictures from the browser’s local storage, allowing the data to 
persist after refreshing or closing the page.

8.I used renderFavourites() to displays all favourites and removeFavourite(index) 
to removes an item from localStorage and updates the display, so the app shows 
all saved favourites and allows users to delete any by clicking the heart icon.





