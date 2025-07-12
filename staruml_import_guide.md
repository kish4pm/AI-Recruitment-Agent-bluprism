# StarUML Import Guide

## Method 1: Direct Import (Recommended)

1. **Open StarUML**
2. **File → Open** (or Ctrl+O)
3. **Select the .mdj file** you want to import:
   - `use_case_diagram.mdj` - Use Case Diagram
   - `class_diagram.mdj` - Class Diagram  
   - `sequence_diagram.mdj` - Sequence Diagram
4. **Click Open**

## Method 2: Create New Project and Import

1. **Open StarUML**
2. **File → New Project**
3. **File → Import → From File**
4. **Select the .mdj file**
5. **Click Import**

## Method 3: Manual Creation (If Import Doesn't Work)

### For Use Case Diagram:
1. **Right-click project → Add Diagram → Use Case Diagram**
2. **Add Actors** (Recruiter, Candidate, Admin, SuperAdmin, AI System, Google OAuth)
3. **Add Use Cases** in different packages:
   - Authentication: Register, Login, Sign Out, Update Profile
   - Recruiter Features: Create Interview, Generate Questions, View Results
   - Candidate Features: Join Interview, Participate, View History
   - Admin Features: Ban Users, View Analytics, Manage System
   - AI Features: Generate Questions, Conduct Interview, Generate Feedback
4. **Draw relationships** (include, extend, generalization)

### For Class Diagram:
1. **Right-click project → Add Diagram → Class Diagram**
2. **Create Classes** with attributes and methods:
   - User (id, email, name, role, credits, banned, etc.)
   - Interview (id, interview_id, userEmail, jobPosition, etc.)
   - InterviewResult (id, interview_id, email, score, etc.)
   - AuthContext, UserDetailContext, InterviewDataContext
   - SupabaseClient, VapiClient, AIService
   - API classes (BanUserAPI, AIFeedbackAPI, AIModelAPI)
   - UI Components (LoginForm, RegisterForm, InterviewCard, etc.)
3. **Draw relationships** (association, composition, dependency)

### For Sequence Diagram:
1. **Right-click project → Add Diagram → Sequence Diagram**
2. **Add Lifelines**:
   - Recruiter
   - CreateInterviewForm
   - AIModelAPI
   - SupabaseClient
   - Candidate
   - StartInterview
   - VapiClient
   - AIFeedbackAPI
3. **Add Messages** between lifelines showing the interview flow
4. **Add Activation bars** to show method execution

## Troubleshooting

### If diagrams appear empty:
1. **Check the diagram view** - make sure you're looking at the right diagram
2. **Expand the project tree** - diagrams might be nested under packages
3. **Try refreshing** the project view

### If import fails:
1. **Check file format** - ensure .mdj extension
2. **Try different StarUML version** - some versions have compatibility issues
3. **Create manually** using the manual method above

### If elements are missing:
1. **Check the project explorer** - elements might be in different packages
2. **Look for hidden elements** - some might be outside the visible area
3. **Reset zoom** - elements might be too small or too large to see

## Alternative: Use the Markdown Files

If the .mdj files don't work, you can use the markdown files I created earlier:
- `use_case_diagram.md`
- `class_diagram.md` 
- `sequence_diagram.md`

These contain the diagrams in Mermaid format which you can:
1. **Copy the Mermaid code**
2. **Paste into a Mermaid editor** (like mermaid.live)
3. **Export as image** or use in documentation

## File Structure

Your project should have these files:
```
project/
├── use_case_diagram.mdj
├── class_diagram.mdj
├── sequence_diagram.mdj
├── use_case_diagram.md
├── class_diagram.md
├── sequence_diagram.md
└── staruml_import_guide.md
```

## Tips for Better Results

1. **Use the latest StarUML version**
2. **Import one diagram at a time**
3. **Save your work** before importing
4. **Backup your existing projects**
5. **If import fails, try the manual creation method** 