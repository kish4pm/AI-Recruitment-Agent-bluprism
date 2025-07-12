# Use Case Diagram - AI Interview Platform

```mermaid
graph TB
    subgraph "Actors"
        A1[Recruiter]
        A2[Candidate]
        A3[Admin]
        A4[SuperAdmin]
        A5[AI System]
        A6[Google OAuth]
    end

    subgraph "Authentication & User Management"
        UC1[Register Account]
        UC2[Login with Email/Password]
        UC3[Login with Google OAuth]
        UC4[Sign Out]
        UC5[Update Profile]
        UC6[Upload Profile Picture]
        UC7[Ban/Unban User]
        UC8[Delete User]
        UC9[Create Admin Account]
    end

    subgraph "Recruiter Features"
        UC10[Create Interview]
        UC11[Generate AI Questions]
        UC12[Share Interview Link]
        UC13[View Interview Results]
        UC14[Download CV]
        UC15[Manage Credits]
        UC16[Purchase Credits]
        UC17[Delete Interview]
        UC18[View Dashboard]
        UC19[View All Interviews]
    end

    subgraph "Candidate Features"
        UC20[Join Interview]
        UC21[Participate in Voice Interview]
        UC22[View Interview History]
        UC23[Upload CV]
        UC24[View Feedback]
        UC25[View Interview Status]
    end

    subgraph "Admin Features"
        UC26[View All Users]
        UC27[View All Interviews]
        UC28[Export Data to CSV]
        UC29[View Analytics]
        UC30[Manage System]
    end

    subgraph "AI Features"
        UC31[Generate Interview Questions]
        UC32[Conduct Voice Interview]
        UC33[Generate Feedback]
        UC34[Analyze Responses]
        UC35[Provide Recommendations]
    end

    %% Actor relationships
    A1 --> UC10
    A1 --> UC11
    A1 --> UC12
    A1 --> UC13
    A1 --> UC14
    A1 --> UC15
    A1 --> UC16
    A1 --> UC17
    A1 --> UC18
    A1 --> UC19

    A2 --> UC20
    A2 --> UC21
    A2 --> UC22
    A2 --> UC23
    A2 --> UC24
    A2 --> UC25

    A3 --> UC26
    A3 --> UC27
    A3 --> UC28
    A3 --> UC29
    A3 --> UC30

    A4 --> UC7
    A4 --> UC8
    A4 --> UC9
    A4 --> UC26
    A4 --> UC27
    A4 --> UC28
    A4 --> UC29
    A4 --> UC30

    A5 --> UC31
    A5 --> UC32
    A5 --> UC33
    A5 --> UC34
    A5 --> UC35

    A6 --> UC3

    %% Include relationships
    UC10 ..> UC11 : <<include>>
    UC10 ..> UC12 : <<include>>
    UC21 ..> UC32 : <<include>>
    UC21 ..> UC33 : <<include>>
    UC13 ..> UC33 : <<include>>
    UC22 ..> UC24 : <<include>>

    %% Extend relationships
    UC2 <.. UC7 : <<extend>>
    UC3 <.. UC7 : <<extend>>
    UC10 <.. UC15 : <<extend>>
    UC26 <.. UC28 : <<extend>>
    UC27 <.. UC28 : <<extend>>

    %% Generalization
    A3 -.-> A4 : <<generalization>>
```

## Key Use Cases Explained:

### Authentication & User Management
- **Register Account**: Users can create accounts with email/password or Google OAuth
- **Login**: Multiple authentication methods supported
- **Profile Management**: Users can update their profiles and pictures
- **User Management**: Admins can ban/unban/delete users

### Recruiter Features
- **Interview Creation**: Recruiters create interviews with AI-generated questions
- **Credit System**: Recruiters use credits to create interviews
- **Results Management**: View and manage interview results
- **Dashboard**: Comprehensive dashboard with analytics

### Candidate Features
- **Interview Participation**: Join and participate in voice interviews
- **History Tracking**: View past interviews and feedback
- **CV Management**: Upload and manage CV files

### Admin Features
- **User Management**: View and manage all users
- **Interview Analytics**: View all interviews and statistics
- **Data Export**: Export data to CSV format
- **System Management**: Overall system administration

### AI Features
- **Question Generation**: AI generates interview questions based on job requirements
- **Voice Interview**: AI conducts real-time voice interviews
- **Feedback Generation**: AI analyzes responses and provides feedback
- **Recommendations**: AI provides hiring recommendations

## Relationships:
- **Include**: One use case includes another (e.g., creating interview includes generating questions)
- **Extend**: One use case extends another (e.g., ban functionality extends login)
- **Generalization**: SuperAdmin is a specialized Admin with additional privileges 