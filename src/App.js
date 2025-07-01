import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp,
  Bell,
  Plus,
  Filter,
  Building2,
  MessageSquare,
  AlertCircle,
  Briefcase,
  Target,
  DollarSign,
  Mail,
  Phone,
  ChevronRight,
  X,
  Edit,
  Trash2,
  Star,
  Flag,
  Save,
  CheckCircle
} from 'lucide-react';

const ProjectDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Review Prologis warehouse coating proposal',
      category: 'work',
      priority: 'high',
      status: 'pending',
      dueDate: '2025-01-15',
      type: 'review',
      waitingFor: 'Client feedback on pricing',
      project: 'Prologis Dallas Hub',
      reminders: ['2025-01-13', '2025-01-14']
    },
    {
      id: 2,
      title: 'LinkedIn campaign - Q1 content calendar',
      category: 'marketing',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2025-01-20',
      type: 'task',
      project: 'MIDI Rebranding',
      progress: 65
    },
    {
      id: 3,
      title: 'Follow up: Drone inspection vendor quotes',
      category: 'work',
      priority: 'high',
      status: 'waiting',
      dueDate: '2025-01-12',
      type: 'follow-up',
      waitingFor: 'Response from 3 vendors',
      lastContact: '2025-01-08',
      project: 'Tech Integration'
    },
    {
      id: 4,
      title: 'Schedule dentist appointment',
      category: 'personal',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-01-18',
      type: 'task',
      project: '',
      isGeneral: true
    },
    {
      id: 5,
      title: 'Review Q1 expense reports',
      category: 'work',
      priority: 'low',
      status: 'pending',
      dueDate: '2025-01-25',
      type: 'task',
      project: '',
      isGeneral: true
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Prologis Dallas Hub',
      category: 'work',
      status: 'active',
      value: '$2.3M',
      progress: 45,
      nextMilestone: 'Phase 2 coating application',
      team: 12
    },
    {
      id: 2,
      name: 'MIDI Rebranding',
      category: 'marketing',
      status: 'active',
      progress: 70,
      nextMilestone: 'Website launch',
      tasks: 8
    },
    {
      id: 3,
      name: 'Personal Investment Portfolio',
      category: 'personal',
      status: 'active',
      value: '$125K',
      progress: 100,
      nextAction: 'Q1 rebalancing'
    }
  ]);

  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Form states
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'work',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    type: 'task',
    project: '',
    waitingFor: ''
  });

  const [newProject, setNewProject] = useState({
    name: '',
    category: 'work',
    status: 'active',
    value: '',
    progress: 0,
    nextMilestone: '',
    team: ''
  });

  // Categories with MIDI brand colors
  const categories = {
    work: { color: 'bg-red-500', label: 'Work', icon: Building2 },
    marketing: { color: 'bg-orange-500', label: 'Marketing', icon: Target },
    personal: { color: 'bg-blue-500', label: 'Personal', icon: Star },
    follow_up: { color: 'bg-purple-500', label: 'Follow-up', icon: MessageSquare }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => 
      task.status === status && (filter === 'all' || task.category === filter)
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Task CRUD Operations
  const addTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      alert('Please fill in task title and due date');
      return;
    }
    
    const task = {
      ...newTask,
      id: Date.now(),
      progress: 0,
      isGeneral: !newTask.project // Mark as general if no project selected
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      category: 'work',
      priority: 'medium',
      status: 'pending',
      dueDate: '',
      type: 'task',
      project: '',
      waitingFor: ''
    });
    setShowNewTask(false);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setSelectedTask(null);
  };

  const completeTask = (taskId) => {
    updateTask(taskId, { status: 'completed' });
    setSelectedTask(null);
  };

  // Project CRUD Operations
  const addProject = () => {
    if (!newProject.name) {
      alert('Please fill in project name');
      return;
    }
    
    const project = {
      ...newProject,
      id: Date.now(),
      team: newProject.team || 0
    };
    
    setProjects([...projects, project]);
    setNewProject({
      name: '',
      category: 'work',
      status: 'active',
      value: '',
      progress: 0,
      nextMilestone: '',
      team: ''
    });
    setShowNewProject(false);
  };

  const TaskCard = ({ task, onClick }) => {
    const CategoryIcon = categories[task.category]?.icon || FileText;
    
    return (
      <div 
        onClick={() => onClick(task)}
        className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-3 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <CategoryIcon className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-500">{task.project || (task.isGeneral ? 'General' : 'No project')}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
        
        {task.waitingFor && (
          <div className="flex items-center gap-1 text-xs text-amber-600 mb-2">
            <AlertCircle className="w-3 h-3" />
            <span>Waiting: {task.waitingFor}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          {task.progress !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
              <span>{task.progress}%</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProjectCard = ({ project }) => {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900">{project.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            project.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
          }`}>
            {project.status}
          </span>
        </div>
        
        {project.value && (
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
            <DollarSign className="w-3 h-3" />
            <span>{project.value}</span>
          </div>
        )}
        
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        
        <div className="text-xs text-gray-600">
          {project.nextMilestone && (
            <div className="flex items-center gap-1">
              <Flag className="w-3 h-3" />
              <span>Next: {project.nextMilestone}</span>
            </div>
          )}
          {project.team > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3" />
              <span>{project.team} team members</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hi Pablo 👋</h1>
        <p className="text-gray-600">Here's your focus for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold text-red-600">
              {tasks.filter(t => t.waitingFor).length}
            </span>
          </div>
          <p className="text-sm text-gray-700">Pending Follow-ups</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-2xl font-bold text-orange-600">
              {tasks.filter(t => t.status !== 'completed').length}
            </span>
          </div>
          <p className="text-sm text-gray-700">Active Tasks</p>
        </div>
      </div>

      {/* Priority Tasks */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">🔥 Priority Tasks</h2>
        {getTasksByStatus('pending').filter(t => t.priority === 'high').map(task => (
          <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
        ))}
      </div>

      {/* Waiting For Responses */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">⏳ Waiting For</h2>
        {tasks.filter(t => t.waitingFor).map(task => (
          <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
        ))}
      </div>

      {/* General To-Do's */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">📝 General To-Do's</h2>
        {tasks.filter(t => t.isGeneral && t.status !== 'completed').map(task => (
          <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
        ))}
        {tasks.filter(t => t.isGeneral && t.status !== 'completed').length === 0 && (
          <p className="text-sm text-gray-400 italic">No general tasks</p>
        )}
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">📊 Active Projects</h2>
        <div className="space-y-3">
          {projects.filter(p => p.status === 'active').map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );

  const TasksView = () => (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">All Tasks</h1>
        <button
          onClick={() => setShowNewTask(true)}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          All
        </button>
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              filter === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {value.label}
          </button>
        ))}
      </div>

      {/* Task Lists */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">To Do</h3>
          {getTasksByStatus('pending').map(task => (
            <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
          ))}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">In Progress</h3>
          {getTasksByStatus('in-progress').map(task => (
            <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
          ))}
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Waiting</h3>
          {getTasksByStatus('waiting').map(task => (
            <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
          ))}
        </div>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        <button 
          onClick={() => setShowNewProject(true)}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(categories).slice(0, 3).map(([key, value]) => {
          const categoryProjects = projects.filter(p => p.category === key);
          
          return (
            <div key={key}>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <value.icon className="w-4 h-4" />
                {value.label}
              </h3>
              {categoryProjects.length > 0 ? (
                <div className="space-y-3">
                  {categoryProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic mb-4">No projects in this category</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const TaskDetailModal = ({ task, onClose }) => {
    if (!task) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
        <div className="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold text-gray-900">{task.title}</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority} priority
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {task.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Project</p>
                <p className="font-medium">{task.project || 'No project'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            {task.waitingFor && (
              <div className="bg-amber-50 rounded-lg p-3">
                <p className="text-sm font-medium text-amber-800 mb-1">Waiting For:</p>
                <p className="text-sm text-amber-700">{task.waitingFor}</p>
                {task.lastContact && (
                  <p className="text-xs text-amber-600 mt-1">
                    Last contact: {new Date(task.lastContact).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
            
            {task.reminders && task.reminders.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Reminders</p>
                <div className="space-y-1">
                  {task.reminders.map((reminder, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Bell className="w-3 h-3 text-gray-400" />
                      <span>{new Date(reminder).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <button 
                onClick={() => completeTask(task.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Mark Complete
              </button>
              <button 
                onClick={() => deleteTask(task.id)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NewTaskModal = () => {
    if (!showNewTask) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
        <div className="bg-white w-full rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">New Task</h2>
            <button onClick={() => setShowNewTask(false)} className="p-1">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter task title"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="work">Work</option>
                  <option value="marketing">Marketing</option>
                  <option value="personal">Personal</option>
                  <option value="follow_up">Follow-up</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project (Optional - leave empty for general task)
              </label>
              <select
                value={newTask.project}
                onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No project (General To-Do)</option>
                {projects.map(project => (
                  <option key={project.id} value={project.name}>{project.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waiting For (Optional)
              </label>
              <input
                type="text"
                value={newTask.waitingFor}
                onChange={(e) => setNewTask({...newTask, waitingFor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Client approval, Vendor quote"
              />
            </div>
            
            <button
              onClick={addTask}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NewProjectModal = () => {
    if (!showNewProject) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
        <div className="bg-white w-full rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">New Project</h2>
            <button onClick={() => setShowNewProject(false)} className="p-1">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter project name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="work">Work</option>
                  <option value="marketing">Marketing</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="on-hold">On Hold</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Value (Optional)
              </label>
              <input
                type="text"
                value={newProject.value}
                onChange={(e) => setNewProject({...newProject, value: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., $500K"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={(e) => setNewProject({...newProject, progress: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Next Milestone
              </label>
              <input
                type="text"
                value={newProject.nextMilestone}
                onChange={(e) => setNewProject({...newProject, nextMilestone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Complete phase 1"
              />
            </div>
            
            {newProject.category === 'work' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Size
                </label>
                <input
                  type="number"
                  value={newProject.team}
                  onChange={(e) => setNewProject({...newProject, team: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Number of team members"
                />
              </div>
            )}
            
            <button
              onClick={addProject}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      {activeView === 'dashboard' && <DashboardView />}
      {activeView === 'tasks' && <TasksView />}
      {activeView === 'projects' && <ProjectsView />}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex flex-col items-center p-2 ${
              activeView === 'dashboard' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <Building2 className="w-6 h-6" />
            <span className="text-xs mt-1">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('tasks')}
            className={`flex flex-col items-center p-2 ${
              activeView === 'tasks' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-xs mt-1">Tasks</span>
          </button>
          <button
            onClick={() => setActiveView('projects')}
            className={`flex flex-col items-center p-2 ${
              activeView === 'projects' ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <Briefcase className="w-6 h-6" />
            <span className="text-xs mt-1">Projects</span>
          </button>
          <button
            className="flex flex-col items-center p-2 text-gray-400"
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs mt-1">Alerts</span>
          </button>
        </div>
      </div>
      
      {/* Modals */}
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <NewTaskModal />
      <NewProjectModal />
    </div>
  );
};

export default ProjectDashboard;