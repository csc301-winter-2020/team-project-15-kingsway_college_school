# Visible Learning Team
> **This document serves as a master plan between our team, our partner and our TA.**

# Product Details
 
## Q1: What are you planning to build?

```An application that facilitates the sharing of experiential learning at Kingsway College School.```  

In education, the final result of a student’s work is visible, but the process to get there is usually invisible. We want to make this process visible so that students can benefit from understanding how other students learn and reach solutions. This is backed by research from Harvard and part of the principles that Kingsway practices in its approach to education.
The users of this platform will be primarily students and teachers can play an administrative and a content-inspiring role. After a discussion with the Head of Senior School at Kingsway College School (KCS), we came up with several common use cases: 

Imagine that grade 9 students are given this formative assignment: Find 5 places in Toronto and write down what learning value can be obtained by engaging with the particular location. 

For the example above, students don’t have an easy way to capture and share their experiential learning with their schoolmates. Although mainstream social media tools exist, they are unsuited for the unique needs of KCS and come with major drawbacks that include distraction away from learning as well as unhealthy issues that arise from misuse of social media. The proposed app is clean, simple, and focused solely on making learning visible. 

We will build both a mobile application and a web application to facilitate this sharing of experiential learning. 
The workflow below describes how an experiential learning platform at field trips, which are common at Kingsway College School.


We will build both a mobile application and a web application to facilitate the sharing of experiential learning. Below, you will be able to see some designs of workflows from the different stakeholders of our solution:

![student storyboard](workflow.jpg)

## Q2: Who are your target users?

Our target users are Kingsway College high school students, and their teachers. Some personas we envision are:
- “Timmy the Troublemaker”: Timmy is a student who doesn’t care much about his grades, but cares a lot about his social status with his friends at school. He wants to make more friends and be as popular as he can. He is looking to abuse learning opportunities at every possible opening in exchange for increasing his popularity with his fellow students.

- “Theresa the Teacher”: Theresa is a teacher who would like to provide her students as many learning opportunities as she can both inside and outside the classroom. She recently heard about the concept of experiential learning and how it is used in the classes to encourage creative thinking and would like to try it out. She would like a way for her students to share their experiences with her and with each other. Since she has a very busy schedule, she would like a way to facilitate this process in a quick and efficient manner that doesn’t involve disrupting the learning process of her students.

- “Fatima the Facilitator”: Fatima is the principal of her school, and wants to provide her students with as many learning opportunities as she can. She is interested in experiential learning and how it could be used in classes to encourage learning in an efficient way. However, Fatima is concerned about students, if given an avenue to share their learning experiences, will misuse this learning tool for inappropriate ways. She wants to be able to have executive oversight to prevent inappropriate contributions to her students learning experiences. 

- “Andrew the Angel”: Andrew is a student who is very keen on learning and getting the highest grades he can. He is interested in how his fellow students are learning and wants to see first hand their perspectives and experiences. Since it is not socially acceptable to ask all of his peers what they learned each day, he wants a platform where students can share their learning experiences without that social barrier.


## Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Our product, as described in the answer to question 1, facilitates the unique culture being promoted at Kingsway College School. It makes it easier for students to share everything relevant to their studies in a safe, school-run space that is quickly and easily accessible by teachers and other students. Compared to, for example, taking notes on a field trip, this app can provide a more accurate representation of what a student experience and reduce the time involved in capturing that experience (making students more likely to consider recording these experiences). Further, they can share that experience in real-time, making their learning visible to their peers. This incentivizes sharing their learning as in the past students wouldn’t go out of their way to do so.

Importantly, all students will benefit not just from sharing their own experiences, but being able to view and save the posts that their classmates make. This connects students with similar interests or even those who can just help each other out. With the help of post tags and fast visibility, communication about one’s learning that might not have otherwise happened could instead be a regular event at Kingsway. In the past, the function of this app could only have been served by face-to-face interactions. While this is still the preferred method to share learning, this app will make it simpler by providing an organized, centralized hub that all students can interact with, and consistently produce the catalyst that this kind of face-to-face interaction is born from.

