import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return String(xp);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

export function getGradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    playgroup: 'Play Group',
    nursery: 'Nursery',
    kg: 'Kindergarten',
    class1: 'Class 1',
    class2: 'Class 2',
    class3: 'Class 3',
    class4: 'Class 4',
    class5: 'Class 5',
  };
  return labels[grade] ?? grade;
}
