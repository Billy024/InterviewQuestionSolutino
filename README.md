## Question

Your task is to modify the current project to solve these problems:

1. The program does not encrypt the password when storing it into database. Please try to use 'bcrypt' library to store the password in encrypted form.
2. When the user is logged in, "/" shows "Welcome. Your name is :[object Object]". Please change the code so that it shows proper name. Also, please add some words to show the number of users that has signed up so far.
3. There are somewhere that do not follow HTTP standard. Please fix.
4. In MySQL, it's common to use an auto-incrementing primary key as a unique identifier for records in a table. 
Although MongoDB has a built-in unique identifier (_id), which is an ObjectId, we'd like you to implement a similar auto-incrementing index for a MongoDB collection using Mongoose
Your task is to modify the project and create an identifier, which should be a unique and auto-incrementing integer value. 
This field will act as an additional identifier for each document inserted into the collection.
Please feel free to change the project to implement the feature.
5. (Optional) Try to modify the design for the signup, login form so that it may look nicer. No need to be very nice.
