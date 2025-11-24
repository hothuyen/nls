export interface Indicator {
  id: string; // a, b, c, d
  description: string;
}

export interface SubCompetency {
  id: string; // 1.1, 1.2
  title: string;
  indicators: Indicator[];
}

export interface CompetencyGroup {
  id: string; // 1, 2, 3...
  title: string;
  shortTitle: string;
  iconName: string;
  subCompetencies: SubCompetency[];
}

export type GradeLevel = 'L10' | 'L11' | 'L12';

export interface FilterState {
  search: string;
  grade: GradeLevel;
  activeGroup: string;
}