KCS values experiential learning, and making learning visible is a big part of that. We want to encourage experiential learning by giving students a tool to approach and log their experiences (like field trips, independent studies off-campus, long-term projects, and more), while the shared but anonymous nature of the app creates a productive social atmosphere. Where it differs from existing social media apps like Facebook is in its exclusivity to this school, its user anonymity, its smaller user base (one that is guaranteed to engage with each other to grow real connections, in-person and day-to-day), its focus on learning, and its academically-motivated moderation by educators. Some universities have attempted to implement school-exclusive social networks in the recent past, but we are not aware of any secondary schools employing something like this on a similarly small scale and with the same level of classroom integration. Ultimately the design of the app stems directly from the school’s values, making it a useful supplement to their core academic vision, and one that may not be immediately effective in schools lacking the experiential learning framework of KCS.


## Q4: How will you build it?

We plan on building this application by using React Native for the mobile application, React.js for the website front-end, and Firebase as our back-end service.

We decided to use React Native to develop our mobile application as it allows us to have one single codebase that then compiles into native code for both iOS and Android. We chose React Native specifically, as opposed to similar frameworks such as Flutter, because it is by far the most popular cross-platform development framework, which means that there is plenty of technical support and documentation out there if we need it. Additionally, we decided to use React.js to develop our website front-end as it will use the same language and have similar syntax and concepts as React Native, which would allow us as developers move between developing both sides of the project without having to learn two completely different frameworks and languages.

We decided to use Firebase as our back-end service as it a simple, tried and tested solution that is more than able to fit our technical needs.


![techstack](techstack.jpg)

In addition to the various frameworks mentioned, we will also be making use of Google’s API to handle authentication, as all of our users (Kingsway’s students and staff) have pre-existing google accounts.

Throughout development, we have established the following testing process: When developing a new feature, a developer should be consistently writing unit tests. After the completion of a feature, before it can be classified as “Done”, it has to go through a testing phase, where a different team member will test the feature from the perspective of the user, testing all possible edge cases, as well as reading the code to make sure there are no possible bugs that could come up, security vulnerabilities, as well as general software design and readability of the code.

After the completion of the project, where every feature that was required has been successfully implemented and tested, we will deploy both the app and the website. After making sure that our app fits all the requirements for both the the Apple App store and to Google Play (obtaining the user’s permission to use the camera and geolocation, no improper use of personal data, being accessibility-friendly) we compile the final version of the apps for both platforms, and send them to both app stores for review. After passing their respective reviews, which usually takes about a week, the app will be successfully launched. 

For the back-end, there is no need to buy a premium Firebase subscription, as the free base tier will be more than enough for our needs. After obtaining a domain name for the website, we will begin hosting it through Firebase.


## Q5: What are the user stories that make up the MVP?

1) As a student finishing a project who wants to help out his classmates, I want to post pictures of my notes with related commentary in order to share how I came to a solution to a hard problem.

   >_Acceptance Criteria_
   >* Students can post pictures accompanied by text
   >* Students can view posts made by other students in their classes

 
2) As a student interested in biology, I want to be able to see what students in other grades are learning in the biology field in order to build networking connections and gain friends with similar interests.

   >_Acceptance Criteria_
   >* Students can view posts by students not in their class
   >* Students can sort posts by topic
 
3) As a student interested in a classmate’s latest study project, I want to be able to save their posts so that I can refer to them later.

   >_Acceptance Criteria_
   >* Students can favourite posts made by other students
   >* Students can view favorited posts separate from other posts
 
4) As a teacher, I want to be able to instruct my students to share posts about their learning in order to facilitate visible learning.

   >_Acceptance Criteria_
   >* Teachers can send students prompts encouraging them to post
 
5) As a teacher, after a field trip I want to see what my students learned and what they interacted with.

   >_Acceptance Criteria_
   >* Teachers can sort student posts by recency
   >* Teachers can filter out posts not made by students in their classes
 
6) As a teacher I want to make sure that the learning in the platform is kept on track. If I see a non-productive posts on the app, I want to delete it to keep the discussion relevant.

   >_Acceptance Criteria_
   >* Teachers can delete posts made by students
   >* Teachers can delete posts made by other teachers
   >* Deleted posts that have been saved by students are unsaved
 
