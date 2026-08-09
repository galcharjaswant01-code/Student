import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Bot, BookOpen, HelpCircle, FileText, Calendar, FileCheck, Code, ArrowRight } from 'lucide-react';

const aiTools = [
  { id: 'ai-tutor', name: 'AI Tutor', desc: 'Ask complex academic questions and get step-by-step explanations.', icon: Bot },
  { id: 'quiz-generator', name: 'Quiz Generator', desc: 'Generate practice quizzes and flashcards from your lecture notes.', icon: HelpCircle },
  { id: 'notes-summarizer', name: 'Notes Summarizer', desc: 'Summarize lengthy textbooks and PDF guides into bullet points.', icon: FileText },
  { id: 'study-planner', name: 'Study Planner', desc: 'Create optimized exam prep schedules and study timetables.', icon: Calendar },
  { id: 'resume-analyzer', name: 'Resume Analyzer', desc: 'Analyze and format student resumes for academic internships.', icon: FileCheck },
  { id: 'code-assistant', name: 'Code Assistant', desc: 'Debug computer science assignments and optimize algorithms.', icon: Code },
];

const AIStudio = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Badge variant="blue" className="mb-2">Academic GenAI Suite</Badge>
          <h1 className="text-2xl font-bold tracking-tight">AI Study Studio</h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1">Smart learning tools built specifically to accelerate student learning.</p>
        </div>
      </div>

      {/* 6 Clean Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiTools.map((tool) => (
          <Card key={tool.id} className="p-5 flex flex-col justify-between space-y-4 hover:border-blue-600/40 transition-all">
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg border border-blue-600/40 text-blue-600 dark:text-blue-400 bg-transparent w-fit">
                <tool.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{tool.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tool.desc}</p>
            </div>

            <Button 
              variant="primary" 
              size="sm" 
              icon={ArrowRight}
              onClick={() => navigate(`/ai-studio/tool/${tool.id}`)}
              className="w-full"
            >
              Open Tool
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIStudio;
