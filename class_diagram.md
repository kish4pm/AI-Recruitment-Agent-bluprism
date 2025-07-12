# Class Diagram - AI Interview Platform

```mermaid
classDiagram
    %% Core Entities
    class User {
        +String id
        +String email
        +String name
        +String role
        +String picture
        +Integer credits
        +Boolean banned
        +Date created_at
        +String cv_file_path
        +updateProfile()
        +updateCredits()
        +uploadCV()
        +isBanned()
    }

    class Interview {
        +String id
        +String interview_id
        +String userEmail
        +String jobPosition
        +String jobDescription
        +String type
        +Integer duration
        +Object questionList
        +Date created_at
        +createInterview()
        +deleteInterview()
        +generateQuestions()
        +getResults()
    }

    class InterviewResult {
        +String id
        +String interview_id
        +String email
        +String fullname
        +Object conversation_transcript
        +String recommendations
        +Integer score
        +String status
        +Date completed_at
        +Integer duration
        +saveResult()
        +generateFeedback()
        +calculateScore()
    }

    %% Authentication & Context Classes
    class AuthContext {
        +Object session
        +Object userProfile
        +signInUser()
        +signUpNewUser()
        +signOut()
        +fetchUserProfile()
    }

    class UserDetailContext {
        +Object user
        +setUser()
        +updateUserCredits()
        +fetchAndSetUser()
    }

    class InterviewDataContext {
        +Object interviewInfo
        +setInterviewInfo()
    }

    %% Service Classes
    class SupabaseClient {
        +String url
        +String anonKey
        +createClient()
        +auth()
        +from()
    }

    class VapiClient {
        +String apiKey
        +start()
        +stop()
        +on()
        +off()
    }

    class AIService {
        +String openaiKey
        +generateQuestions()
        +generateFeedback()
        +analyzeResponse()
    }

    %% API Route Classes
    class BanUserAPI {
        +POST()
        +validateAdmin()
        +updateBanStatus()
    }

    class AIFeedbackAPI {
        +POST()
        +processConversation()
        +generateFeedback()
    }

    class AIModelAPI {
        +POST()
        +generateQuestions()
        +formatResponse()
    }

    %% Component Classes
    class LoginForm {
        +String email
        +String password
        +Boolean loading
        +handleSubmit()
        +signInWithGoogle()
    }

    class RegisterForm {
        +String email
        +String name
        +String password
        +String role
        +handleSignUp()
        +signUpWithGoogle()
    }

    class InterviewCard {
        +Object interview
        +Boolean viewDetail
        +handleDelete()
        +viewDetails()
    }

    class CreateInterviewForm {
        +Object formData
        +Integer step
        +String interviewId
        +handleInputChange()
        +generateQuestions()
        +createInterview()
    }

    class StartInterview {
        +Object interviewInfo
        +Boolean start
        +String subtitles
        +Boolean isSpeaking
        +startCall()
        +stopInterview()
        +generateFeedback()
    }

    %% Layout Classes
    class AdminLayout {
        +Object user
        +String pathname
        +Boolean isChecking
        +checkAuthentication()
        +checkBanStatus()
        +redirectToLogin()
    }

    class RecruiterLayout {
        +Object user
        +renderSidebar()
        +renderContent()
    }

    class CandidateLayout {
        +Object user
        +renderSidebar()
        +renderContent()
    }

    %% Relationships
    User ||--o{ Interview : creates
    Interview ||--o{ InterviewResult : has
    User ||--o{ InterviewResult : participates_in
    
    AuthContext --> User : manages
    UserDetailContext --> User : provides
    InterviewDataContext --> Interview : manages
    
    SupabaseClient --> User : stores
    SupabaseClient --> Interview : stores
    SupabaseClient --> InterviewResult : stores
    
    VapiClient --> StartInterview : powers
    AIService --> AIFeedbackAPI : provides
    AIService --> AIModelAPI : provides
    
    LoginForm --> AuthContext : uses
    RegisterForm --> AuthContext : uses
    CreateInterviewForm --> Interview : creates
    InterviewCard --> Interview : displays
    StartInterview --> Interview : conducts
    
    AdminLayout --> User : checks
    RecruiterLayout --> User : displays
    CandidateLayout --> User : displays
    
    BanUserAPI --> User : modifies
    AIFeedbackAPI --> InterviewResult : generates
    AIModelAPI --> Interview : generates_questions_for
```

## Class Descriptions:

### Core Entities
- **User**: Represents all users (recruiters, candidates, admins) with profile and credit management
- **Interview**: Represents interview sessions created by recruiters with AI-generated questions
- **InterviewResult**: Stores candidate interview results with AI-generated feedback

### Context Classes
- **AuthContext**: Manages authentication state and user sessions
- **UserDetailContext**: Provides user data throughout the application
- **InterviewDataContext**: Manages interview session data

### Service Classes
- **SupabaseClient**: Database client for all CRUD operations
- **VapiClient**: Voice AI client for conducting interviews
- **AIService**: AI service for question generation and feedback

### API Classes
- **BanUserAPI**: Handles user ban/unban operations
- **AIFeedbackAPI**: Generates interview feedback using AI
- **AIModelAPI**: Generates interview questions using AI

### Component Classes
- **LoginForm/RegisterForm**: Authentication components
- **InterviewCard**: Displays interview information
- **CreateInterviewForm**: Interview creation wizard
- **StartInterview**: Voice interview interface

### Layout Classes
- **AdminLayout**: Admin panel layout with authentication checks
- **RecruiterLayout/CandidateLayout**: Role-specific layouts

## Key Relationships:
- **One-to-Many**: User creates multiple Interviews, Interview has multiple Results
- **Composition**: Contexts manage their respective entities
- **Dependency**: Components depend on services and contexts
- **Association**: APIs interact with entities for specific operations 