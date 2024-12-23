# RaceRewind

## Overview
This project aims to develop a comprehensive web application for Formula 1 enthusiasts, offering unique insights and alternative scenarios based on historical and recent F1 data. The application, called RaceRewind, will allow users to explore how past championships might have unfolded under current scoring systems, analyze driver performances based on sector times, and track the evolution of pit stop efficiency. By leveraging advanced data analysis techniques, this platform will provide F1 fans with a deeper understanding of the sport's nuances and "what-if" scenarios that go beyond traditional race statistics. RaceRewind will feature a user-friendly interface that enables fans to interact with complex data sets in an intuitive manner. Users will be able to visualize historical championship recalculations, compare theoretical race times with actual results, and assess driver consistency in qualifying sessions. Additionally, the application will offer insights into the correlation between qualifying and race performance, and identify standout performances across different seasons. By combining these features, RaceRewind aims to become an indispensable tool for passionate F1 fans seeking to deepen their engagement with the sport through data-driven analysis and exploration.

## Features
- **Championship Recalculation**: Explore how historical F1 championships would have unfolded under current scoring systems.
- **Driver Consistency Analysis**: Assess driver performance with metrics like positions gained/lost and variability using the Consistency Index.
- **Pit Stop Efficiency Trends**: Analyze average pit stop durations and identify the fastest pit stop years for each Grand Prix.
- **Hypothetical Lap Time Analysis**: Compare actual qualifying times with theoretical fastest laps based on sector times.
- **User Profiles**: Create and manage profiles to save favorite teams and drivers.

## Technical Architecture

### **Frontend**
- **Framework**: React
- **Technologies**:
  - **TypeScript**: Strongly typed support for React components.
  - **CSS Modules**: For scoped and reusable styling.
  - **REST API Integration**: Communicates with backend services using asynchronous fetch requests.

### **Backend**
- **Runtime**: Node.js  
- **Language**: TypeScript  
- **Framework**: Express.js for building RESTful APIs.  
- **Database**: MySQL hosted on Google Cloud Platform (GCP).  
- **Key Features**:
  - **User Authentication**:
    - Secure user registration with hashed passwords using `bcrypt`.
    - JWT-based login system for stateless authentication.

### **Database**
- **Platform**: Google Cloud Platform (GCP)
- **Relational Database Schema**:
  - Key tables include `Driver_Standings`, `Constructor_Standings`, `Pit_Stops`, and `Race_Results`.
- **Capabilities**:
  - Normalized to 3NF for data integrity.
  - Optimized queries for analyzing driver consistency, pit stop efficiency, and theoretical race outcomes through triggers, stored procedures and transactions.


