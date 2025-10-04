
import type { Language, Chapter } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'mr', name: 'Marathi' },
  { code: 'hi', name: 'Hindi' },
];

export const INITIAL_CHAPTERS: Chapter[] = [
  { title: "Introduction to Swing", content: new Map() },
  { title: "JFrame and JPanel", content: new Map() },
  { title: "Layout Managers", content: new Map() },
  { title: "Event Handling", content: new Map() },
  { title: "Swing Components: JButton, JLabel, JTextField", content: new Map() },
  { title: "More Components: JCheckBox, JRadioButton", content: new Map() },
  { title: "JList and JComboBox", content: new Map() },
  { title: "JTable", content: new Map() },
  { title: "JMenuBar and JMenu", content: new Map() },
  { title: "Dialogs: JOptionPane", content: new Map() }
];
