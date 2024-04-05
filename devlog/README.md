On March 27, 
I began my technical assessment by opening it using VS Code. I carefully read through the instructions provided in the README file, which initially prompted me to download VS Code and Node.js. However, since I already had both installed on my system, I didn't need to go through that step. For the assessment, I decided to work on four backend problems. While I wasn't familiar with testing tools like Postman, I took the initiative to learn more about API testing by watching YouTube videos. I specifically focused on tutorials about using Postman, which helped me build a solid understanding of how to test APIs effectively. Additionally, as I am not strong in Typescript and JavaScript, I watched tutorials on these programming languages  to enhance my skills.
 
   Typescript Tutorial: https://www.youtube.com/watch?v=ahCwqrYpIuM
   JavaScript Tutorial: https://www.youtube.com/watch?v=W6NZfCO5SIk
   Postman API Testing Tutorial Playlist: https://www.youtube.com/watch?v=cGn_LTFCif0&list=PLhW3qG5bs-L9P22XSnRe4suiWL4acXG-g



March 28:
Discovered a bug in the GET request handling, where the query object in the route handler file had only two variables, website, and id, missing the username. This oversight caused issues with filtering passwords based on the provided query parameters, as username-based filtering was not implemented. To fix this bug, I updated the query parameters in the route handler to include the username for proper filtering. Additionally, I ensured that the getPasswords method in the PasswordManagerComponent class returns filtered passwords based on all provided query parameters, including the username, website, and id.


March 29:
Encountered another bug where the query object in the route handler file was not properly handling username-based filtering for GET requests. This issue resulted in incorrect filtering of passwords, affecting the accuracy of the retrieved data. To address this, I thoroughly reviewed the GET request handling in both the component and router files. I made necessary adjustments to ensure that the query object correctly includes the username for filtering, improving the accuracy and reliability of password retrieval.


March 30:
Today, I faced a critical issue with the createPassword method, allowing the creation of passwords without essential fields -password and username, potentially leading to authentication issues. To fix this, I added validation checks to ensure both newPassword.password and newPassword.username are present before creating a password, enhancing data integrity. Furthermore, I resolved issues with the updatePassword method not persistently updating passwords in both memory and the JSON file. I made modifications to the updatePassword method in both the PasswordManagerComponent and Database classes, ensuring persistent updates in both memory and the JSON file.


March 31:
Discovered a critical bug in the delete method while working on the project. Additionally, I noticed that all passwords were increasing in size and duplicating every time I performed operations like deletion, update, or creation. Wasnt sure if i cuased this but regardless, this issue was related to how the encryption and decryption processes were handled, causing passwords to grow in size with each operation. Unfortunately, I couldn't fix the delete method immediately, but I plan to revisit the code tomorrow and focus on refining the encryption and decryption logic to address this issue.


April 01:
Today, I revisited the code to address the bug in the deletePassword method, ensuring that passwords are properly removed from the system. Furthermore, I made specific improvements to the encryption and decryption processes in the EncryptService class to prevent passwords from growing larger with each operation. These enhancements have resulted in a more stable and efficient password management system.


April 02:
Similarly, I encountered an issue where the updatePassword method was not persistently updating passwords in both memory and the JSON file. I took steps to modify the updatePassword method, ensuring persistent updates in both memory and the JSON file, thus resolving the issue. Additionally, during today's development, I addressed a GET request bug to improvethe overall functionality and reliability of the application.
