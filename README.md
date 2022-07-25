# ACNH-Fish-Caught
This project uses the Animal Crossing API to generate a progress tracker for Nintendos Animal Crossing New Horizons.
#### A working sample can be found here https://animalcrossingprogress.netlify.app/
<img width="1792" alt="Screen Shot 2022-07-25 at 9 55 14 AM" src="https://user-images.githubusercontent.com/100736905/180795495-1592fb6e-8887-4780-baf0-d1ac4a3a3236.png">

# How it's made
The Animl Crossing progress tracker takes in JSON data from the animalcrossingAPI and returns each object back to the frontend in the form of a picture with a name
and a punny catchphrase from the animal crossing game. The user can click the object that they have collected in-game and the color will change indicating
that the item has been found. Each individual item is stored as a local storage item so users can leave the page and return without losing progress,
and there is zero fuss about making an account. 


# Optimizations
Using the api calls seperately drastically reduced the load time of data. Implementing a load screen to load images behind the scenes, made the software 
easier to view and created an overall better user experience. The settings screen allowed users to sort by date and time and by "caught and uncaught".

# Lessons Learned
OOP would have significantly decreased the amount of time spent of this project. I learned a lot about local storage and how to configure storing objects into local storage to keep user progress.
# Examples 

