import {
  ShoppingCart,
  Briefcase,
  TrendingUp,
  Monitor,
  Palette,
  Code2,
  Settings,
  Search,
  Zap,
  BookOpen,
  FileText,
  Award,
  Sparkles,
  Users,
} from 'lucide-react';

export const iconMap = {
  ShoppingCart,
  Briefcase,
  TrendingUp,
  Monitor,
  Palette,
  Code2,
  Settings,
  Search,
  Zap,
  BookOpen,
  FileText,
  Award,
  Sparkles,
  Users,
} as const;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string) {
  return iconMap[name as IconName] || Monitor;
}