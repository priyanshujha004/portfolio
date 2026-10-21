export interface ProfileMeta {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  headline: string[];
  intro: string;
  meta: ProfileMeta[];
  philosophy: string;
}
