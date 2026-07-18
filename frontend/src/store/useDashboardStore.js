import { create } from 'zustand';
import api from '../services/api';

const DEFAULT_LAYOUTS = {
  lg: [
    { i: "stat1", x: 0, y: 0, w: 3, h: 2 },
    { i: "stat2", x: 3, y: 0, w: 3, h: 2 },
    { i: "stat3", x: 6, y: 0, w: 3, h: 2 },
    { i: "stat4", x: 9, y: 0, w: 3, h: 2 },
    { i: "performance", x: 0, y: 2, w: 6, h: 4 },
    { i: "study_progress", x: 6, y: 2, w: 3, h: 4 },
    { i: "attendance", x: 9, y: 2, w: 3, h: 4 },
    { i: "quick_actions", x: 0, y: 6, w: 4, h: 4 },
    { i: "timeline", x: 4, y: 6, w: 4, h: 4 },
    { i: "calendar", x: 8, y: 6, w: 4, h: 4 },
    { i: "assignments", x: 4, y: 10, w: 4, h: 4 },
    { i: "courses", x: 8, y: 10, w: 4, h: 4 },
    { i: "messages", x: 0, y: 14, w: 4, h: 4 },
    { i: "resources", x: 8, y: 14, w: 4, h: 4 }
  ],
  md: [
    { i: "stat1", x: 0, y: 0, w: 5, h: 2 },
    { i: "stat2", x: 5, y: 0, w: 5, h: 2 },
    { i: "stat3", x: 0, y: 2, w: 5, h: 2 },
    { i: "stat4", x: 5, y: 2, w: 5, h: 2 },
    { i: "performance", x: 0, y: 4, w: 10, h: 4 },
    { i: "study_progress", x: 0, y: 8, w: 5, h: 4 },
    { i: "attendance", x: 5, y: 8, w: 5, h: 4 },
    { i: "quick_actions", x: 0, y: 12, w: 5, h: 4 },
    { i: "timeline", x: 5, y: 12, w: 5, h: 4 },
    { i: "calendar", x: 0, y: 16, w: 10, h: 4 },
    { i: "assignments", x: 5, y: 20, w: 5, h: 4 },
    { i: "courses", x: 0, y: 24, w: 5, h: 4 },
    { i: "resources", x: 5, y: 24, w: 5, h: 4 },
    { i: "messages", x: 0, y: 28, w: 5, h: 4 }
  ],
  sm: [
    { i: "stat1", x: 0, y: 0, w: 6, h: 2 },
    { i: "stat2", x: 0, y: 2, w: 6, h: 2 },
    { i: "stat3", x: 0, y: 4, w: 6, h: 2 },
    { i: "stat4", x: 0, y: 6, w: 6, h: 2 },
    { i: "performance", x: 0, y: 8, w: 6, h: 4 },
    { i: "study_progress", x: 0, y: 12, w: 6, h: 4 },
    { i: "attendance", x: 0, y: 16, w: 6, h: 4 },
    { i: "quick_actions", x: 0, y: 20, w: 6, h: 4 },
    { i: "timeline", x: 0, y: 24, w: 6, h: 4 },
    { i: "calendar", x: 0, y: 28, w: 6, h: 4 },
    { i: "assignments", x: 0, y: 36, w: 6, h: 4 },
    { i: "courses", x: 0, y: 40, w: 6, h: 4 },
    { i: "resources", x: 0, y: 44, w: 6, h: 4 },
    { i: "messages", x: 0, y: 48, w: 6, h: 4 }
  ]
};

const DEFAULT_VISIBLE_WIDGETS = [
  "stat1", "stat2", "stat3", "stat4", 
  "performance", "study_progress", "attendance", 
  "quick_actions", "timeline",
  "calendar", "assignments", "courses",
  "messages", "resources"
];

