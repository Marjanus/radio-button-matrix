# radio-button-matrix

Features: 
- Ability to select images from the hard drive for every row and column
- Ability to set labels for every row and column
- Ability to add new rows and columns
- Ability to remove rows and columns
- A backend to store the data
- Ability to reset form to initial value
- Radio button matrix

Statistics:
- Amount of rows created
- Amount of columns created
- Amount of images uploaded
- The string length of the longest label for rows and columns
- The string length of the shortest label for rows and columns

Saves images in uploads folder, saves form data to mLab (database-as-a-Service for MongoDB).

Tested in Chrome, desktop view only.

**Scripts**

*npm run server* to serve BE. After server script load, FE should be started with *npm start*
