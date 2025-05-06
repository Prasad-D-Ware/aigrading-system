# AI Grading Platform

## 📝 Description

The AI Grading Platform is an innovative educational tool designed to revolutionize the way educators assess and provide feedback on student submissions. By leveraging cutting-edge artificial intelligence technology, this platform streamlines the grading process while maintaining high standards of assessment quality.

### Key Benefits

- **Time Efficiency**: Automates routine grading tasks, allowing educators to focus on more complex aspects of teaching
- **Consistent Feedback**: Provides standardized, detailed feedback across all submissions
- **Learning Enhancement**: Offers personalized insights and suggestions for student improvement
- **Scalability**: Handles large volumes of submissions efficiently
- **Quality Assurance**: Combines AI analysis with human oversight for optimal results

### Target Users

- **Educators**: Teachers, professors, and educational institutions looking to streamline their grading process
- **Students**: Learners receiving detailed, constructive feedback on their submissions
- **Educational Administrators**: Institutions seeking to implement efficient grading systems

### Core Functionality

The platform offers a comprehensive suite of features designed to enhance the educational assessment process:

1. **Automated Grading**: AI-powered analysis of submissions with customizable grading criteria
2. **Feedback Generation**: Detailed, constructive feedback highlighting strengths and areas for improvement
3. **Progress Tracking**: Analytics and insights into student performance over time
4. **Submission Management**: Organized handling of assignments with version control
5. **Collaboration Tools**: Features for peer review and instructor-student interaction

### Integration Capabilities

- Seamless integration with existing Learning Management Systems (LMS)
- GitHub repository connectivity for code-based assignments
- Email notification system for updates and feedback
- Export capabilities for reports and analytics

A modern web application built with Next.js that leverages AI to assist in grading and providing feedback on student submissions. The platform offers a seamless experience for educators and students with features like real-time feedback, analytics, and secure authentication.

## 🚀 Features

- **AI-Powered Grading**: Utilizes Google's Generative AI to provide intelligent feedback and grading
- **Secure Authentication**: JWT-based authentication system with bcrypt password hashing
- **Modern UI/UX**: Built with Tailwind CSS and Radix UI components
- **Real-time Analytics**: Interactive charts and visualizations using Recharts
- **PDF Generation**: Export functionality using jsPDF
- **Email Notifications**: Integration with SendGrid for automated email communications
- **GitHub Integration**: Connect with GitHub repositories for submission management
- **Dark Mode Support**: Built-in theme switching capability
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Jose
- **Email**: SendGrid
- **AI Integration**: Google Generative AI
- **PDF Generation**: jsPDF
- **Charts**: Recharts
- **Form Validation**: Zod

## 🏗️ Project Structure

```
├── app/                 # Next.js app directory
│   ├── (auth)/         # Authentication routes
│   ├── api/            # API routes
│   ├── projects/       # Project management
│   └── layout.tsx      # Root layout
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── public/            # Static assets
├── store/             # Zustand store configurations
└── utils/             # Helper functions
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd aigrading
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_key
   GOOGLE_AI_API_KEY=your_google_ai_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input sanitization
- CORS protection
- Rate limiting

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