7) As a teacher I want to be able to see the posts that students are making to ensure that the content is appropriate for a school setting and meets our expectations.

   >_Acceptance Criteria_
   >* Teachers can view posts made by any student at the school

8) As a teacher, I want to use some of my student’s posts as springboards for class discussions. 

   >_Acceptance Criteria_
   >* Teachers can share posts made by students
   >* Shared posts appear different than regular student posts

9) As a student at Kingsway College I want to be able to filter posts so that I can view the posts that are the most relevant to me.
 
   >_Acceptance Criteria_
   >* Students can filter out posts not related to their classes
   >* Students can sort posts by various criteria
   >* Students can filter out posts that do not match criteria

Lack of experience with firebase, javascript, SQL, html, css, react, react native
# Process Details

## Q6: What are the roles & responsibilities on the team?

### Roles
 * **Project Manager**: Point of contact between team and partner. Take the discussion that was had with the partner and translating it into technical requirements. Responsible for gathering the questions and discussions that were had in the weekly meeting and discussing these topics with the partner.
   * Organize meetings with the partner (Kingsway) 
   * Create agenda for **partner** meetings
   * In product meetings represent the customer perspective
   * Leading research and usability tests
   * Ensure both the customer and team lead are up to date with expectations and plan
   * Verify that team lead is planning project timeline within the scope of the customers desired product (Keep the implementation on track with the problem solution)

* **Team Lead**: Lead weekly technical team meetings. Guide discussion of checking into what has been done so far, and what needs to get done before the next meeting. Also responsible for the long term planning and setting milestones for the project.
   * Organize meetings with the team
   * Create agenda for team meetings and ensure the discussion stays on topic
   * Breaking down bigger tasks and assisting in tech leads in creating github issues and assigning tasks 
   * Communicating with Project Manager to ensure the technical plan aligns with the expectations and scope of the customers needs
   * Ensure that there is delegation of who will be recording meeting minutes, this role with rotate with each meeting
   * Update TA on technical milestones and progress

* **Technology / Section lead** [2 or 3 people]: Ideally one per section of the project (Backend, mobile development framework, API integration, etc)
   * Leads the discussion on the high-level design for a technical component
   * The “go to person” when questions arise about how their section is implemented or how to interface with their section
   * Responsible for managing expectations and scoping out the difficulty and time needed for tasks in their section
   * Communicating with team lead when any unforeseen technical hurdles arise

* **Feature Lead [2 or 3 people]**: Involves all work on the project not falling into one of the lead/management designations above.
   * Work in conjunction with a section lead to implement required features
   * Responsible or setting timelines and expectations for the features they are tasked with
   * Communicate with team lead to ensure the features are implemented fit expectations of project vision

### Team Members
* **Alex Cann**
   * Role: **Feature Lead**
   * Strengths: python, algorithms and machine learning, java, c, functional programming experience
   * Weaknesses: Lack of experience with firebase, javascript, SQL, html, css, react, react native
* **Marco Angeli**
   * Role: **Feature Lead**
   * Strengths: Mobile Development Frameworks (Flutter), React and JS, Software design, Dart, Java, Python, C
   * Weaknesses:  UX design and user experience testing
* **Ryan Marten**
   * Role: **Project Manager**
   * Strengths: Python, Computer Vision / ML, PHP, Java, Docker
   * Weaknesses: React Native, React JS, Database Schema Design, Mobile Development Methodologies and Frameworks
* **Shardul Bansal**
   * Role: **Feature Lead**
   * Strengths: Python: pandas, requests, selenium, Front-end (HTML, CSS),  
   * Weaknesses: Firebase, Ajax, back-end technologies, mobile development
* **Nick Perrin**
   * Role: **Team Lead**
   * Strengths: C/C++, Python, audio design
   * Weaknesses: Web development (JS), mobile development (iOS) 
* **Devin Castaban**
   * Role: **Mobile Lead**
   * Strengths: AWS, REST APIs, i.e. Backend, C, Python, Javascript, HTML, CSS, React, Angular, Selenium, SQL
   * Weaknesses: Frameworks such as Kotlin and Swift, NoSQL databases
