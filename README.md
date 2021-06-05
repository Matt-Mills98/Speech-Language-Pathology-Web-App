# Speech Language Pathology (SLP) Web App, Version 1.0.0
## Purpose:
#### *Automate the Process of Recording Information During SLP Appointments.* 
##### SLPs see upwards of 10 patients per day. Of these patients, approx. 60-70% are young and/or learning disabled. During any given appointment, an SLP is tasked with recording information in a very timely matter, as their patients are easily distracted. Once a patient is distracted, it is very difficult for that patient to regain attention. This leads to very inefficient appointments. Automating the process of recording information would result in less time spent recording information during an appointment, therefore reducing distractions and leading to much more efficient appointments.
## System Design 
### Levels
#### User Interface
##### The User Interface was created primarily using ReactJS, a Javascript Framework. Within the UI, react-router was utilized for performance and maneuverability. Public and private routing was also used for security purposes, meaning certain navigation buttons and URLs cannot be accessed publicly. Once signed in, a user can access private routes. For much of the styling, Material-UI was used. Through this package downloaded via npm, a minimalistic and easily traversable UI was created. Much of the Material UI components were overridden for customizing purposes. 
#### API
##### Express API was utilized for this implementation. Express is a Node.js framework, which allows for CRUD operations. Due to the API, users are able to create patients, appointments, and tasks pertaining to an SLP appointment. These can all be modified once created. Routing was utilized in the Express API for organization purposes. Express API acts as a middleman between the UI and the DB, as ReactJS cannot directly connect to a backend DB.
#### MySQL DB
##### Through XAMPP and phpMyAdmin, a MySQL DB was created. XAMPP is an Apache product that offers several development tools and services for a user. One such tool is phpMyAdmin, a UI for creating MySQL Databases. Within phpMyAdmin, a DB was created with 3 main tables. These tables include patients, appointments, and tasks. These tables are connected via primary keys and foreign keys. Depending on the table, On Delete, cascading or setting Null will occur.
## Future Implementations
#### User Creation
##### Currently there is only one user hardcoded into the API. For login, hashes and tokens are created and used for security purposes. Although this is a secure process that can be adapted to new users, new DB tables need to be created for a user to create their own account via UI.
#### Data Input Corrections
##### Any data can be inputted into any field. This both can cause errors for the DB and result in users attempting SQL Injection. Before this Web App is made public, this issue must be dealt with.
#### Auditing and Deleting Changes
##### This mainly pertains to the delete option within the web app. Currently, if a patient is deleted, that patient and all relevant data will be deleted. While this is useful for development purposes, it is not good for real, public implementations. If a user is deleted, this information should just be moved or made not visible. This is useful for data recovery given some accident or failure. Auditing should be done when a user is deleted, as this will prove useful for organizational purposes.
#### Further Functionalities
##### There are several different functionalities planned for this Web App. One example is a schedular that organized future appointments in such a way that the user can stay organized. Another example is creating better data management options, such as being able to send recorded data to a downloadable excel sheet automatically following the completion of an appointment. There are many things planned for the future of this Web App.
