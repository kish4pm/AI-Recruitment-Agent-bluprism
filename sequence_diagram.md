# Sequence Diagram - AI Interview Platform

## 1. User Registration and Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant LF as LoginForm
    participant AC as AuthContext
    participant SC as SupabaseClient
    participant DB as Database
    participant GC as GoogleOAuth

    U->>LF: Enter credentials
    LF->>AC: signInUser(email, password)
    AC->>SC: auth.signInWithPassword()
    SC->>DB: Validate credentials
    DB-->>SC: User data
    SC-->>AC: Auth response
    AC->>SC: Check ban status
    SC->>DB: Query users table
    DB-->>SC: User profile
    alt User is banned
        AC->>SC: signOut()
        AC-->>LF: Error: Account banned
        LF-->>U: Show ban message
    else User not banned
        AC->>AC: Set user profile
        AC-->>LF: Success response
        LF-->>U: Redirect to dashboard
    end

    Note over U,GC: Google OAuth Flow
    U->>LF: Click "Login with Google"
    LF->>GC: signInWithOAuth()
    GC-->>U: Google login page
    U->>GC: Complete Google login
    GC-->>LF: Auth callback
    LF->>AC: Handle OAuth callback
    AC->>SC: Check existing user
    SC->>DB: Query by email
    alt User exists
        AC->>AC: Set existing profile
    else New user
        AC->>SC: Insert new user
        SC->>DB: Create user record
    end
    AC-->>LF: Redirect to dashboard
```

## 2. Interview Creation Flow

```mermaid
sequenceDiagram
    participant R as Recruiter
    participant CIF as CreateInterviewForm
    participant SC as SupabaseClient
    participant DB as Database
    participant AIS as AIService
    participant AIM as AIModelAPI
    participant QL as QuestionList
    participant UC as UserContext

    R->>CIF: Fill interview details
    CIF->>UC: Check credits
    UC->>SC: Query user credits
    SC->>DB: Get user data
    DB-->>SC: User with credits
    SC-->>UC: Credits available
    UC-->>CIF: Proceed with creation

    CIF->>AIS: Generate questions
    AIS->>AIM: POST job details
    AIM->>AIS: AI-generated questions
    AIS-->>CIF: Question list
    CIF->>QL: Display questions
    R->>QL: Review/edit questions
    QL->>CIF: Final question list

    CIF->>SC: Create interview
    SC->>DB: Insert interview record
    DB-->>SC: Interview created
    SC-->>CIF: Interview data
    CIF->>UC: Deduct credit
    UC->>SC: Update user credits
    SC->>DB: Update credits
    CIF-->>R: Interview created successfully
```

## 3. Interview Participation Flow

```mermaid
sequenceDiagram
    participant C as Candidate
    participant IP as InterviewPage
    participant SC as SupabaseClient
    participant DB as Database
    participant SI as StartInterview
    participant VC as VapiClient
    participant AI as AI System
    participant AFF as AIFeedbackAPI
    participant IR as InterviewResult

    C->>IP: Enter interview code
    IP->>SC: Validate interview
    SC->>DB: Query interviews table
    DB-->>SC: Interview data
    SC-->>IP: Interview details
    IP-->>C: Show interview info

    C->>IP: Join interview
    IP->>SI: Initialize interview
    SI->>VC: Start voice call
    VC->>AI: Begin AI interview
    AI->>VC: Ask questions
    VC-->>C: Voice questions
    C->>VC: Voice responses
    VC->>AI: Process responses
    AI->>VC: Continue interview
    loop Interview continues
        VC-->>C: AI questions
        C->>VC: Candidate responses
        VC->>AI: Process responses
    end

    AI->>VC: End interview
    VC->>SI: Call ended
    SI->>AFF: Generate feedback
    AFF->>AI: Analyze conversation
    AI-->>AFF: Feedback data
    AFF-->>SI: Feedback results
    SI->>SC: Save results
    SC->>DB: Insert interview_result
    DB-->>SC: Result saved
    SI-->>C: Interview completed
```

## 4. Admin User Management Flow

```mermaid
sequenceDiagram
    participant A as Admin
    participant AL as AdminLayout
    participant UM as UserManagement
    participant SC as SupabaseClient
    participant DB as Database
    participant BUA as BanUserAPI

    A->>AL: Access admin panel
    AL->>SC: Check admin privileges
    SC->>DB: Query user role
    DB-->>SC: Admin confirmed
    AL-->>A: Show admin interface

    A->>UM: View users
    UM->>SC: Fetch all users
    SC->>DB: Query users table
    DB-->>SC: User list
    SC-->>UM: Users with stats
    UM-->>A: Display user list

    A->>UM: Ban user
    UM->>BUA: POST ban request
    BUA->>SC: Validate admin
    SC->>DB: Check admin status
    DB-->>SC: Admin confirmed
    BUA->>SC: Update user banned status
    SC->>DB: Update users table
    DB-->>SC: Update successful
    BUA-->>UM: Ban successful
    UM-->>A: User banned

    A->>UM: Delete user
    UM->>SC: Delete user data
    SC->>DB: Delete interviews
    SC->>DB: Delete results
    SC->>DB: Delete user
    DB-->>SC: Deletion successful
    UM-->>A: User deleted
```

## 5. Credit System Flow

```mermaid
sequenceDiagram
    participant R as Recruiter
    participant RD as RecruiterDashboard
    participant UC as UserContext
    participant SC as SupabaseClient
    participant DB as Database
    participant BC as BillingComponent

    R->>RD: View dashboard
    RD->>UC: Get user data
    UC->>SC: Fetch user profile
    SC->>DB: Query users table
    DB-->>SC: User with credits
    SC-->>UC: User data
    UC-->>RD: Display credits

    R->>RD: Create interview
    RD->>UC: Check credits
    UC->>SC: Get current credits
    SC->>DB: Query credits
    DB-->>SC: Credits available
    alt Sufficient credits
        RD->>UC: Deduct credit
        UC->>SC: Update credits
        SC->>DB: Decrease credits
        DB-->>SC: Update successful
        RD-->>R: Interview created
    else Insufficient credits
        RD-->>R: Show credit warning
        R->>BC: Purchase credits
        BC->>SC: Update credits
        SC->>DB: Add credits
        DB-->>SC: Credits added
        BC-->>R: Credits purchased
    end
```

## Key Interactions Explained:

### 1. Authentication Flow
- **Email/Password**: Traditional authentication with ban checks
- **Google OAuth**: Social login with automatic user creation
- **Ban System**: Prevents banned users from accessing the platform

### 2. Interview Creation
- **Credit Check**: Ensures recruiter has sufficient credits
- **AI Question Generation**: Uses AI to create relevant questions
- **Database Storage**: Saves interview configuration
- **Credit Deduction**: Reduces recruiter credits after creation

### 3. Interview Participation
- **Code Validation**: Verifies interview code exists
- **Voice AI Integration**: Real-time voice conversation
- **Feedback Generation**: AI analyzes responses and provides feedback
- **Result Storage**: Saves interview results for review

### 4. Admin Management
- **Privilege Validation**: Ensures admin access
- **User Operations**: Ban/unban/delete users
- **Data Management**: Comprehensive user and interview management

### 5. Credit System
- **Credit Tracking**: Monitors recruiter credits
- **Purchase Flow**: Allows credit purchases
- **Usage Control**: Prevents interview creation without credits

## System Integration Points:
- **Supabase**: Central database and authentication
- **Vapi AI**: Voice interview technology
- **OpenAI**: Question generation and feedback analysis
- **Google OAuth**: Social authentication
- **File Storage**: CV uploads and profile pictures 