const useDashboardStore = create((set, get) => ({
  layouts: DEFAULT_LAYOUTS,
  visibleWidgets: DEFAULT_VISIBLE_WIDGETS,
  themePreferences: { mode: 'comfortable', sidebarWidth: 288, theme: 'dark', isSidebarVisible: true, isSidebarCollapsed: false },
  isEditing: false,
  isLoading: false,
  isMobileSidebarOpen: false,

  setEditing: (editing) => set({ isEditing: editing }),
  setMobileSidebarOpen: (isOpen) => set((state) => ({ 
    isMobileSidebarOpen: typeof isOpen === 'function' ? isOpen(state.isMobileSidebarOpen) : isOpen 
  })),
  
  setLayouts: (newLayouts) => {
    set({ layouts: newLayouts });
    get().saveToBackend();
  },

  setSidebarVisible: (isVisible) => {
    set((state) => ({
      themePreferences: { ...state.themePreferences, isSidebarVisible: isVisible }
    }));
    get().saveToBackend();
  },

  setSidebarCollapsed: (isCollapsed) => {
    set((state) => ({
      themePreferences: { 
        ...state.themePreferences, 
        isSidebarCollapsed: typeof isCollapsed === 'function' 
          ? isCollapsed(state.themePreferences?.isSidebarCollapsed ?? false)
          : isCollapsed 
      }
    }));
    get().saveToBackend();
  },

  toggleWidget: (widgetId) => {
    set((state) => {
      const isVisible = state.visibleWidgets.includes(widgetId);
      const newVisible = isVisible
        ? state.visibleWidgets.filter((w) => w !== widgetId)
        : [...state.visibleWidgets, widgetId];
      return { visibleWidgets: newVisible };
    });
    get().saveToBackend();
  },

  setSidebarWidth: (width) => {
    set((state) => ({ themePreferences: { ...state.themePreferences, sidebarWidth: width } }));
    get().saveToBackend();
  },

  setTheme: (theme) => {
    set((state) => ({ themePreferences: { ...state.themePreferences, theme } }));
    get().saveToBackend();
  },

  fetchFromBackend: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/dashboard/layout/');
      const data = response.data;
      if (data) {
        // Load layouts if available, otherwise fall back to DEFAULT_LAYOUTS
        const fetchedLayouts = data.layouts && Object.keys(data.layouts).length > 0 
          ? data.layouts 
          : DEFAULT_LAYOUTS;

        // Load visible widgets if available, otherwise fall back to DEFAULT_VISIBLE_WIDGETS
        const fetchedWidgets = data.visible_widgets && data.visible_widgets.length > 0 
          ? data.visible_widgets 
          : DEFAULT_VISIBLE_WIDGETS;

        // Load theme preferences if available and not empty, otherwise fall back to default preferences
        const themePrefs = data.theme_preferences && Object.keys(data.theme_preferences).length > 0
          ? data.theme_preferences
          : { mode: 'comfortable', sidebarWidth: 288, theme: 'dark' };

        // Sanitize sidebarWidth (ensure it's not a tiny number or undefined)
        let sidebarWidth = themePrefs.sidebarWidth;
        if (sidebarWidth === undefined || sidebarWidth === null || sidebarWidth < 200) {
          sidebarWidth = 288;
        }

        set({
          layouts: fetchedLayouts,
          visibleWidgets: fetchedWidgets,
          themePreferences: {
            ...themePrefs,
            sidebarWidth,
            isSidebarVisible: themePrefs.isSidebarVisible ?? true,
            isSidebarCollapsed: themePrefs.isSidebarCollapsed ?? false
          }
        });
      }
    } catch (error) {
      console.error("Failed to load dashboard layout:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  saveToBackend: async () => {
    try {
      const { layouts, visibleWidgets, themePreferences } = get();
      await api.post('/dashboard/layout/', {
        layouts,
        visible_widgets: visibleWidgets,
        theme_preferences: themePreferences
      });
    } catch (error) {
      console.error("Failed to save dashboard layout:", error);
    }
  }
}));

export default useDashboardStore;
