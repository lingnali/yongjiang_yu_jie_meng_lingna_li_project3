### Project 3 – Writeup
#### Group: Jie Meng, Lingna Li, Yongjiang Yu


##### What were some challenges you faced while making this app?

-	Integrate frontend with backend: One of the most frequently encountered challenge while making this review app was updating UI with the change from backend synchronously. We had to make sure the UI response correctly once we poll the request or change something from the server side. Similarly, everything that the UI might not be telling us but it actually happened or did not happen, so it was required for us to confirm the logic with the help of server. For a full stack application, it was essential to make sure the frontend and backend interact well with each other.

-	Design user interface and improve user experience: In order to create a better user experience for the website visitor, we spent time designing and customizing the UI by applying CSS and bootstrap. It was common to see that some effect of UI might not as same as our expectation, so we had to take time to check details from documentation and tried to implement in different methods. 

-	Test and troubleshoot: For this full stack application, it was inevitable to test against the combination of the frontend and backend. Therefore, it was important for us to understand the interaction between frontend and backend, the architecture for the server-logic, the storage and schema of data model, etc. We often encountered a situation where the end-user had some bug, but we cannot see it. Sometime, the bug may be configuration0-related or depend on the sequence of event, which is hard to detect.



##### Given more time, what additional features, functional or design changes would you make

If more time allowed:
(1)	Add more validation to avoid web security threats. For example, so far, users could add any content when they post a review. However, it might be a potential threat for the web application because user could add script to access some confidential user information. Similarly, the existing validation about username, password, etc. could also be optimized. 

(2)	Optimized frontend UI and user experience. Some details could still be improved and make the frontend interface much more user friendly. For example, the navbar could collapse or expand accordingly with the change of screen size. In addition, background music could be imported into the review app when user browser the website, etc..

##### What assumptions did you make while working on this assignment?

-	To initialize the landing page by adding books into database via running seeds/seeds.js
-	To start the development environment by running "devstart" script.
-	To start the production environment, run "start" script.

##### How long did this assignment take to complete?

5 days