* **Joshua Bragg**
   * Role: **Web Lead**
   * Strengths: Frontend Web, Python, Javascript, CSS, HTML, Java, SQL, C#, Android SDK
   * Weaknesses: React, Angular, Node.JS


## Q7: What operational events will you have as a team?

### Full-Team Planning Meetings 
Our team will be meeting weekly on Sundays, 12pm - 4pm in Bahen 2230, to plan out the work for the week’s sprint. Every member of our team has carved out time in their weekly schedule for this meeting, although if a group member is seeing their family, it is acceptable for them to join the meeting online from time to time. The purpose of every weekly meeting with the whole team will be to distribute tasks, create tasks and evaluate their difficulty as a group, present updates on development progress from the Technology Leads and Feature Leads, record questions to ask the client, and ensure that we are on track to meet our deadlines. 
 
 ### Sub-Team Meetings
Besides this weekly planning meeting with the entire team, we will also have meetings between the members of individual teams. 
* The Project Manager and Team Lead will have weekly meetings to coordinate the overall team direction in response to feedback from the client and current development progress. 
* The Technology Leads will meet weekly with Feature Leads and other programmers working in their section. In these meetings the team will coordinate development in that area, including coding all together to help others with their bugs or issues. 
* The Team Lead will coordinate meetings with the TA as needed on an ad hoc basis for meetings outside of tutorial, as our entire team intends to attend tutorial every week. 
 
### Update Meetings and Standups
Other meetings throughout the week will provide opportunities for the whole team to be updated on other’s progress:
* A physical standup (<10min) will take place with the whole team after class on Wednesday where each member will give a short update on what they have been working on since Sunday and what are planning to work on before Friday.
* A digital standup will take place on a dedicated Slack channel every Friday, where each team member is required to post an update on what they have been working on since Wednesday and what they will be working on before Sunday. 
 
### Project Partner Meetings
Weekly Meetings will take place on Wednesdays 3-4pm. An agenda will be created and distributed before the meeting. The Project Manager, Ryan Marten, will lead this meeting, but other members of the engineering team are encouraged to attend. 

#### Project Partner Meeting #1
On January 29th, we met with our project partners Andrea Fanjoy and Aisling O’Neill from Kingsway College. During this meeting we established expectations for our working relationship and helped define the needs of the users and the goals of the project. Minutes of this meeting can be found [here](https://docs.google.com/document/d/1y0D0B5wJx_wwJ-0ZDp41Fme8htqKAY5f_A7nMnJ-Q_c/edit#). We decided that the Project Manager will be meeting weekly with Andrea and Ash on Wednesdays at 3-4pm unless otherwise planned. The action items we came away with were: 

1) Completing the project planning document and emailing it to Andrea for her to review before submission to ensure we understood her vision and proposed problem space, 
2) Emailing a follow up with some questions that wanted to ask, but then ran out of time
3) Consulting our TA on when it would be best for Andrea to physically attend a tutorial and meet with us in person. 

After this meeting, we sent our project planning document to Andrea for review and incorperated her suggestions into the final version. A meeting on Wednesday, February 5th will be held for a final review of project details and to discuss any clarifying questions. At the suggestion of our TA, we also asked some follow-up questions, which have been provided below: 

* What is the best way to reach you outside of meeting times (i.e. we have a question for you, how soon can you respond, which email address should we be using, who is the point of contact for technical questions, etc.)
     * This email is best. I should respond within 24 hours, usually less. In a pinch, you can call me(it’s rare that I can pick up but you can leave a message). The technical contact will depend – we have an IT Manager and System Administrator, Adam Stoyles..  

* How frequently would you like updates, are the deliverables sufficient? 
     * Updates a day or two before each call on Wednesday.

* What are your expectations? What do you hope to achieve through this partnership (besides the specific product requested)?
     * I hope to learn about experiential learning at the post-sec level. This experience is something I aim to help make happen at the secondary level (with less complicated projects, of course).
     
