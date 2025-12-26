# TaskMinder - Task Management Application

A modern, feature-rich web-based task management application built with React. TaskMinder helps you organize, track, and manage your tasks efficiently with an intuitive interface, comprehensive dashboard, and powerful task management capabilities.

![TaskMinder](https://img.shields.io/badge/React-18.0+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-38bdf8) ![License](https://img.shields.io/badge/License-MIT-green)

## Table of Contents

1. [Features](#features)
2. [Screenshots](#screenshots)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Technologies Used](#technologies-used)
7. [Key Features in Detail](#key-features-in-detail)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

## Features

### 🎯 Core Task Management

- **Task CRUD Operations**: Create, read, update, and delete tasks with ease
- **Task Viewing**: Click any task card to view detailed information in a beautiful modal
- **Task Status Management**: Move tasks between Todo, In Progress, and Done states
- **Priority Levels**: Assign High, Medium, or Low priority to tasks
- **Categories & Tags**: Organize tasks with predefined categories and tags
- **Date Management**: Set start and end dates with intuitive date/time pickers

### 🔍 Search & Filter

- **Advanced Search**: Search tasks by title, description, category, or tags
- **Multiple Sort Options**: Sort by Date, Priority, Title, or Status
- **Ascending/Descending**: Toggle sort order with a single click
- **Real-time Filtering**: Instant results as you type

### 📊 Dashboard & Analytics

- **Task Statistics**: 
  - Completion rate with visual progress bar
  - Average completion time
  - Weekly and monthly trends
  - Priority breakdown (High, Medium, Low, None)
- **Upcoming Deadlines**:
  - Overdue tasks indicator
  - Today's tasks widget
  - Next 7 days view
- **Recently Opened Tasks**: Quick access to your most recently viewed or edited tasks
- **Task Overview Cards**: Visual summary of all tasks, in-progress, and completed tasks

### 📅 Calendar Integration

- **Interactive Calendar**: Visual calendar view with task indicators
- **Task Count Badges**: See how many tasks are scheduled for each day
- **Day Tasks Modal**: Click any day to view all tasks for that date
- **Date Range Support**: Tasks appear across their full date range (start to end date)
- **Color-coded Days**: Days with tasks are highlighted for easy identification

### ⚡ Bulk Operations

- **Multi-select Tasks**: Select multiple tasks using checkboxes
- **Bulk Status Change**: Update status of multiple tasks at once
- **Bulk Delete**: Remove multiple tasks simultaneously
- **Select All**: Quick selection of all filtered tasks

### 🎨 User Experience

- **Toast Notifications**: Real-time feedback for all actions (success, error, warning, info)
- **Delete Confirmation**: Red-themed confirmation modal to prevent accidental deletions
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop screens
- **Fixed Sidebar**: Persistent navigation sidebar on desktop
- **Smooth Animations**: Beautiful transitions and animations throughout the app
- **Modern UI**: Clean, gradient-based design with intuitive interactions

### 🔄 State Management

- **Context API**: Centralized state management for real-time synchronization
- **Automatic Updates**: Changes reflect immediately across all pages without manual refresh
- **View Tracking**: Automatically tracks when tasks are viewed or edited
- **Local Storage**: Persistent data storage in browser's local storage

## Screenshots

### Dashboard View
- Overview of all tasks with statistics and analytics
- Recently opened tasks for quick access
- Upcoming deadlines and overdue tasks

### Tasks Page
- Kanban-style board with three columns (Todo, In Progress, Done)
- Search and sort functionality
- Bulk operations toolbar

### Calendar View
- Monthly calendar with task indicators
- Click any day to see all tasks for that date
- Visual task count badges

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/task-manager-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd task-manager-app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Creating a Task

1. Click the **"Add a task"** button (available on Dashboard and Tasks page)
2. Fill in the task details:
   - **Title**: Task name (required)
   - **Description**: Detailed description (required)
   - **Start Date & End Date**: Use the calendar icons to pick dates
   - **Priority**: Select from Low, Medium, or High
   - **Category**: Choose from predefined categories (Work, Personal, Health, etc.)
   - **Tags**: Select a tag (Urgent, Important, Meeting, etc.)
3. Click **"Submit"** to create the task
4. A success toast notification will confirm the task creation

### Viewing a Task

- **Click any task card** to open the detailed view modal
- View all task information including dates, status, priority, category, and tags
- The view is automatically tracked for the "Recently Opened Tasks" section

### Editing a Task

1. Click the **edit icon** (pencil) on any task card
2. Modify the task details in the edit modal
3. Click **"Update Task"** to save changes
4. A success notification confirms the update

### Managing Task Status

- **Todo → In Progress**: Click the "Start" button on a todo task
- **In Progress → Done**: Click the "Done" button on an in-progress task
- **Bulk Status Change**: Select multiple tasks and use the bulk action buttons

### Searching and Sorting

1. **Search**: Type in the search bar to filter tasks by title, description, category, or tags
2. **Sort**: Use the dropdown to sort by Date, Priority, Title, or Status
3. **Toggle Order**: Click the arrow button to switch between ascending and descending order

### Bulk Operations

1. **Select Tasks**: Check the boxes next to tasks you want to modify
2. **Bulk Actions Bar**: Appears automatically when tasks are selected
3. **Actions Available**:
   - Change status (To Do, In Progress, Done)
   - Delete selected tasks
   - Clear selection

### Calendar Navigation

1. Navigate to the **Calendar** page from the sidebar
2. **View Tasks**: Days with tasks show a colored background and task count badge
3. **Click a Day**: Opens a modal showing all tasks for that day
4. **Navigate Months**: Use the arrow buttons to move between months

### Dashboard Features

- **Statistics**: View completion rates, trends, and priority breakdowns
- **Deadlines**: Check overdue tasks, today's tasks, and upcoming deadlines
- **Recent Tasks**: Quick access to recently viewed or edited tasks

## Project Structure

```
src/
├── App.jsx                    # Main app component with providers
├── AppRouter.jsx              # React Router configuration
├── main.jsx                   # Application entry point
├── index.css                  # Global styles and animations
│
├── Components/
│   ├── Task-Manager/
│   │   ├── Layout.jsx         # Main layout with fixed sidebar
│   │   ├── Aside.jsx           # Navigation sidebar
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx           # Main dashboard component
│   │   │   ├── RingUpBoxes.jsx         # Task overview cards
│   │   │   ├── TaskStatistics.jsx      # Statistics and analytics
│   │   │   ├── UpcomingDeadlines.jsx   # Deadlines widget
│   │   │   ├── DashboardHistory.jsx    # History section container
│   │   │   └── DashboardProjectListDisplay.jsx  # Recently opened tasks
│   │   ├── Tasks/
│   │   │   ├── Tasks.jsx       # Main tasks page with Kanban board
│   │   │   ├── TaskColumn.jsx # Individual column component
│   │   │   ├── TaskCard.jsx   # Task card component
│   │   │   └── TaskViewModal.jsx  # Task detail view modal
│   │   ├── Projects/
│   │   │   └── Projects.jsx   # Projects page
│   │   └── Calendar/
│   │       ├── Calendar.jsx    # Main calendar component
│   │       └── DayTasksModal.jsx  # Day tasks modal
│   │
│   ├── AddToTaskFormFolder/
│   │   ├── AddToTaskForm.jsx  # Task creation form
│   │   └── Button.jsx         # Add task button
│   │
│   └── EditComponent/
│       ├── EditForm.jsx              # Task editing form
│       ├── EditButton.jsx           # Edit button component
│       └── DeleteConfirmationModal.jsx  # Delete confirmation modal
│
├── Context/
│   ├── TaskContext.jsx        # Task state management
│   └── ToastContext.jsx       # Toast notification system
│
├── Services/
│   └── taskService.js         # Local storage operations
│
└── Utils/
    └── sideBarItems.jsx       # Sidebar navigation configuration
```

## Technologies Used

### Core Technologies
- **React 18+**: Modern React with hooks and context API
- **React Router DOM**: Client-side routing
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Tailwind component library for modals
- **React Icons**: Comprehensive icon library

### Utilities
- **date-fns**: Date manipulation and formatting
- **Local Storage API**: Browser-based data persistence

### State Management
- **React Context API**: Global state management
- **React Hooks**: useState, useEffect, useMemo, useCallback

## Key Features in Detail

### 🎯 Task Priority System
Tasks can be assigned three priority levels:
- **High**: Red indicator, urgent tasks
- **Medium**: Yellow indicator, normal priority
- **Low**: Green indicator, low priority tasks

### 📁 Category System
Predefined categories for better organization:
- Work, Personal, Health, Education, Finance, Shopping, Travel, Family, Hobby, Other

### 🏷️ Tag System
Quick tagging with predefined options:
- Urgent, Important, Meeting, Project, Deadline, Review, Follow-up, Client, Team, Personal

### 📊 Statistics Dashboard
Comprehensive analytics including:
- **Completion Rate**: Percentage of completed tasks with visual progress
- **Average Completion Time**: Days taken to complete tasks on average
- **Weekly Trends**: Tasks created and completed this week
- **Monthly Trends**: Tasks created and completed this month
- **Priority Breakdown**: Distribution of tasks by priority level

### 🔔 Toast Notification System
Real-time feedback for user actions:
- **Success**: Green notifications for successful operations
- **Error**: Red notifications for failed operations
- **Warning**: Yellow notifications for warnings
- **Info**: Blue notifications for informational messages
- Auto-dismiss after 3 seconds (configurable)

### 📱 Responsive Design
Fully responsive across all devices:
- **Mobile** (< 768px): Single column layout, hamburger menu, stacked controls
- **Tablet** (768px - 1024px): Optimized layout with horizontal task columns
- **Desktop** (> 1024px): Full three-column Kanban board, fixed sidebar

### 🔄 Real-time Synchronization
- All changes sync automatically across pages
- No manual refresh required
- Context API ensures consistent state

### 👁️ View Tracking
- Automatically tracks when tasks are viewed
- Recently opened tasks appear in dashboard
- Helps you quickly access frequently used tasks

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Add toast notifications for user actions
- Update this README if adding new features

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For inquiries, feedback, or collaboration opportunities:

- **Email**: chukwuemerieclara@gmail.com
- **LinkedIn**: [Nnadozie Chukwuemerie Clara](https://www.linkedin.com/in/nnadozie-chukwuemerie-clara-b65273274/)

---

**Built with ❤️ using React and Tailwind CSS**