#### Project Partner Meeting #2
Project Manager, Ryan Marten, led this meeting and Web Lead, Joshua Bragg, attended. We updated our partner, Andrea with the latest changes on our project planning document. We also asked some clarifying questions about certain requested features involving student interaction in the application. Lastly, we discussed the guidelines for transitioning the project at the time of completion and the implications for intellectual property. Overall, it was a quick and productive meeting. 

  
## Q8: What artifacts will you use to self-organize?    

We’ll be keeping track of what needs to get done using GitHub Projects. This allows us to break down work into its more granular constituent tasks and assign those tasks to each team member. It also allows us to raise issues in the GitHub repository in a manner tightly integrated with the planning tools. Keeping track of project milestones also means we’ll have regular larger goals to work towards, which will focus our efforts on higher-priority tasks.

A task will be prioritized based on how future needs depend on the completion or success of that task. If future work is unfeasible without the results of this task, it could be a roadblock in progressing to a successful milestone and thus the task should be given a higher priority. The primary goal of this project is to produce a functioning MVP, so that goal will guide prioritization of the work at a higher level (such as de-prioritizing extra features that might be “nice to have” but not absolutely necessary for the MVP).

Tasks will be assigned to team members at team meetings, where we can discuss the difficulty of each task and the desire of each group member to tackle the task. Tasks can also be requested through the GitHub Projects interface when group members are able and willing to take on the work. The status of work from inception to completion will be tracked through Projects, with tasks/notes moving through different columns representing the stages of progress and extra information being added to them as necessary.


## Q9: What are the rules regarding how your team works?

### **Communication**:
Team members will mainly communicate using Facebook Messenger. The purpose of this channel will be to confirm meetings, handle assignment questions and remind people to complete tasks. It will be the responsibility of the person asking the question to tag the people they are asking specifically. General questions can be posed to the group at large. While not strictly necessary, it will be seen as good etiquette to acknowledge important questions and answers by using thumbs up/down reactions to these messages. Expected response time will be at least once a day and no less.
 
In case of emergency, we have the group’s collected phone numbers pinned in a slack channel for texting and calling. This channel of communication is meant only for specific and rare cases.

 
The process for communicating with our project partner will be to set up meetings via email. A meeting agenda will be set before the meeting, with target outcomes to be reached by meeting end. These meetings will be in person or over Zoom (video call), and meeting minutes will be taken. After a meeting, we will send a follow-up email to the partner with the meeting minutes and action items that resulted from it.
 

### **Meetings**: 
We will hold regular meetings for our team members. Members are responsible for attending the team meetings – if they are not able to make it, they must let the other attendees know as soon as possible. They must then make a plan to compensate for their absence. This could involve having someone present replace their role in the meeting or deliver an update on their behalf, and would also involves catching up on meeting contents to understand what new tasks they have.
 
Each meeting will have a Champion - the Team Lead for team meetings, the Project Manager for partnership meetings, and Tech Leads for tech meetings – whose duty it is to ensure that discussion in the meeting is productive and follows the set agenda.
 
### **Conflict Resolution**:
Team issues (not related to project task details) will be reported to the Team Lead to find appropriate resolutions. If the Team Lead is unavailable, these will go next to the Project Manager.
 
In the case that team issues involve conflict, we have the following contingencies prepared for various issues:

* **Disagreements**: A disagreement might involve a lack of consensus on project tasks or technical concerns or even scheduling of team events. We commit to no shouting matches, only respectful dialogue. In the case that a conflict between two parties (1 or more persons per party) cannot be resolved by unmoderated discussion between those parties, each side of the disagreement will make a concise argument for their side of the issue (in text), send it to the Team Lead, and have the whole team vote. In the case of ties, the Team Lead will decide on the issue or delegate the decision to someone whose expertise is trusted on the issue. The emphasis is not on taking sides but keeping the project moving forward!

* **Non-responsive team member**:  In the case that a team member does not respond within 1 day to messages on the agreed platforms, the Team Lead will contact the person by phone (text or call). If we still cannot reach that team member by the second day, the Team Lead goes to the team’s TA to report the issue.

* **Good faith failure-to-deliver**: Sometimes even the best laid plans don’t work out. A feature that we believed could be completed in a week might need an extra week, or something that seemed simple could be complicated. The team members working on this task will have tried in good faith to complete the task but were unable. In this case it is their responsibility to let the Team Lead or Project Manager know what isn’t working so that plans can be reformulated.

* **Bad faith failure-to-deliver**: If a team member is simply not putting in the effort (leading to a lack of completion of assigned tasks) and not communicating issues with the work to the team, the Team Lead will talk with this member about the issue and ask for a remedial plan to tackle the work or compensate otherwise. In the worst case, where this becomes a repeated issue, the Team Lead will report the member’s lack of contribution to the team’s TA to seek other solutions.

* **Personal emergency**: Any team member experiencing a personal emergency is not expected to prioritize this class over their own wellbeing or that of those close to them, but they should do their best to let the team know what is going on as soon as they are able. This member’s workload will be redistributed among the team and project timeline as appropriate, and the Team Lead may speak to the TA to petition for extra time on deliverables should the member’s absence make the planned timeline too difficult to maintain.

* **Other issues**: We cannot foresee every kind of issue that might arise; however, the team is committed to coming up with a plan to overcome roadblocks of any kind through shared communication on how to handle the issue. 


# Highlights

### How did we create a fair process of deciding roles in our group?
Members of the team who were interested in the position of Team Lead and Project Manager put forth an argument as to why they wanted the position. The contestant for Project Manager ran unopposed however we had 2 members of the group who were interested in the position of team lead. We resolved this predicament by having an in-depth discussion of each member’s strength and one of the members decided to step down from the running to use this course as an opportunity to build more of their technical capabilities. The process was democratic and resulted in greater group cohesion.

### How do we remember to communicate on a regular basis?
Communication is the cornerstone of long-term problem solving. To ensure we  continue to communicate effectively as a group, we made a decision to do the following:
* Meet on Sundays to delegate work.
* Have a stand-up meeting on Wednesdays after class.
* Post a brief progress update to Slack on Fridays. 

This means that all 7 of us, as a group, are communicating at least 3 times a week. We were originally leaning towards the idea of doing written progress updates on our slack channel on Monday, Wednesday and Friday along with our in-person meeting on Sunday. Since not all of us would read everyone’s updates regularly, we decided that to complement the written updates with an in-person stand-up meeting on Wednesday. The physical stand-up meeting on Wednesday makes sure we’re all on the same page at least twice a week. This means everyone will be updated with the progress of each group member’s work and the written progress updates will allow the Project Manager and the Tech Lead an in-depth understanding on what is happening regularly.

### How do we make use of the time that we have together?
Our meetings are going to be led by our Team Lead (see Question 6). Each Sunday meeting follows a fixed agenda that defined by the Team Lead before our meeting takes place. By going through the agenda, we limit unproductive deviations and spend our time effectively and efficiently. We considered an alternative where different individuals set the meeting agenda each week. However, we ultimately decided that the rotating responsibility would add a layer of unnecessary confusion and that the agenda should be the purview of the Team Lead. 

### What software development methodology are we going to employ?
A large majority of the group have already worked with Agile development and we are impressed by the methodology. In order to make the most of the few months we have together, we decided to create a Kanban board on github that allows us to monitor and view the progress of each of our tickets. The tickets that are part of the current backlog are discussed by the group during our weekly meetings. Each ticket possesses a relative estimate for how long it will take for the ticket to be completed. These estimates will be decided through SCRUM poker. The backbone provided by a combination of Agile and Kanban, along with continuous communication, will allow us to produce the best product we can within our limited time frame. 

### How did we come to our decision to choose our tech stack?
It was late afternoon on a dark, gloomy Sunday. Our group had been talking for
hours and we were not reaching a conclusion about our tech stack. You see, the predicament was between a web application or a mobile application. Considering the few months we have to work on this project, it was going to be clear that we could only do one. That was until one of our group members brought up Firebase, meaning we wouldn’t need an extensive backend for any of the paths we chose. That meant that we could potentially tackle both the website and the mobile application where the website would use REACT.js and the mobile application would be based on REACT native. The decision involved a lot of discussion and research not only in-between our group members but also with our TA. 
